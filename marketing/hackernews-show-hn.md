# Hacker News — Show HN

## Title:

`Show HN: Plex UI – React design system with 9-size scale, Figma parity, and a model-agnostic Figma Bridge`

## URL:

`https://plexui.com`

---

## First Comment (post immediately after submission):

Hi HN, I'm the creator of Plex UI.

**Problem 1 — Sizing:** Most component libraries ship 3–4 sizes per control. That works for simple apps, but when you're building admin dashboards, dense data tables, compact toolbars, AND spacious marketing pages in the same product, you spend more time overriding sizes than building features.

**Solution:** A unified 9-step size scale (22px to 48px) shared across every control — Button, Input, Select, SegmentedControl, etc. One `size` prop handles everything from `3xs` (compact toolbars) to `3xl` (hero CTAs).

**Problem 2 — AI and Figma:** Figma recently announced a Claude-only code-to-design integration. Great for Claude users, but most of us switch between models depending on the task. I built a model-agnostic Bridge — a local Figma plugin + HTTP server that lets any AI (Claude, GPT, Cursor, Codex, Gemini) create and edit real Figma nodes.

**Technical decisions:**

- Three-layer CSS variable token system: primitive tokens (raw values) → semantic tokens (`--color-text-primary`) → component tokens (`--button-bg-solid`). Change one variable, the whole system updates.
- Built on Radix primitives for accessibility, styled with Tailwind 4.
- Dark mode uses CSS `light-dark()` function — no JavaScript theme switching, no flash on load.
- 35+ components, 14 hooks, 6,600+ icons, all tree-shakeable.
- Bridge: HTTP API at localhost:8767. Any tool that can POST JSON can create Figma designs. `{"command":"create-frame","params":{"name":"Hero","layoutMode":"VERTICAL"}}`.

The React library is MIT licensed: `npm install @plexui/ui`

Paid products: Figma kit ($49–$299, 22,000+ variants as Figma Variables) and Bridge plugin ($49 one-time, any AI model → Figma).

Docs: https://plexui.com/docs/components
Bridge: https://plexui.com/bridge
npm: https://www.npmjs.com/package/@plexui/ui

Happy to discuss the architecture — the token system, the "why 9 sizes" rationale, and the Bridge design.

---

## Prepared Responses:

**Q: "Why not just use shadcn?"**
> shadcn is excellent for unstyled primitives you fully customize. Plex UI is a complete design system with a defined scale, three-layer tokens, Figma parity, and a model-agnostic Figma Bridge. Different goals — shadcn gives you ingredients, Plex UI gives you a recipe. The React library is also free/MIT.

**Q: "Why would I pay for a Figma file?"**
> The React library is free. The Figma kit is for teams with designers who need the full visual system — 22,000 variants, all tokens as Figma Variables, dark/light modes. It saves months of design system setup. Code-only teams never need to pay anything.

**Q: "9 sizes seems like overkill"**
> Fair concern. In practice, most projects use 4–5 of the 9, but different projects pick different subsets. A compact SaaS dashboard uses 3xs–sm. A marketing site uses lg–3xl. Having the full range means one system covers everything without overrides.

**Q: "How does the Bridge compare to Claude-Figma?"**
> Bridge is model-agnostic (any AI, not just Claude), runs 100% locally (designs stay on your machine), and supports two-way flow (AI creates Figma AND reads Figma back). The official integration is Claude-only and routes through Figma's servers. $49 one-time vs whatever Figma charges.

**Q: "What's the HTTP API like?"**
> Simple REST. POST a JSON command, get a JSON response. Create frames, text, components, instances. Set auto-layout, fills, effects. Bind Figma Variables. Query node structure. Batch operations. The full command set is ~25 commands covering CRUD on Figma nodes. Any tool that can make HTTP calls works — no SDK needed.

---

## Timing:

- Post Tuesday–Thursday, 8–10 AM ET (15:00–17:00 Madrid)
- Monitor for 4–6 hours after posting
- Respond to every comment, especially critical ones
