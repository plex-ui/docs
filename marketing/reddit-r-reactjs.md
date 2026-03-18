# Reddit Post — r/reactjs

## Title Options (pick one):

**Option A (Bridge angle — recommended for timing):**
`I built a local Figma plugin that lets any AI model design AND code — not just Claude`

**Option B (technical — 9 sizes):**
`I built a design system with 9 sizes per control instead of 3. Here's why.`

**Option C (AI foundation):**
`I made a React component library that AI code editors actually use correctly`

---

## Post Body (Option A — Bridge angle, recommended):

Figma just announced an official Claude Code → Figma integration (Feb 17). It's Claude-only and routes through their servers.

I'd already built something different: a local Bridge plugin that lets **any** AI model create and edit real Figma nodes via HTTP. Claude, GPT, Cursor, Codex, Gemini — anything that can make an HTTP call works.

**How it works:**

The Bridge runs a local server. Your AI model sends commands to `localhost:8767`:

```
POST http://localhost:8767/command
{"command": "create-frame", "params": {"name": "Hero", "width": 1024, "layoutMode": "VERTICAL"}}
```

It can create frames, text, components, instances. Set auto-layout, fills, strokes. Bind Figma Variables (design tokens). Read existing designs. Export as PNG/SVG. Two-way: the AI designs in Figma AND reads Figma back into code.

**Why I built this:**

I was tired of the Figma → code gap. Designers make a layout, developers approximate it. With the Bridge, the AI does both directions. Describe a UI → it appears in Figma → designer tweaks → AI reads the updated design → generates matching React code.

**The Bridge is part of a bigger system — Plex UI:**

- **Free React library** (`npm install @plexui/ui`, MIT) — 35+ components built on Radix + Tailwind 4
- **9-step size scale** (3xs to 3xl, 22px to 48px) — every control shares the same `size` prop
- **Three-layer token system** — primitive → semantic → component CSS variables
- **6,600+ icons**, 14 hooks, dark mode via CSS `light-dark()`
- **Figma kit** ($49–$299) — 22,000+ variants, all tokens as Figma Variables
- **Bridge plugin** ($49 one-time) — any AI model → Figma

The React library is free. The Bridge and Figma kit are what you pay for.

[Docs](https://plexui.com/docs/components) · [Bridge](https://plexui.com/bridge) · [GitHub](https://github.com/plex-ui/docs) · [npm](https://www.npmjs.com/package/@plexui/ui)

Happy to answer questions — especially about the Bridge architecture and how it compares to the official Claude-Figma flow.

---

## Post Body (Option B — 9 sizes, technical):

Most component libraries give you 3–4 button sizes: sm, md, lg. Maybe an xs if you're lucky.

I kept running into the same problem: building admin dashboards that needed compact 24px controls in toolbars, 32px in forms, 40px in settings pages, and 48px in hero sections. Every time I'd end up overriding sizes manually, which defeats the purpose of having a system.

So I built one with 9 sizes that go from 22px to 48px. Every control (Button, Input, Select, SegmentedControl) shares the same height scale. One `size` prop, no overrides.

**What it is:**

- 35+ React components built on Radix primitives + Tailwind 4
- 9-step unified size scale (3xs through 3xl)
- Three-layer CSS variable token system (primitive → semantic → component)
- Dark mode via CSS `light-dark()`
- 6,600+ icons, 14 hooks
- Figma Bridge — any AI model can create/edit Figma designs via local HTTP API

**The React library is free and MIT licensed:**

```bash
npm install @plexui/ui
```

There's also a paid Figma kit ($49+) and a Bridge plugin ($49) that lets any AI model design directly in Figma — a model-agnostic alternative to the Claude-only Figma integration.

[Docs + live examples](https://plexui.com/docs/components) · [Bridge](https://plexui.com/bridge) · [GitHub](https://github.com/plex-ui/docs) · [npm](https://www.npmjs.com/package/@plexui/ui)

Happy to answer any questions about the architecture, especially the token system and why 9 sizes actually matters for real products.

---

## Post Body (Option C — AI foundation):

I've been using Claude, Cursor, and Codex for UI development and noticed a pattern: without a proper component library, every prompt generates a fresh set of magic numbers. A button is 36px here, 42px there. Colors are random hex values. Spacing is inconsistent across pages.

The AI can write code, but it needs building blocks to produce consistent interfaces. So I built Plex UI — a React component library designed as the foundation that AI editors actually follow.

**What makes it different:**

- **9-size scale** — not 3, not 4. 22px to 48px on every control (Button, Input, Select, etc.)
- **Three-layer token system** — primitive, semantic, and component-level CSS variables. The AI uses these instead of inventing values
- **Figma Bridge** — any AI model can create AND edit Figma designs via a local HTTP API. Not locked to Claude
- **Radix + Tailwind 4** — accessible, composable, utility-friendly
- **35+ components, 14 hooks, 6,600+ icons** built-in

The library is free and open-source:

```bash
npm install @plexui/ui
```

There's also a paid Figma design system ($49+) with pixel-perfect parity, and a Bridge plugin ($49) for AI-to-Figma workflows.

Docs with live examples: [plexui.com](https://plexui.com) · [Bridge](https://plexui.com/bridge)

Curious what other approaches people are using to keep AI-generated UI consistent.

---

## r/webdev Adaptation (post 2–3 days later)

**Title:** `Open-source design system with 9-size scale, Figma Bridge for any AI model, and design tokens`

Keep the same body but add at the top:
"Cross-posting from r/reactjs where this got some discussion. Wanted to share with the broader web dev community too."

---

## Prepared Responses:

**"How is this different from shadcn?"**
> shadcn is great for unstyled primitives you fully customize — more like a starting kit. Plex UI is a complete system: 9 sizes, three-layer tokens, Figma parity, and a Bridge that connects any AI directly to Figma. The React library is also free and MIT licensed. Different tools — both valid.

**"How does the Bridge compare to the official Claude-Figma integration?"**
> Two differences: (1) Bridge works with any AI model, not just Claude. If you use Cursor or GPT, the official integration doesn't help. (2) Bridge runs 100% locally — your designs never leave your machine. It's $49 one-time, no subscription.

**"Does the Bridge work with Cursor's agent mode?"**
> Yes. Agent mode can make HTTP calls, so Cursor autonomously creates and modifies Figma designs. Give it the API context in your rules file or chat. I can share the exact `.cursor/rules` setup if you want.

**"$49 seems expensive for a Figma file / plugin"**
> The React library is completely free. The Figma kit is 22,000+ variants with three-layer tokens as Figma Variables — building this from scratch takes months. The Bridge is $49 one-time lifetime for any AI model → Figma. No subscription.

**"How many downloads / stars?"**
> It's early — just launched. The library works in production and I'm using it myself. Happy to have people try it and report issues.

---

## Engagement Rules:

1. Respond to EVERY comment within 2 hours
2. If someone asks a technical question, give a real technical answer
3. If someone compares to shadcn, be honest: "shadcn is great for X, we focus on Y"
4. Never be defensive about criticism
5. Thank people who try it and report issues
6. If the post gets removed, don't repost — message mods and ask what rule was violated
