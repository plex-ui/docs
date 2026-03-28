# Reddit Post — r/ClaudeAI

## Title:

`I built an open alternative to Figma's Claude-to-Figma feature — it works with ANY model, not just Claude`

---

## Post Body:

After Figma announced the official Claude Code → Figma integration (Feb 17), I noticed two limitations:

1. It's locked to Claude
2. It goes through Figma's servers

I'd already built something different: a local Bridge plugin that lets **any** AI model create and edit real Figma nodes directly.

**How it works:**

The Bridge runs locally — a Figma plugin + a tiny local server. Your AI model (Claude, GPT, Cursor, Codex, Gemini, whatever) sends HTTP commands to `localhost:8767`, and the plugin executes them in Figma. Create frames, text, components, bind design tokens, set auto-layout — all programmatically.

```
POST http://localhost:8767/command
{"command": "create-frame", "params": {"name": "Hero", "width": 1024, "layoutMode": "VERTICAL"}}
```

The model can also **read** your Figma file — inspect component structure, tokens, auto-layout settings — and then generate matching React code. Design ↔ code in both directions.

**Why model-agnostic matters:**

- Use Claude for design, GPT for code review, Cursor for implementation — same Bridge
- No vendor lock-in. If a better model comes out tomorrow, just point it at the same API
- Runs locally. Your design data doesn't leave your machine
- Works with ANY tool that can make HTTP calls

**What's the Bridge part of:**

It's part of [Plex UI](https://plexui.com) — a Figma + React design system. The React library is free/MIT on npm (`@plexui/ui`, 35 components, 9-size scale). The Bridge plugin is $49 one-time, lifetime license.

There's also a paid Figma kit ($49-$299) with 22,000+ variants built entirely on Figma Variables.

**Quick install:**

1. Import the plugin manifest in Figma
2. Run the bridge launcher (macOS/Windows)
3. Give your AI model the API endpoint

Setup takes ~2 minutes. Details: [plexui.com/bridge](https://plexui.com/bridge)

I'm curious — anyone here tried the official Claude-to-Figma flow? How does it compare to having a model-agnostic API?

---

## Prepared Responses:

**Q: "How is this different from the official Claude-Figma integration?"**
> The official flow is Claude-only and routes through Figma's cloud. The Bridge runs 100% locally — your AI sends HTTP commands to localhost, the plugin executes them directly in Figma. Any model works: Claude, GPT, Cursor, Codex, Gemini. Your design data never leaves your machine.

**Q: "Why would I pay $49 when Claude-Figma is built in?"**
> Two reasons: (1) Model freedom — the Bridge works with any AI, not just Claude. If you use Cursor, Copilot, or GPT, the official integration doesn't help. (2) Local-first — your designs stay on your machine. The $49 is one-time, no subscription.

**Q: "Can Claude use the Bridge too?"**
> Absolutely. Claude works great with it. The Bridge is just an HTTP API — any model that can make HTTP calls works. You could even use it from a bash script. The difference is you're not locked to one provider.

**Q: "What commands are available?"**
> Full CRUD on Figma nodes: create frames, text, rectangles, components, instances. Set fills, strokes, effects, auto-layout. Bind Figma Variables to any property. Query node structure. Export as PNG/SVG. Batch multiple commands. Full command list is in the docs.

---

## Engagement Rules:

1. r/ClaudeAI is generally positive toward tools that extend Claude's capabilities
2. Don't bash the official Figma-Claude integration — position as "complementary" and "more flexible"
3. Be technical and specific — this audience appreciates implementation details
4. If anyone asks about MCP, explain that Bridge uses a simpler HTTP API pattern
