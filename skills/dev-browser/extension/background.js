// ============================================================================
// Constants
// ============================================================================

const RELAY_WS_URL = "ws://localhost:9222/extension";
const RELAY_HTTP_URL = "http://localhost:9222";
const ALARM_KEEPALIVE = "dev-browser-keepalive";
const ALARM_RECONNECT = "dev-browser-reconnect";
const STORAGE_KEY = "devBrowserActiveState";

const MIN_RECONNECT_DELAY = 1;
const MAX_RECONNECT_DELAY = 15;

// ============================================================================
// Logger
// ============================================================================

function createLogger(getSendFn) {
	function formatArgs(args) {
		return args.map((a) => {
			if (a === undefined) return "undefined";
			if (a === null) return "null";
			if (typeof a === "object")
				try {
					return JSON.stringify(a);
				} catch {
					return String(a);
				}
			return String(a);
		});
	}
	function forward(level, args) {
		const send = getSendFn();
		if (send)
			send({ method: "log", params: { level, args: formatArgs(args) } });
	}
	return {
		log: (...a) => {
			console.log("[dev-browser]", ...a);
			forward("log", a);
		},
		debug: (...a) => {
			console.debug("[dev-browser]", ...a);
			forward("debug", a);
		},
		error: (...a) => {
			console.error("[dev-browser]", ...a);
			forward("error", a);
		},
	};
}

// ============================================================================
// Tab Manager — manages Chrome debugger sessions
// ============================================================================

class TabManager {
	constructor({ logger, getSendFn }) {
		this.tabs = new Map(); // tabId -> { sessionId, targetId, state }
		this.childSessions = new Map(); // childSessionId -> parentTabId
		this.nextSessionId = 1;
		this.logger = logger;
		this.getSendFn = getSendFn;
	}

	_send(msg) {
		const send = this.getSendFn();
		if (send) send(msg);
	}

	getBySessionId(sessionId) {
		for (const [tabId, tab] of this.tabs) {
			if (tab.sessionId === sessionId) return { tabId, tab };
		}
	}

	getByTargetId(targetId) {
		for (const [tabId, tab] of this.tabs) {
			if (tab.targetId === targetId) return { tabId, tab };
		}
	}

	getParentTabId(childSessionId) {
		return this.childSessions.get(childSessionId);
	}

	get(tabId) {
		return this.tabs.get(tabId);
	}
	has(tabId) {
		return this.tabs.has(tabId);
	}
	set(tabId, data) {
		this.tabs.set(tabId, data);
	}

	trackChildSession(childSessionId, parentTabId) {
		this.logger.debug(
			"Child target attached:",
			childSessionId,
			"for tab:",
			parentTabId,
		);
		this.childSessions.set(childSessionId, parentTabId);
	}

	untrackChildSession(childSessionId) {
		this.logger.debug("Child target detached:", childSessionId);
		this.childSessions.delete(childSessionId);
	}

	async attach(tabId) {
		const debuggee = { tabId };
		this.logger.debug("Attaching debugger to tab:", tabId);
		await chrome.debugger.attach(debuggee, "1.3");

		const { targetInfo } = await chrome.debugger.sendCommand(
			debuggee,
			"Target.getTargetInfo",
		);
		const sessionId = `pw-tab-${this.nextSessionId++}`;

		this.tabs.set(tabId, {
			sessionId,
			targetId: targetInfo.targetId,
			state: "connected",
		});
		this._send({
			method: "forwardCDPEvent",
			params: {
				method: "Target.attachedToTarget",
				params: {
					sessionId,
					targetInfo: { ...targetInfo, attached: true },
					waitingForDebugger: false,
				},
			},
		});

		this.logger.log(
			"Tab attached:",
			tabId,
			"sessionId:",
			sessionId,
			"url:",
			targetInfo.url,
		);
		return targetInfo;
	}

