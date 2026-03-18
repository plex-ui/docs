# Product Hunt Launch

## Listing Details

**Product Name:** Plex UI

**Tagline (60 chars max):**
`Figma + React design system with a Bridge for any AI model`

**Alternative taglines:**
- `The design system that works in Figma, React, and any AI editor`
- `9 sizes, design tokens, and a model-agnostic Figma Bridge`
- `22,000 Figma variants. 35 React components. Bridge for any AI.`

---

## Description:

Plex UI is a production-grade design system for Figma and React — plus a model-agnostic Figma Bridge that lets any AI create and edit real designs.

**Problem 1 — Sizing:** Most component libraries give you 3–4 button sizes. Real products need compact toolbars, standard forms, spacious settings pages, and hero sections — all in the same app.

**Solution:** A unified 9-step size scale (22px to 48px) shared across every control. Button, Input, Select, SegmentedControl — they all use the same `size` prop. No overrides, no custom CSS.

**Problem 2 — AI + Figma:** Figma's official code-to-design integration is Claude-only. Teams using Cursor, GPT, Codex, or other models are left out.

**Solution:** The Plex UI Bridge — a local Figma plugin that lets ANY AI model create, read, and edit Figma designs via HTTP commands. Model-agnostic, runs locally, designs never leave your machine.

**What's included:**

React Library (free, open-source):
- 35+ accessible components built on Radix + Tailwind 4
- 9-step unified size scale (3xs through 3xl)
- Three-layer CSS variable token system
- Dark mode via CSS light-dark()
- 6,600+ icons, 14 hooks
- Tree-shakeable, zero runtime theme

Figma Design System (paid, from $49):
- 22,000+ component variants
- All tokens as Figma Variables
- Dark & light themes
- Lifetime updates

Figma Bridge Plugin ($49 one-time):
- Any AI model creates/edits real Figma designs
- Local HTTP API — no vendor lock-in
- Two-way: design ↔ code
- Alternative to Claude-only Figma integration

---

## Maker Comment (post immediately after launch):

Hey Product Hunt!

I'm Sergey, the creator of Plex UI. I've been building product interfaces for years and kept hitting two walls:

**Wall 1: The sizing gap.** Designers create layouts with specific sizes. Developers get a library with 3 button sizes and approximate everything. I built a 9-step size scale (22px to 48px) that every control shares — Button, Input, Select, everything. One `size` prop covers compact dashboards through hero sections.

**Wall 2: The Figma ↔ code gap.** Figma recently announced a Claude-only code-to-design flow. But most teams switch between AI models depending on the task. So I built the Bridge — a local Figma plugin that lets ANY AI model create and edit real Figma designs via HTTP commands. Claude, GPT, Cursor, Codex, Gemini — anything works. Your designs never leave your machine.

**For designers:** A Figma library with 22,000+ variants, three layers of design tokens as Figma Variables, and a 9-step size scale. Change a variable, and every component updates.

**For developers:** A free React component library that mirrors the Figma system exactly. Same sizes, same tokens, same dark mode.

**For AI workflows:** The Bridge gives any AI model the ability to design in Figma AND read designs back into code. Two-way flow, model-agnostic.

The React library is free and MIT licensed. The Figma design system starts at $49. The Bridge plugin is $49 one-time.

I'd love your feedback — especially on the Bridge workflow and whether the 9-size scale makes sense for your use case.

---

## Gallery Images (5 images, 1270x760px):

1. **Hero shot** — Figma + React side by side with Bridge in the middle connecting them
2. **Size scale** — The 9-step size demo (3xs to 3xl) showing all controls
3. **Bridge workflow** — AI model → Figma → designer edits → AI reads back → code
4. **Token system** — Three-layer architecture (primitive → semantic → component)
5. **Dark mode** — Side-by-side light/dark theme

---

## Topics:

- Design Tools
- Developer Tools
- Figma
- React
- Open Source

## Prepared Responses:

**"How is this different from shadcn/ui?"**
> shadcn gives you unstyled primitives to fully customize — more like a starting kit. Plex UI is a complete system with 9 sizes, three-layer tokens, Figma parity, and a model-agnostic Bridge. The React library is also free/MIT. Both are valid — different goals.

**"$49 for a Figma file seems expensive"**
> The React library is completely free. The Figma kit is 22,000+ variants, three-layer tokens as Variables, 6,600+ icons, lifetime updates. Building this from scratch takes 3–6 months. The Bridge is separately $49 one-time for any AI model → Figma — no subscription.

**"Do I need the Figma kit if I only code?"**
> Not at all. The React library works standalone. The Figma kit is for design teams. The Bridge is for AI-to-Figma workflows.

**"Which AI models does the Bridge support?"**
> Any model that can make HTTP requests. Claude, GPT-4, Cursor, Codex, Gemini, Copilot, Windsurf — it's a simple REST API at localhost. No SDK needed, no vendor lock-in.

**"How does Bridge compare to the official Claude-Figma integration?"**
> Bridge is model-agnostic (any AI, not just Claude), runs locally (designs stay on your machine), and supports two-way flow (AI designs AND reads back). $49 one-time, lifetime license.

---

## Launch Timing:

- **Best days:** Tuesday or Wednesday
- **Launch time:** 12:01 AM PT (Product Hunt resets at midnight PT) = 9:01 AM Madrid
- **Active monitoring:** First 12 hours are critical
- **Goal:** Top 5 of the day
