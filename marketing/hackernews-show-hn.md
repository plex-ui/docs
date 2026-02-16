# Hacker News — Show HN

## Title:

`Show HN: Plex UI – Open-source React design system with 9-size scale and Figma parity`

## URL:

`https://plexui.com`

---

## First Comment (post immediately after submission):

Hi HN, I'm the creator of Plex UI.

**The problem:** Most component libraries ship 3-4 sizes per control. That works for simple apps, but when you're building admin dashboards, dense data tables, compact toolbars, AND spacious marketing pages in the same product, you spend more time overriding sizes than building features.

**The solution:** A unified 9-step size scale (22px to 48px) shared across every control — Button, Input, Select, SegmentedControl, etc. One `size` prop handles everything from `3xs` (compact toolbars) to `3xl` (hero CTAs).

**Technical decisions:**

- Three-layer CSS variable token system: primitive tokens (raw values) → semantic tokens (purpose-based: `--color-text-primary`) → component tokens (`--button-bg-solid`). Change one variable, the whole system updates.
- Built on Radix primitives for accessibility, styled with Tailwind 4 via `@import "@plexui/ui/css"`.
- Dark mode uses CSS `light-dark()` function — no JavaScript theme switching, no flash on load.
- 35 components, 14 hooks, 467+ icons, all tree-shakeable.

The React library is MIT licensed: `npm install @plexui/ui`

There's also a commercial Figma kit ($49+) where every component, size, and token exists identically. Designers work in Figma, developers import the same component — no translation step.

Docs: https://plexui.com/docs/components
npm: https://www.npmjs.com/package/@plexui/ui

Happy to discuss the architecture — especially the token system design and the "why 9 sizes" rationale.

---

## Prepared Responses:

**Q: "Why not just use shadcn?"**
> shadcn is excellent for unstyled primitives you fully customize. Plex UI is a complete design system with a defined scale, token layers, and Figma parity. Different goals — shadcn gives you ingredients, Plex UI gives you a recipe. The React library is also free/MIT.

**Q: "Why would I pay for a Figma file?"**
> The React library is free. The Figma kit is for teams with designers who need the full visual system — 22,000 variants, all tokens as Figma Variables, dark/light modes. It saves months of design system setup. But if you're code-only, you never need to pay anything.

**Q: "9 sizes seems like overkill"**
> Fair concern. In practice, most projects use 4-5 of the 9 sizes, but different projects pick different subsets. A compact SaaS dashboard uses 3xs-sm. A marketing site uses lg-3xl. Having the full range means one system covers everything without overrides.

**Q: "How does this compare to Tailwind UI / Headless UI?"**
> Tailwind UI is pre-built templates and pages. Headless UI is unstyled primitives (similar to Radix, which we build on). Plex UI sits in between — styled, systematic components with a defined token architecture. They're complementary, not competing.

---

## Timing:

- Post Tuesday-Thursday, 8-10 AM ET
- Monitor for 4-6 hours after posting
- Respond to every comment, especially critical ones