	detach(tabId, alsoDetachDebugger) {
		const tab = this.tabs.get(tabId);
		if (!tab) return;

		this.logger.debug("Detaching tab:", tabId);
		this._send({
			method: "forwardCDPEvent",
			params: {
				method: "Target.detachedFromTarget",
				params: { sessionId: tab.sessionId, targetId: tab.targetId },
			},
		});

		this.tabs.delete(tabId);
		for (const [childId, parentId] of this.childSessions) {
			if (parentId === tabId) this.childSessions.delete(childId);
		}

		if (alsoDetachDebugger) {
			chrome.debugger.detach({ tabId }).catch((err) => {
				this.logger.debug("Error detaching debugger:", err);
			});
		}
	}

	handleDebuggerDetach(tabId) {
		if (!this.tabs.has(tabId)) return;
		const tab = this.tabs.get(tabId);
		if (tab) {
			this._send({
				method: "forwardCDPEvent",
				params: {
					method: "Target.detachedFromTarget",
					params: { sessionId: tab.sessionId, targetId: tab.targetId },
				},
			});
		}
		for (const [childId, parentId] of this.childSessions) {
			if (parentId === tabId) this.childSessions.delete(childId);
		}
		this.tabs.delete(tabId);
	}

	clear() {
		this.tabs.clear();
		this.childSessions.clear();
	}

	/** Detach debugger from all tabs AND clear state — only for manual deactivation */
	detachAll() {
		for (const tabId of this.tabs.keys()) {
			chrome.debugger.detach({ tabId }).catch(() => {});
		}
		this.clear();
	}

	/** Re-announce all currently attached tabs to the relay server (for reconnect) */
	reannounceAll() {
		for (const [tabId, tab] of this.tabs) {
			// Refresh target info and re-send attachedToTarget
			chrome.debugger
				.sendCommand({ tabId }, "Target.getTargetInfo")
				.then(({ targetInfo }) => {
					// Update stored targetInfo
					tab.targetId = targetInfo.targetId;
					this._send({
						method: "forwardCDPEvent",
						params: {
							method: "Target.attachedToTarget",
							params: {
								sessionId: tab.sessionId,
								targetInfo: { ...targetInfo, attached: true },
								waitingForDebugger: false,
							},
						},
					});
					this.logger.debug(
						"Re-announced tab:",
						tabId,
						"sessionId:",
						tab.sessionId,
					);
				})
				.catch((err) => {
					// Tab may have been closed or debugger detached while we were disconnected
					this.logger.debug("Failed to re-announce tab:", tabId, err.message);
					this.tabs.delete(tabId);
				});
		}
	}

	getAllTabIds() {
		return Array.from(this.tabs.keys());
	}
}

// ============================================================================
// WebSocket Connection Manager — with exponential backoff + alarms keepalive
// ============================================================================

class ConnectionManager {
	constructor({ logger, onMessage, onDisconnect, onReconnect }) {
		this.ws = null;
		this.shouldMaintain = false;
		this.logger = logger;
		this.onMessage = onMessage;
		this.onDisconnect = onDisconnect;
		this.onReconnect = onReconnect;
		this.currentBackoff = MIN_RECONNECT_DELAY;
		this._wasConnected = false;
	}

	isConnected() {
		return this.ws?.readyState === WebSocket.OPEN;
	}

	/** Non-destructive connection check — just returns status */
	async checkConnection() {
		if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return false;
		try {
			const res = await fetch(RELAY_HTTP_URL, {
				method: "HEAD",
				signal: AbortSignal.timeout(2000),
			});
			return res.ok;
		} catch {
			// Don't close the WS here — let the WS onclose handler deal with it naturally
			return false;
		}
	}

	send(msg) {
		if (this.ws?.readyState === WebSocket.OPEN) {
			try {
				this.ws.send(JSON.stringify(msg));
			} catch (err) {
				this.logger.debug("Error sending message:", err);
			}
		}
	}

	startMaintaining() {
		this.shouldMaintain = true;
		this.currentBackoff = MIN_RECONNECT_DELAY;

		// Set up Chrome alarms for keepalive + reconnection
		chrome.alarms.create(ALARM_KEEPALIVE, { periodInMinutes: 0.4 }); // ~24 seconds
		this._attemptConnect();
	}

