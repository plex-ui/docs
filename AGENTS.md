# Plex UI Documentation Site — Agent Context

This file provides initial context for every new chat session about the Plex UI documentation site (plexui-docs). Use it to understand the project, the component library, and how to add or fix component pages.

---

## 1. Project overview

- **plexui-docs** is a Next.js 15 + Fumadocs documentation site for Plex UI (plexui.com).
- The site uses **@plexui/ui** as a file dependency pointing to `../storybook`.
- The **source of truth** for component implementations, stories, and examples is in **../storybook/src/components/** (the Plex UI package).

---

## 2. What is Plex UI

Plex UI is a **commercial Figma + React component kit** based on the same design foundations as **OpenAI's Apps SDK UI** (`@openai/apps-sdk-ui`) — the design system used inside **ChatGPT**.

- Open source: https://github.com/openai/apps-sdk-ui (MIT, 830+ stars)
- Docs: https://openai.github.io/apps-sdk-ui/
- Built on: **Radix primitives**, **Tailwind 4**, **React 18/19**

### Key differentiators

1. **Battle-tested at ChatGPT scale** — components are validated in a product used by hundreds of millions. Not a theoretical design system.
2. **9-step size scale** — all key controls (Button, Input, Select, SelectControl, SegmentedControl, etc.) share a unified `ControlSize` scale with **9 sizes** (3xs through 3xl). Competitors like shadcn/ui offer only 3–4.
3. **Pixel-perfect Figma-to-code parity** — all 9 sizes, all variants, same tokens exist identically in Figma and React.
4. **Three-layer design token architecture** — primitive → semantic → component tokens, with `light-dark()` CSS theming, alpha transparency scale, 4-level elevation system, and control-specific tokens.

### Unified ControlSize scale

All key controls share the same height scale:

| Size | Height | Notes |
|------|--------|-------|
| 3xs | 22px | Compact — data-dense UIs |
| 2xs | 24px | |
| xs | 26px | |
| sm | 28px | |
| **md** | **32px** | **Default** |
| lg | 36px | |
| xl | 40px | |
| 2xl | 44px | |
| 3xl | 48px | Spacious — hero CTAs, marketing |

Each size provides default values for `gutterSize`, `iconSize`, `font-size`, and `border-radius`. Each can be overridden independently. The `pill` prop adds a 1.33x gutter scaling factor.

### Size comparison vs competitors

| Size | Plex UI | shadcn/ui |
|------|---------|-----------|
| 3xs (22px) | Yes | — |
| 2xs (24px) | Yes | — |
| xs (26px) | Yes | — |
| sm (28px) | Yes | sm (36px) |
| md (32px) | Yes (default) | default (40px) |
| lg (36px) | Yes | lg (44px) |
| xl (40px) | Yes | — |
| 2xl (44px) | Yes | — |
| 3xl (48px) | Yes | — |

shadcn/ui has 4 button sizes (sm, default, lg, icon). Plex UI has 9 sizes across all controls.

---

## 3. Component inventory (35 components)

**Documented (34):** Alert, Avatar, AvatarGroup, Badge, Button, ButtonLink, Checkbox, CodeBlock, CopyTooltip, DatePicker, DateRangePicker, EmptyMessage, FieldError, FloatingLabelInput, Image, Indicators, Input, Markdown, Menu, Popover, ProgressSteps, RadioGroup, SegmentedControl, Select, SelectControl, ShimmerText, Sidebar, Skeleton, Slider, Switch, TagInput, TextLink, Textarea, Tooltip.

**Documented elsewhere:** Icon (foundations/icons, 467+ SVG icons), Transition (transitions section — Animate, AnimateLayout, AnimateLayoutGroup, SlotTransitionGroup, TransitionGroup).

**Internal only:** PlexUIProvider, UIProvider.

---

## 4. Design token architecture

**Three layers of CSS custom properties:**

- `variables-primitive.css` — base color palettes (gray 0–1000, semantic colors), alpha transparency (17 stops: 2%–70%)
- `variables-semantic.css` — semantic colors, typography, control sizes, surfaces, elevation
- `variables-components.css` — component-specific overrides

**Color system:** 8 semantic colors (primary, secondary, danger, success, warning, caution, discovery, info), each with `soft`, `solid`, `outline`, `ghost`, `surface` variants and hover/active states. Light/dark via CSS `light-dark()` function.

**Typography:** heading scale (5xl–xs), text scale (lg–3xs), with explicit tracking tokens.

**Elevation:** 4 levels (100–400), base/strong/stronger variants, theme-aware alpha.

**Motion:** cubic-bezier enter/exit/move curves, 150ms base duration.

**Radius scale:** 2xs (2px) → full (9999px), 10 steps.

---

## 5. Repository structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js app with docs layout, `[[...slug]]` for MDX pages |
| `content/docs/` | MDX documentation (components, concepts, foundations, hooks, overview, transitions) |
| `components/docs/` | Reusable doc-site components: ComponentPreview, ComponentSource, PropsTable, UsageBlock, and per-component demo files (e.g. MenuDemos.tsx) |
| `mdx-components.tsx` | Global MDX component mapping (ComponentPreview, ComponentSource, Accordions, Accordion, etc.) |

**Documentation sections:**
- `overview/` — index (intro), installation, sizing, comparison, blocks, templates, why-9-sizes, changelog
- `foundations/` — colors, design-tokens, icons, typography
- `concepts/` — dark-mode, responsive-design
- `components/` — 34 component pages + index (Alert through Tooltip, including FieldError, Image, ShimmerText)
- `hooks/` — all 14 hooks on single index page (legacy URLs redirect)
- `transitions/` — 5 transition-related pages

**Key overview pages:**
- `sizing` — interactive playground demonstrating the 9-step size scale across all controls
- `comparison` — visual side-by-side of Plex UI vs shadcn/ui with feature comparison table
- `blocks` — 12 ready-to-use layouts (5 marketing + 7 application blocks)
- `templates` — 3 full-page templates (Dashboard, SaaS Landing, Chat Interface)
- `why-9-sizes` — article "Why ChatGPT uses 9 button sizes" explaining UX rationale

**Blocks inventory:**
- Marketing: Hero, Feature grid, Pricing cards, Newsletter signup, Testimonials
- Application: Settings form, Data table, Chat interface, Login form, File upload, Activity feed, Notification panel, Command palette

**Templates:** Dashboard (admin + sidebar + stats + table), SaaS Landing (hero + features + pricing + CTA), Chat Interface (sidebar + messages + ShimmerText)

---

## 6. The pattern for a correct component page

Every component page follows this structure:

### Page structure (top to bottom)

1. **Frontmatter** — `title`, `description`.
2. **Imports** — Component from `@plexui/ui/components/[Name]`, demo components from `@/components/docs/[Name]Demos` if needed.
3. **Usage & Reference** — `<UsageBlock>` with the import path at the top. Optionally `<PropsTable>` for the component and sub-components (Prop, Type, Default, Description). Structural notes as needed. See [button.mdx](content/docs/components/button.mdx) as the reference.
4. **Examples** — A `## Examples` section; each example has a `###` heading (e.g. ### Overview, ### Sizing). Each block contains:
   - Short description (optional).
   - `<ComponentPreview code={...}>...</ComponentPreview>` for live rendered component + "Preview" / "Code" tabs.
   - The first example is typically **Overview** and shows a representative usage.

### Key components

- **ComponentPreview** — Live example with Preview/Code segmented control tabs. Props: `code` (string), `previewMinHeight`, `resizable` (adds drag handle for width), `className`.
- **ComponentSource** — Code-only snippet (collapsible). Use sparingly; prefer ComponentPreview.
- **PropsTable** — Structured prop documentation table.
- **UsageBlock** — Shows the import statement.
- **Accordions / Accordion** — From Fumadocs UI. Use for optional collapsible sections (e.g. Details within an example).

### Important notes

- There is **no Hero component** — the first example (Overview under Examples) serves this role.
- For long descriptions within examples, use nested `<Accordions><Accordion title="Details">...</Accordion></Accordions>`.

### MDX file template (`content/docs/components/[name].mdx`)

```mdx
---
title: ComponentName
description: Short description
---

import { ComponentName } from "@plexui/ui/components/ComponentName"

<UsageBlock>{`import { ComponentName } from "@plexui/ui/components/ComponentName";`}</UsageBlock>

## Examples

### Overview

<ComponentPreview code={`<ComponentName variant="primary">Hello</ComponentName>`} previewMinHeight={168}>
  <ComponentName variant="primary">Hello</ComponentName>
</ComponentPreview>

### Another Example

Description of this example.

<ComponentPreview code={`<ComponentName variant="secondary">World</ComponentName>`} previewMinHeight={168}>
  <ComponentName variant="secondary">World</ComponentName>
</ComponentPreview>
```

### Demo file (`components/docs/[Name]Demos.tsx`)

- Use when the component needs interactive state (useState, effects).
- Start with `'use client'`.
- Export named functions (e.g. `MenuBaseDemo`, `MenuSubmenuDemo`).
- MDX uses them as `<ComponentPreview code={...}><MenuBaseDemo /></ComponentPreview>`.

### Reference examples

- **Inline demos (no separate file):** `button.mdx`, `alert.mdx`, `skeleton.mdx` — examples are inline in MDX.
- **Demo file:** `menu.mdx` + `MenuDemos.tsx` — demos live in `MenuDemos.tsx`, MDX imports and uses them.

---

## 7. How to add a new component page

1. **Read the Storybook source**
   - `../storybook/src/components/[Name]/[Name].stories.tsx` — list of stories and their implementations.
   - `../storybook/src/components/[Name]/[Name].mdx` — sections, descriptions, and which stories are referenced.

2. **Identify all examples** that should appear on the docs page (e.g. Base, Variants, Sizes, With Icons).

3. **Create or update demo components**
   - If the component needs state (e.g. Sidebar, Select), create `components/docs/[Name]Demos.tsx` with one exported function per example.
   - Otherwise keep examples inline in the MDX.

4. **Write the MDX** following the pattern in section 6:
   - Frontmatter with `title`, `description`.
   - UsageBlock with import.
   - `## Examples` section starting with "Overview".
   - `## Reference` with PropsTable at the end.

5. **Verify**
   - Run `npm run dev` and open `http://localhost:3000/docs/components/[name]`.
   - Confirm live previews render, code tabs work, and props table is present.

---

## 8. Development commands

- **`npm run dev`** — Start the docs site at http://localhost:3000.
- Source components come from **../storybook** via `"@plexui/ui": "file:../storybook"` in package.json.
- No separate build step for the storybook package is required for docs; Next.js picks up source changes via HMR when both repos are on disk.

---

## 9. Preview consistency notes

**ComponentPreview** relies on a strict structure so controls and stage layout/padding stay consistent across all docs. Interactive demos (with toggles, size pickers, etc.) **must** follow this pattern. Reference: `components/docs/ButtonDemos.tsx`.

### Required pattern: `data-demo-controls` and `data-demo-stage`

1. **Controls panel** — A single wrapper with `data-demo-controls` and the shared table style:
   - Use `<div data-demo-controls style={controlsTableStyle}>` as the outer wrapper.
   - Each row must be built with the **DemoControlRow** (label + control) or **DemoControlBoolean** (label + Switch) helpers so layout and borders match. Do not use custom flex/grid headers or ad‑hoc label styles.

2. **Demo stage** — The area where the component is shown:
   - Use `<div ... data-demo-stage>` for the content area (typically with `className="flex-1 flex items-center justify-center py-12 w-full"` or equivalent). ComponentPreview’s CSS uses `[data-demo-stage]` for padding (48px 24px) and centering.

3. **Required style constants** (define these in each demo file that has controls, or reuse from a reference file):
   - `controlsTableStyle` — `background: 'var(--docs-surface-elevated)', width: '100%'`
   - `controlRowStyle` — flex row, space-between, padding `6px 16px 6px 8px`, `borderTop: '1px solid var(--color-fd-border)'`
   - `controlLabelStyle` — `fontFamily: 'var(--font-mono, ...)', fontSize: '0.8125rem', padding: '2px 8px', borderRadius: 6, background: 'var(--docs-surface-elevated)'`

4. **Helper components** — Use the same pattern as ButtonDemos:
   - **DemoControlRow** — accepts `name` (string) and `children` (control element); renders one row with label + control.
   - **DemoControlBoolean** — accepts `name`, `value`, `onChange`; renders one row with label + Switch.

**Rule:** All interactive demos (with controls that change props/size/options) **must** use this pattern. No custom control bars, no different label fonts or paddings. The only exception is **full-layout** blocks and templates (e.g. MarketingBlockDemos, AppBlockDemos, TemplateDemos, ChatBlock) that render complete UI compositions without a separate “controls” strip — those do not need `data-demo-controls` and may omit `data-demo-stage` or use only `data-demo-stage` as appropriate.

### Other preview conventions

- For interactive sizing controls in component previews, prefer the same slider style used in **Avatar → Sizing** (`SliderValueControl` with the compact docs row layout), including on **Indicators → Sizing & stroke** examples.

---

## 10. Competitive landscape

### Direct competitors

| Product | Type | Pricing | Key difference from Plex UI |
|---------|------|---------|----------------------------|
| **shadcn/ui** | Free, code-only | Free (open source) | Only 3–4 sizes per control, no Figma kit, community-assembled |
| **Untitled UI** | Figma-first + React | $129–$2,499 | Design-first, code second; more blocks/templates but less battle-tested |
| **Shadcraft** | Figma + shadcn code | $119–$499 | Closest model; lacks ChatGPT foundation and 9-size scale |

### Positioning

Plex UI is positioned as **"The design system behind ChatGPT — now in your Figma"**:
- Code is open/free (npm package, community growth)
- Figma kit + blocks + templates are paid (revenue)
- Lead with: battle-tested at ChatGPT scale, 9 sizes not 4, Figma-to-code parity

### Pricing model (planned)

- **Free:** Open-source React components (npm) + free Figma community file with core components
- **Pro Figma ($99–149):** Full Figma kit, all 35 components, all size variants, Figma variables, dark mode
- **Pro Bundle ($299–399):** Figma kit + React source + application blocks + marketing blocks + templates
- **Enterprise:** Team licensing, custom theming support
