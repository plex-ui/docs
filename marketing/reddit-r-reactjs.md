# Reddit Post — r/reactjs

## Title Options (pick one):

**Option A (technical):**
`I built a design system with 9 sizes per control instead of 3. Here's why.`

**Option B (AI angle):**
`I made a React component library that AI code editors actually use correctly`

**Option C (direct):**
`Plex UI — open-source React components with 9-size scale, design tokens, and Figma parity`

---

## Post Body (Option A — recommended):

Most component libraries give you 3-4 button sizes: sm, md, lg. Maybe an xs if you're lucky.

I kept running into the same problem: building admin dashboards that needed compact 24px controls in toolbars, 32px in forms, 40px in settings pages, and 48px in hero sections. Every time I'd end up overriding sizes manually, which defeats the purpose of having a system.

So I built one with 9 sizes that go from 22px to 48px. Every control (Button, Input, Select, SegmentedControl) shares the same height scale. One `size` prop, no overrides.

**What it is:**

- 35 React components built on Radix primitives + Tailwind 4
- 9-step unified size scale (3xs through 3xl)
- Three-layer CSS variable token system (primitive → semantic → component)
- Dark mode via CSS `light-dark()`
- 14 hooks (responsive breakpoints, scroll detection, etc.)
- 467+ bundled icons

**The React library is free and MIT licensed:**

```bash
npm install @plexui/ui
```

There's also a paid Figma kit ($49+) if your team needs the design side. Every size, color, and token exists identically in both Figma and code.

[Docs + live examples](https://plexui.com/docs/components)
[GitHub](https://github.com/plex-ui/docs)
[npm](https://www.npmjs.com/package/@plexui/ui)

Happy to answer any questions about the architecture decisions, especially the token system and why 9 sizes actually matters for real products.

---

## Post Body (Option B — AI angle):

I've been using Claude, Cursor, and Codex for UI development and noticed a pattern: without a proper component library, every prompt generates a fresh set of magic numbers. A button is 36px here, 42px there. Colors are random hex values. Spacing is inconsistent across pages.

The AI can write code, but it needs building blocks to produce consistent interfaces. So I built Plex UI — a React component library designed to be a foundation that AI editors actually follow.

**What makes it different:**

- **9-size scale** — not 3, not 4. 22px to 48px on every control (Button, Input, Select, etc.)
- **Three-layer token system** — primitive, semantic, and component-level CSS variables. The AI uses these instead of inventing values
- **Radix + Tailwind 4** — accessible, composable, utility-friendly
- **35 components, 14 hooks, 467+ icons** built-in

The library is free and open-source:

```bash
npm install @plexui/ui
```

Docs with live examples: [plexui.com](https://plexui.com)

There's also a paid Figma design system ($49+) with pixel-perfect parity if your team has designers.

Curious what other approaches people are using to keep AI-generated UI consistent.

---

## r/webdev Adaptation (post 2-3 days later)

**Title:** `Open-source design system with 9-size scale, design tokens, and AI editor support`

Keep the same body but add a line at the top:
"Cross-posting from r/reactjs where this got some discussion. Wanted to share with the broader web dev community too."

---

## Engagement Rules:

1. Respond to EVERY comment within 2 hours
2. If someone asks a technical question, give a real technical answer
3. If someone compares to shadcn, be honest: "shadcn is great for X, we focus on Y"
4. Never be defensive about criticism
5. Thank people who try it and report issues
6. If the post gets removed, don't repost — message mods and ask what rule was violated