	stopMaintaining() {
		this.shouldMaintain = false;
		chrome.alarms.clear(ALARM_KEEPALIVE);
		chrome.alarms.clear(ALARM_RECONNECT);
	}

	disconnect() {
		this.stopMaintaining();
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
		this._wasConnected = false;
		this.onDisconnect();
	}

	/** Called by alarm handler — check connection, reconnect if needed */
	handleAlarm(alarmName) {
		if (alarmName === ALARM_KEEPALIVE || alarmName === ALARM_RECONNECT) {
			if (!this.shouldMaintain) return;
			if (!this.isConnected()) {
				this._attemptConnect();
			}
		}
	}

	async ensureConnected() {
		if (this.isConnected()) return;
		await this._tryConnect();
		if (this.isConnected()) return;
		// One retry after 1s
		await new Promise((r) => setTimeout(r, 1000));
		await this._tryConnect();
		if (!this.isConnected())
			throw new Error("Could not connect to relay server");
	}

	async _attemptConnect() {
		if (this.isConnected()) return;

		try {
			await this._tryConnect();
		} catch {
			// Schedule retry with backoff via alarm
			if (this.shouldMaintain) {
				const delaySec = this.currentBackoff;
				this.currentBackoff = Math.min(
					this.currentBackoff * 2,
					MAX_RECONNECT_DELAY,
				);
				chrome.alarms.create(ALARM_RECONNECT, {
					delayInMinutes: delaySec / 60,
				});
			}
		}
	}

	async _tryConnect() {
		if (this.isConnected()) return;

		// Check if relay server is reachable first
		try {
			await fetch(RELAY_HTTP_URL, {
				method: "HEAD",
				signal: AbortSignal.timeout(2000),
			});
		} catch {
			throw new Error("Relay server unreachable");
		}

		this.logger.debug("Connecting to relay server...");

		const ws = new WebSocket(RELAY_WS_URL);

		await new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new Error("Connection timeout"));
				try {
					ws.close();
				} catch {}
			}, 5000);

			ws.onopen = () => {
				clearTimeout(timeout);
				resolve();
			};
			ws.onerror = () => {
				clearTimeout(timeout);
				reject(new Error("WebSocket connection failed"));
			};
			ws.onclose = (e) => {
				clearTimeout(timeout);
				reject(new Error(`WebSocket closed: ${e.reason || e.code}`));
			};
		});

		this.ws = ws;
		this._setupSocketHandlers(ws);
		this.currentBackoff = MIN_RECONNECT_DELAY; // Reset backoff on success

		const isReconnect = this._wasConnected;
		this._wasConnected = true;

		this.logger.log(
			"Connected to relay server" + (isReconnect ? " (reconnected)" : ""),
		);

		// On reconnect, re-announce existing tabs so relay server knows about them
		if (isReconnect && this.onReconnect) {
			this.onReconnect();
		}
	}

	_setupSocketHandlers(ws) {
		ws.onmessage = async (event) => {
			let msg;
			try {
				msg = JSON.parse(event.data);
			} catch (err) {
				this.logger.debug("Error parsing message:", err);
				this.send({ error: { code: -32700, message: "Parse error" } });
				return;
			}
			const response = { id: msg.id };
			try {
				response.result = await this.onMessage(msg);
			} catch (err) {
				this.logger.debug("Error handling command:", err);
				response.error = err.message;
			}
			this.send(response);
		};

		ws.onclose = (event) => {
			this.logger.debug("Connection closed:", event.code, event.reason);
			this.ws = null;
			// DON'T call onDisconnect here — that would detach all tabs.
			// Just schedule reconnection if we should maintain.
			if (this.shouldMaintain) {
				this.logger.debug(
					"Will attempt reconnect with backoff:",
					this.currentBackoff,
					"s",
				);
				this._attemptConnect();
			}
		};

		ws.onerror = (event) => {
			this.logger.debug("WebSocket error:", event);
		};
	}
}

// ============================================================================
// Command Router — handles CDP commands from the relay
// ============================================================================

class CommandRouter {
	constructor({ logger, tabManager }) {
		this.logger = logger;
		this.tabManager = tabManager;
		this.devBrowserGroupId = null;
	}

