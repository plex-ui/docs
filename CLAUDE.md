# Claude — project instructions

**All rules live in [`AGENTS.md`](./AGENTS.md)** (single source of truth). This file exists because Claude Code scans `CLAUDE.md` at session start; it's a thin alias that points to `AGENTS.md`.

## Hot-cross-reference — rules that have bitten repeatedly

- 🔴 [Rule 0 — never hardcode styles that a component already ships](./AGENTS.md#🔴-rule-0--never-hardcode-styles-that-a-component-already-ships)
- 🔴 [**Post-change verification is MANDATORY** — rebuild → `rm -rf .next` → restart → curl 200, every time](.memory/decisions/0008-post-change-verification-mandatory.md)
- 🔴 [Restart Next dev after adding a new packages/ui component](./AGENTS.md#🔴-restart-next-dev-after-adding-a-new-packagesui-component)
- 🔴 [Interactive demos must render client-only — never SSR](./AGENTS.md#🔴-interactive-demos-must-render-client-only--never-ssr)
- [Deploy hygiene — verify every Vercel push](./AGENTS.md#deploy-hygiene--vercel-verification-is-mandatory)
- [MDX canonical component-page structure](./AGENTS.md#mdx-authoring-rules)
- [Component registration checklist (6 files)](./AGENTS.md#component-registration--modification-checklist)

Read `AGENTS.md` before making any change. Read `.memory/` on session start for the private decision log.

## After every change touching `packages/ui/` — non-negotiable

```bash
cd packages/ui && npm run build && cd ../..
rm -rf .next
lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev:all   # background
sleep 4 && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/docs/<affected-route>
# Must be 200. If not, fix the error — do NOT report "done" to the user.
```

Full rationale + history of why this rule exists: [`.memory/decisions/0008-post-change-verification-mandatory.md`](.memory/decisions/0008-post-change-verification-mandatory.md)
