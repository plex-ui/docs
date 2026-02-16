# Product Hunt Launch

## Listing Details

**Product Name:** Plex UI

**Tagline (60 chars max):**
`The Figma + React design system with 9 sizes, not 4`

**Alternative taglines:**
- `A design system that works in Figma, React, and AI editors`
- `Production-grade Figma kit + free React components`
- `22,000 Figma variants. 35 React components. One system.`

---

## Description:

Plex UI is a production-grade design system for Figma and React.

**The problem:** Most component libraries give you 3-4 button sizes. That's fine for a landing page, but real products need compact toolbars, standard forms, spacious settings pages, and hero sections — all in the same app.

**The solution:** A unified 9-step size scale (22px to 48px) shared across every control. Button, Input, Select, SegmentedControl — they all use the same `size` prop. No overrides, no custom CSS.

**What's included:**

React Library (free, open-source):
- 35 accessible components built on Radix + Tailwind 4
- 9-step unified size scale (3xs through 3xl)
- Three-layer CSS variable token system
- Dark mode via CSS light-dark()
- 467+ icons, 14 hooks
- Tree-shakeable, zero runtime theme

Figma Design System (paid, from $49):
- 22,000+ component variants
- All tokens as Figma Variables
- 6,600+ icons
- Dark & light themes
- Lifetime updates

**Built for AI code editors:** Claude, Cursor, and Codex produce consistent UI when they have proper building blocks. Plex UI's components, tokens, and naming conventions give AI the vocabulary to generate production-quality interfaces.

---

## Maker Comment (post immediately after launch):

Hey Product Hunt!

I'm Sergey, the creator of Plex UI. I've been designing and building product interfaces for years, and I kept hitting the same wall: the gap between Figma and code.

Designers would create beautiful mockups with specific sizes, spacing, and tokens. Developers would approximate them with whatever the component library offered — usually 3-4 sizes and a handful of color variables.

So I built a system where both sides use the exact same building blocks:

**For designers:** A Figma library with 22,000+ variants, three layers of design tokens as Figma Variables, and a 9-step size scale. Change a variable, and every component updates.

**For developers:** A free React component library that mirrors the Figma system exactly. Same sizes, same tokens, same dark mode.

**For AI workflows:** If you're using Claude, Cursor, or Codex to build UI, Plex UI gives the AI proper building blocks instead of letting it invent magic numbers on every prompt.

The React library is completely free and open-source (MIT). The Figma design system starts at $49 for individuals and goes up to $299 for unlimited teams.

I'd love your feedback — especially on the component quality, docs, and whether the 9-size scale makes sense for your workflow.

---

## Gallery Images (5 images, 1270x760px):

1. **Hero shot** — Landing page screenshot or key visual showing Figma + React side by side
2. **Size scale** — The 9-step size demo (3xs to 3xl) showing all controls at different sizes
3. **Token system** — Visual showing the three-layer architecture (primitive → semantic → component)
4. **Dark mode** — Side-by-side light/dark theme showing the same components
5. **Component overview** — Grid showing a selection of the 35 components

---

## Topics:

- Design Tools
- Developer Tools
- Figma
- React
- Open Source

## Prepared Responses:

**"How is this different from shadcn/ui?"**
> Great question! shadcn gives you unstyled primitives that you fully customize — it's more like a starting kit. Plex UI is a complete design system with a defined scale (9 sizes), three-layer token architecture, and pixel-perfect Figma parity. The React library is also free and MIT licensed, so you can try both and see which fits your workflow better.

**"$49 for a Figma file seems expensive"**
> The React library is completely free — you can use Plex UI without paying anything. The Figma kit is for design teams who need the full visual system: 22,000+ variants, three-layer tokens as Variables, 6,600+ icons, and lifetime updates. Building this from scratch typically takes 3-6 months of design time.

**"Do I need the Figma kit if I only code?"**
> Not at all! The React library works standalone. Install from npm, import the CSS, and start using components. The Figma kit is purely for design workflows.

**"What AI editors does it work with?"**
> Any AI code editor that can read npm packages: Claude (Anthropic), Cursor, Codex (OpenAI), Windsurf, etc. We have a dedicated AI setup guide in the docs that walks through configuration for each tool.

---

## Launch Timing:

- **Best days:** Tuesday or Wednesday
- **Launch time:** 12:01 AM PT (Product Hunt resets at midnight PT)
- **Active monitoring:** First 12 hours are critical
- **Goal:** Top 5 of the day