	async getOrCreateDevBrowserGroup(tabId) {
		if (this.devBrowserGroupId !== null) {
			try {
				await chrome.tabGroups.get(this.devBrowserGroupId);
				await chrome.tabs.group({
					tabIds: [tabId],
					groupId: this.devBrowserGroupId,
				});
				return this.devBrowserGroupId;
			} catch {
				this.devBrowserGroupId = null;
			}
		}
		const groupId = await chrome.tabs.group({ tabIds: [tabId] });
		await chrome.tabGroups.update(groupId, {
			title: "Dev Browser",
			color: "blue",
		});
		this.devBrowserGroupId = groupId;
		return groupId;
	}

	async handleCommand(msg) {
		if (msg.method !== "forwardCDPCommand") return;

		let tabId, tab;

		// Find tab by sessionId
		if (msg.params.sessionId) {
			const found = this.tabManager.getBySessionId(msg.params.sessionId);
			if (found) {
				tabId = found.tabId;
				tab = found.tab;
			}
		}

		// Try child session
		if (!tab && msg.params.sessionId) {
			const parentTabId = this.tabManager.getParentTabId(msg.params.sessionId);
			if (parentTabId) {
				tabId = parentTabId;
				tab = this.tabManager.get(parentTabId);
				this.logger.debug(
					"Found parent tab for child session:",
					msg.params.sessionId,
					"tabId:",
					parentTabId,
				);
			}
		}

		// Try by targetId in params
		if (
			!tab &&
			msg.params.params &&
			typeof msg.params.params === "object" &&
			"targetId" in msg.params.params
		) {
			const found = this.tabManager.getByTargetId(msg.params.params.targetId);
			if (found) {
				tabId = found.tabId;
				tab = found.tab;
			}
		}

		const debuggee = tabId ? { tabId } : undefined;

		switch (msg.params.method) {
			case "Runtime.enable": {
				if (!debuggee)
					throw new Error(
						`No debuggee found for Runtime.enable (sessionId: ${msg.params.sessionId})`,
					);
				try {
					await chrome.debugger.sendCommand(debuggee, "Runtime.disable");
					await new Promise((r) => setTimeout(r, 200));
				} catch {}
				return await chrome.debugger.sendCommand(
					debuggee,
					"Runtime.enable",
					msg.params.params,
				);
			}

			case "Target.createTarget": {
				const url = msg.params.params?.url || "about:blank";
				this.logger.debug("Creating new tab with URL:", url);
				const newTab = await chrome.tabs.create({ url, active: false });
				if (!newTab.id) throw new Error("Failed to create tab");
				await this.getOrCreateDevBrowserGroup(newTab.id);
				await new Promise((r) => setTimeout(r, 100));
				return { targetId: (await this.tabManager.attach(newTab.id)).targetId };
			}

			case "Target.closeTarget":
				return tabId
					? (await chrome.tabs.remove(tabId), { success: true })
					: (this.logger.log(
							`Target not found: ${msg.params.params?.targetId}`,
						),
						{ success: false });

			case "Target.activateTarget":
				return tabId
					? (await chrome.tabs.update(tabId, { active: true }), {})
					: (this.logger.log(
							`Target not found for activation: ${msg.params.params?.targetId}`,
						),
						{});
		}

		if (!debuggee || !tab)
			throw new Error(
				`No tab found for method ${msg.params.method} sessionId: ${msg.params.sessionId}`,
			);

		this.logger.debug("CDP command:", msg.params.method, "for tab:", tabId);
		const target = {
			...debuggee,
			sessionId:
				msg.params.sessionId !== tab.sessionId
					? msg.params.sessionId
					: undefined,
		};
		return await chrome.debugger.sendCommand(
			target,
			msg.params.method,
			msg.params.params,
		);
	}

	handleDebuggerEvent(source, method, params, sendFn) {
		const tab = source.tabId ? this.tabManager.get(source.tabId) : undefined;
		if (!tab) return;

		this.logger.debug(
			"Forwarding CDP event:",
			method,
			"from tab:",
			source.tabId,
		);

		if (
			method === "Target.attachedToTarget" &&
			params &&
			typeof params === "object" &&
			"sessionId" in params
		) {
			this.tabManager.trackChildSession(params.sessionId, source.tabId);
		}
		if (
			method === "Target.detachedFromTarget" &&
			params &&
			typeof params === "object" &&
			"sessionId" in params
		) {
			this.tabManager.untrackChildSession(params.sessionId);
		}

		sendFn({
			method: "forwardCDPEvent",
			params: { sessionId: source.sessionId || tab.sessionId, method, params },
		});
	}
}

// ============================================================================
// State Store
// ============================================================================

class StateStore {
	async getState() {
		return (
			(await chrome.storage.local.get(STORAGE_KEY))[STORAGE_KEY] ?? {
				isActive: false,
			}
		);
	}
	async setState(state) {
		await chrome.storage.local.set({ [STORAGE_KEY]: state });
	}
}

// ============================================================================
// Main — initialize everything
// ============================================================================

const store = new StateStore();
let connectionManager;

const logger = createLogger(() => (msg) => connectionManager?.send(msg));

const tabManager = new TabManager({
	logger,
	getSendFn: () => (msg) => connectionManager?.send(msg),
});

const router = new CommandRouter({ logger, tabManager });

connectionManager = new ConnectionManager({
	logger,
	onMessage: (msg) => router.handleCommand(msg),
	// onDisconnect is ONLY called for manual deactivation (not WS drops)
	onDisconnect: () => tabManager.detachAll(),
	// onReconnect: re-announce tabs so relay server recovers state
	onReconnect: () => tabManager.reannounceAll(),
});

// Badge helper
function updateBadge(isActive) {
	chrome.action.setBadgeText({ text: isActive ? "ON" : "" });
	chrome.action.setBadgeBackgroundColor({ color: "#4CAF50" });
}

// Activate / deactivate
async function setActive(isActive) {
	await store.setState({ isActive });
	if (isActive) {
		connectionManager.startMaintaining();
	} else {
		connectionManager.disconnect(); // This one DOES detachAll — manual deactivation
	}
	updateBadge(isActive);
}

// Chrome alarms handler — keepalive + reconnection
chrome.alarms.onAlarm.addListener((alarm) => {
	connectionManager.handleAlarm(alarm.name);
});

// Debugger events
chrome.debugger.onEvent.addListener((source, method, params) => {
	router.handleDebuggerEvent(source, method, params, (msg) =>
		connectionManager.send(msg),
	);
});

chrome.debugger.onDetach.addListener((source, reason) => {
	const tabId = source.tabId;
	if (tabId) {
		logger.debug(`Debugger detached for tab ${tabId}: ${reason}`);
		tabManager.handleDebuggerDetach(tabId);
	}
});

// Tab closed
chrome.tabs.onRemoved.addListener((tabId) => {
	if (tabManager.has(tabId)) {
		logger.debug("Tab closed:", tabId);
		tabManager.detach(tabId, false);
	}
});

// Popup messages
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
	if (msg.type === "getState") {
		(async () => {
			const state = await store.getState();
			const isConnected = await connectionManager.checkConnection();
			sendResponse({ isActive: state.isActive, isConnected });
		})();
		return true; // async response
	}
	if (msg.type === "setState") {
		(async () => {
			await setActive(msg.isActive);
			const state = await store.getState();
			const isConnected = await connectionManager.checkConnection();
			sendResponse({ isActive: state.isActive, isConnected });
		})();
		return true;
	}
	return false;
});

// Clean up stale debugger connections on startup
chrome.debugger.getTargets().then((targets) => {
	const stale = targets.filter((t) => t.tabId && t.attached);
	if (stale.length > 0) {
		logger.log(`Detaching ${stale.length} stale debugger connections`);
		for (const t of stale) {
			chrome.debugger.detach({ tabId: t.tabId }).catch(() => {});
		}
	}
});

// Initialize
logger.log("Extension initialized (v2 — reliable reconnection)");
store.getState().then((state) => {
	updateBadge(state.isActive);
	if (state.isActive) {
		connectionManager.startMaintaining();
	}
});
