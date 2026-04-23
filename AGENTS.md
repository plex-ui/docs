# 🔴 Rule 0 — never hardcode styles that a component already ships

**If Plex UI has a component for the thing, USE IT.** Do not recreate `Card.Title`, `Card.Description`, `Label`, `Separator`, `Field`, or any other shipped component with inline `style={{ fontSize, fontWeight, color, margin }}` props.

Forbidden pattern:

```tsx
// ❌ inline recreation
<div style={{ fontSize: 16, fontWeight: 600 }}>Billing Address</div>
<div style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}>…</div>
```

Correct pattern:

```tsx
// ✅ use the compound parts
<Card.Header>
  <Card.Title>Billing Address</Card.Title>
  <Card.Description>…</Card.Description>
</Card.Header>
```

Only **outer layout containers** (flex/grid with `gap`) may carry inline styles. Typography, color, spacing inside belongs to components. Inline hardcode next to a proper component is a code smell — fix it as part of any change that touches the area.

Full decision with examples and rationale: [`.memory/decisions/0000-no-inline-hardcoded-styles-when-component-exists.md`](.memory/decisions/0000-no-inline-hardcoded-styles-when-component-exists.md)

---

# Persistent Memory — `.memory/` (FIRST ACTION EVERY SESSION)

`.memory/` is a **git submodule** pointing at the private repo [`plex-ui/docs-memory`](https://github.com/plex-ui/docs-memory). It holds planning docs, decisions, bug notes, and session state that is not meant for the public parent repo.

**Full protocol & file templates:** [`.memory/MEMORY_PROTOCOL.md`](.memory/MEMORY_PROTOCOL.md)
**Submodule workflow reference:** [`.memory/domains/submodule-workflow.md`](.memory/domains/submodule-workflow.md)

## Session start — MANDATORY

```bash
# If .memory/ is empty or missing, the submodule isn't cloned yet:
git submodule update --init --recursive
```

Then read [`.memory/working-context.md`](.memory/working-context.md). If the task touches a specific domain — also read the matching file under `.memory/domains/`.

## Fresh clone on a new machine

```bash
# Option 1 — clone with submodules in one go:
git clone --recurse-submodules https://github.com/plex-ui/docs.git

# Option 2 — already cloned without submodules:
cd docs
git submodule update --init --recursive
```

Requires GitHub auth with access to the private `plex-ui/docs-memory` repo (same `gh auth` as parent).

## Commit cycle (TWO commits — inside, then outside)

When you change anything in `.memory/*`:

```bash
# 1. Commit inside the submodule FIRST
cd .memory
git add -A
git commit -m "Update working-context after Card foundation step"
git push

# 2. Then bump the pointer in the parent repo
cd ..
git add .memory
git commit -m "Bump .memory pointer"
git push
```

If you forget step 2, teammates/CI won't see the update — parent repo still points at the old submodule commit.

## Pull updates from teammates

```bash
git pull --recurse-submodules
# or, if you already pulled:
git submodule update --remote --merge
```

## Never

- `rm -rf .memory/` — that deletes the submodule working tree. Use `git submodule deinit .memory` instead if you really need to unmount.
- Commit `.memory/screenshots/` — gitignored inside the submodule.
- Store secrets, API keys, or credentials anywhere in `.memory/` (even though the repo is private).
- Forget the two-commit cycle — submodule change + parent pointer bump.

---

# Component registration / modification checklist

**When adding or modifying a component in `packages/ui/src/components/*`, you MUST walk this list.** There is no safety net — the lists are hand-curated.

## Every change (add OR modify)

1. `content/docs/overview/changelog.mdx` — entry under `## Unreleased → ### Added` (or `### Changed` / `### Fixed`)
2. `packages/ui/package.json` — bump `version` (minor for new component / feature, patch for fix)

## New component (in addition to the above)

3. `content/docs/components/meta.json` — add slug alphabetically
4. `content/docs/components/index.mdx` — add `<ComponentCard title="…" href="…" />` (do **not** pass `isNew` — retired, see [decision 0002](.memory/decisions/0002-no-new-badges.md))
5. `app/(home)/_components/Footer.tsx` — add `{ label, href }` in Components links, alphabetically in correct column
6. `public/r/index.json` + `public/r/<slug>.json` — shadcn registry entries

**Audit with one grep:**

```bash
rg "<slug>" content/docs/components/meta.json content/docs/components/index.mdx \
  app/\(home\)/_components/Footer.tsx public/r/
```

Full record: [`.memory/domains/component-registration-checklist.md`](.memory/domains/component-registration-checklist.md)

---

# Deploy hygiene — Vercel verification is mandatory

**After EVERY `git push` to `master`, verify the production Vercel deploy succeeded.**

```bash
gh api /repos/plex-ui/docs/commits/HEAD/status \
  --jq '.statuses[] | select(.context=="Vercel") | {state, target_url}'
```

- `state: success` → done.
- `state: pending` → wait, re-check.
- `state: failure` → open `target_url` in authorized Chrome, expand Build Logs, find the first red line, fix, repush.

Local `npx tsc --noEmit` can pass while Vercel fails — Next.js production build is stricter. Do not move on to the next task with a red deploy.

Full record: [`.memory/decisions/0005-always-verify-vercel-deploy.md`](.memory/decisions/0005-always-verify-vercel-deploy.md)

---

# MDX authoring rules

## Canonical component-page structure — same shape on every page

Every file under `content/docs/components/*.mdx` uses the Plex skeleton. No `## Usage`, no `## API Reference`, no floating first `<ComponentPreview>` outside `## Examples`, no shadcn section names ported in verbatim.

```mdx
---
title: …
description: …
---

<imports>

<UsageBlock>{`import { … } from "@plexui/ui/components/…";`}</UsageBlock>

[optional single paragraph pointing at a related component]

## Examples

### Overview
<ComponentPreview …><Demo /></ComponentPreview>

### <Other demo>
<ComponentPreview …><Demo /></ComponentPreview>

## API

### <ComponentName>
| Prop | Type | Default | Description |

## Styling

- `--token-name` — purpose
```

Diff any new page against `card.mdx` / `separator.mdx` before shipping. Full record: [`.memory/decisions/0007-mdx-component-page-structure.md`](.memory/decisions/0007-mdx-component-page-structure.md)

---

## No inline code (backticks) in headings

Never wrap a heading's text in backticks in `content/docs/**/*.mdx`. Fumadocs renders headings into the right-rail TOC verbatim, so backtick-wrapped headings show up as `<code>…</code>` pills while neighboring entries are plain text — the sidebar looks broken. Inline code inside prose/tables is fine; only the heading stays plain.

Correct: `### Separator` — Wrong: `` ### `Separator` ``

Full record: [`.memory/decisions/0006-no-code-in-mdx-headings.md`](.memory/decisions/0006-no-code-in-mdx-headings.md)

---

# Component composition rules

## Pill consistency inside Card / form surfaces

**Inside a `Card` (or any form surface), every interactive control must share one pill style. Standard for Plex UI forms is `pill={false}` (rectangular, token-driven radius).**

Components that need the explicit prop (defaults are pill):

- `Button` — default `pill = true` → set `pill={false}`
- `Select` — default `pill = true` → set `pill={false}`

`Input` and `Textarea` default to rectangular and don't need the prop.

Spot-check before committing a new demo:

```js
[...document.querySelectorAll('[class*=Card] button, [class*=Card] [role=combobox]')]
  .map(el => getComputedStyle(el).borderRadius)
// any 9999px is a violation
```

Full record: [`.memory/decisions/0001-pill-consistency-in-cards.md`](.memory/decisions/0001-pill-consistency-in-cards.md)

---

# Figma MCP Bridge Plugin

## Location

`figma/plugin/figma-code-design-bridge/` — files: `code.js`, `manifest.json`, `ui.html`, `server.mjs`

## Architecture

```
HTTP Client (curl)          UI (ui.html)              Plugin (code.js)
   ──── POST :8867 ────►  WebSocket :8866  ────►   Figma Plugin API
   ◄─── JSON response ──  ◄──────────────  ◄───   (read/write document)
```

- **HTTP API**: `http://localhost:8867` — send commands, check status
- **WebSocket**: `ws://localhost:8866` — internal bridge between UI and server (don't use directly)
- Plugin must be **running in Figma** for commands to work

## Usage

### Check status
```bash
curl http://localhost:8867/status
```

### Single command
```bash
curl -X POST http://localhost:8867/command -H "Content-Type: application/json" \
  -d '{"command":"<name>","params":{...}}'
```

### Batch (multiple commands)
```bash
curl -X POST http://localhost:8867/batch -H "Content-Type: application/json" \
  -d '{"commands":[{"command":"...","params":{...}},...]}'
```

**IMPORTANT**: Use `params` key, NOT `args`.

## Available Commands

### Document Navigation
| Command | Params | Description |
|---------|--------|-------------|
| `set-page` | `name` | Switch to page by name |
| `get-selection` | — | Get current selection |

### Create Nodes
| Command | Params | Description |
|---------|--------|-------------|
| `create-frame` | `name, parentId, x, y, width, height, layoutMode, itemSpacing, paddingLeft/Right/Top/Bottom, primaryAxisSizingMode, counterAxisSizingMode, primaryAxisAlignItems, counterAxisAlignItems, fills, clipsContent, opacity` | Create auto-layout frame |
| `create-rectangle` | `name, parentId, x, y, width, height, fill, cornerRadius` | Create rectangle |
| `create-text` | `name, parentId, x, y, width, height, characters, style{fontFamily, fontStyle, fontSize, fontWeight, textAlignHorizontal, textAlignVertical, letterSpacing, lineHeight}` | Create text node (auto-loads font) |
| `create-component` | `name, parentId, x, y, width, height` | Create component |
| `create-instance` | `componentId OR componentKey, name, parentId, x, y, scaleX, scaleY` | Create instance of component |
| `create-component-set` | `componentIds[], name, parentId, x, y` | Combine components into variant set |

### Modify Nodes
| Command | Params | Description |
|---------|--------|-------------|
| `update-node` | `nodeId, properties{key: value}` | Update any node property (supports `resize: [w,h]`, `componentProperties`) |
| `update-text-in-instance` | `instanceId + textName OR nodeId, characters` | Update text inside instance (auto-loads fonts) |
| `set-fill` | `nodeId, fill{type, color{r,g,b,a}}` | Set fill color |
| `set-stroke` | `nodeId, stroke{type, color{r,g,b}}, strokeWeight` | Set stroke |
| `set-effects` | `nodeId, effects[{type, color, offset, radius, visible, blendMode}]` | Set effects (shadows etc.) |
| `set-instance-props` | `nodeId, componentProperties, visible, opacity, name, resize, layoutAlign, layoutGrow` | Set instance properties |
| `set-variant-property` | `nodeId, propertyName, type, defaultValue, options[]` | Add/update variant property on COMPONENT_SET; or set `variantName` on COMPONENT |

### Query Nodes
| Command | Params | Description |
|---------|--------|-------------|
| `get-node-props` | `nodeId` | Get node properties (type, size, layout, component props) |
| `find-children` | `nodeId, type?, name?` | Find children with optional type/name filter |
| `get-bound-variables` | `nodeId` | Get all variable bindings on node |
| `list-components` | — | List all components in document |
| `list-variables` | `nameFilter?, typeFilter?, limit?` | List variable collections and variables |

### Variables
| Command | Params | Description |
|---------|--------|-------------|
| `bind-variable` | `nodeId, field, variableId` | Bind variable to property. Fields: `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom`, `itemSpacing`, `cornerRadius` (sizing), `fills`, `strokes` (color, with optional `index`), `fontSize`, `lineHeight`, `letterSpacing`, `fontFamily`, `fontStyle` (text — node must be TEXT) |

### Other
| Command | Params | Description |
|---------|--------|-------------|
| `clone-node` | `nodeId, name?, x?, y?, parentId?` | Clone node |
| `swap-instance` | `nodeId, componentId` | Swap instance to different component |
| `insert-before` | `parentId, nodeId, beforeId` | Reorder child before another |
| `delete-node` | `nodeId` | Delete node |
| `export-node` | `nodeId, format? (PNG), scale?` | Export node as base64 |

## Rules

1. **Always check status first** — `GET /status` before sending commands
2. **Use `params`, never `args`** — commands fail silently with wrong key
3. **Parent-first creation** — create parent frames before children
4. **Font loading is automatic** — `create-text` and `update-text-in-instance` handle it
5. **Colors are 0–1 floats** — `{r: 1, g: 0, b: 0}` = red, NOT `{r: 255, ...}`
6. **Variable binding requires existing fill** — for `fills`/`strokes` binding, node must have at least one fill/stroke, or the command creates a black solid first
7. **Text variable binding** — `fontSize`, `lineHeight`, `fontFamily`, `fontStyle`, `letterSpacing` only work on TEXT nodes
8. **Component sets** — first create individual COMPONENTs with variant-encoded names (e.g. `state=default, size=md`), then `create-component-set` to combine them
9. **Batch for performance** — use `/batch` endpoint when sending 3+ related commands

---

# Figma Component Architecture Guide

## Overview

This project uses a **three-layer component architecture** in Figma, mirroring the React component hierarchy. Every Figma component page follows this exact structure.

## Page Layout (4 Sections)

Each component page is a CANVAS containing 4 SECTION nodes:

```
CANVAS "Component Name"
  SECTION "" (main content)       — Preview frames with light/dark panels
  SECTION "" (Components)         — .title + COMPONENT_SET items
  SECTION "examples"              — Reusable compositions of component instances
  SECTION ".internal"             — Atomic sub-components (building blocks)
```

## Build Order (Bottom-Up)

**ALWAYS build in this order:**

1. `.internal` — Atomic sub-components (icon wrappers, indicators, adornments)
2. `Components` — Main component sets that compose .internal pieces
3. `examples` — Compositions of component instances
4. Preview frames — Instances from examples placed into light/dark panels

**NEVER skip layers. NEVER use raw frames where components should exist.**

## .internal Section

Contains atomic COMPONENT_SET sub-components. Named with `.` prefix.

### Pattern (from Menu reference):

```
.internal/
  .start          — COMPONENT_SET: start adornment slot
                    Variants: type (icon 2xl/xl/lg/md/sm/xs, radio, checkbox)
                    Each variant: wrapper frame with INSTANCE of actual element
                    Bound vars: paddingRight, size

  .end            — COMPONENT_SET: end adornment slot
                    Variants: type (sub trigger, action, radio, checkbox)
                    Bound vars: paddingLeft, paddingRight, size

  .start-danger   — COMPONENT_SET: danger-colored start adornment
  .end-danger     — COMPONENT_SET: danger-colored end adornment
```

### Key Rules for .internal:
- Every size gets its own sub-component if sizing affects internal structure
- All spacing/sizing properties MUST be bound to design token variables
- Icon instances reference the shared `icon` component with size variable
- Padding values use variable bindings, NOT hardcoded numbers

## Components Section

Contains the main COMPONENT_SET items that users interact with.

### Pattern (from Menu reference):

```
Components/
  menu-item       — COMPONENT_SET
                    Variant axes: state (default/hover/disabled/action hover), danger (False/True)
                    Boolean props: start adornment, end adornment
                    Internal structure:
                      FRAME "background" — hover highlight layer (absolute-positioned, fills parent)
                      INSTANCE ".start"  — from .internal
                      TEXT "label"       — main text
                      INSTANCE ".end"    — from .internal

  menu-item-separator  — COMPONENT_SET
                         Variant: gradient-fade (False/True)

  menu-item-content    — COMPONENT (single, no variants)
                         TEXT "title" + TEXT "description"

  menu-item-info       — COMPONENT
                         Boolean props: start/end adornment
```

### Key Rules for Components:
- Use INSTANCE references to .internal sub-components (NOT raw frames)
- Boolean properties control visibility of optional slots
- State variants (default/hover/active/disabled) as VARIANT axis
- All fills bound to color variables (semantic tokens)
- All text bound to typography variables (fontSize, lineHeight, fontFamily, fontStyle, letterSpacing)
- All padding/spacing bound to sizing variables
- **background** frame is absolute-positioned (constraints: stretch all), fills entire component area
  - In default state: fill is transparent (opacity 0)
  - In hover state: fill bound to `ui/menu/item/background`
  - Radius bound to component-specific radius variable

## Variable Binding Pattern

### Three-Layer Token System:

```
Primitive tokens → Semantic tokens → Component CSS custom properties
```

### Variable Collections:
1. **color** — Semantic colors with Light/Dark modes
   - `text`, `text/primary`, `text/secondary`, `text/tertiary`, `text/disabled`
   - `surface`, `surface/secondary`, `surface/tertiary`, `surface/elevated`
   - `background/primary/ghost/hover`, `background/primary/ghost/active`, `background/primary/ghost/selected`
   - `ui/menu/item/background`, `ui/menu/separator/background`

2. **color primitive** — Raw color values
   - `base.white`, `base.black`
   - `gray.50` through `gray.950`
   - `alpha.*` opacity values

3. **sizing** — All dimensional values
   - `radius/none` through `radius/full`
   - `spacing/2xs` through `spacing/11xl`
   - `control/size/3xs` through `control/size/3xl`
   - `control/gutter/*`, `control/icon-size/*`
   - `menu/*` component-specific tokens

4. **typography** — Font properties
   - `size/text/sm` (14px), `size/text/md` (16px), etc.
   - `line/text/sm` (20px), `line/text/md` (24px), etc.
   - `weight/normal`, `weight/medium`, `weight/semibold`, `weight/bold`
   - `family/text`, `tracking/text/sm-normal`

### Binding via Bridge:
```bash
# Bind sizing variable
curl -X POST http://localhost:8867/command -H "Content-Type: application/json" \
  -d '{"command":"bind-variable","params":{"nodeId":"ID","field":"paddingLeft","variableId":"VariableID:..."}}'

# Bind color variable (fills)
curl -X POST http://localhost:8867/command -H "Content-Type: application/json" \
  -d '{"command":"bind-variable","params":{"nodeId":"ID","field":"fills","variableId":"VariableID:..."}}'
```

## Complete Variable ID Reference

### Color Variables (Semantic)
| Token | Variable ID | Usage |
|-------|-------------|-------|
| `text` | `VariableID:6037:164054` | Primary text (legacy) |
| `text/primary` | `VariableID:6037:164055` | Primary text color |
| `text/secondary` | `VariableID:6037:164056` | Secondary text |
| `text/tertiary` | `VariableID:6037:164057` | Tertiary/muted text |
| `text/disabled` | `VariableID:6037:164065` | Disabled text |
| `text/danger` | `VariableID:6037:164061` | Danger text |
| `surface` | `VariableID:6037:163865` | Primary surface |
| `surface/secondary` | `VariableID:6037:163866` | Secondary surface |
| `background/primary/ghost/hover` | `VariableID:6037:163968` | Ghost hover bg |
| `background/primary/ghost/active` | `VariableID:6037:163976` | Ghost active bg |
| `background/primary/ghost/selected` | `VariableID:6156:13296` | Ghost selected bg |
| `background/primary/soft-alpha` | `VariableID:6037:163887` | Soft alpha bg |
| `ui/menu/item/background` | `VariableID:6037:164137` | Menu item hover bg |
| `ui/menu/separator/background` | `VariableID:6182:278380` | Menu separator line |

### Sizing Variables
| Token | Variable ID | Value |
|-------|-------------|-------|
| `spacing/xs` | `VariableID:6037:229946` | 4px |
| `spacing/sm` | `VariableID:6037:229947` | 6px |
| `spacing/md` | `VariableID:6037:229948` | 8px |
| `spacing/lg` | `VariableID:6037:229949` | 12px |
| `spacing/xl` | `VariableID:6037:229950` | 16px |
| `control/size/sm` | `VariableID:6037:229964` | 28px |
| `control/size/md` | `VariableID:6037:229965` | 32px |
| `control/size/lg` | `VariableID:6037:229966` | 36px |
| `control/gutter/xs` | `VariableID:6225:14671` | 8px |
| `control/gutter/sm` | `VariableID:6225:14672` | 10px |
| `control/gutter/md` | `VariableID:6225:14673` | 12px |
| `control/icon-size/sm` | `VariableID:6225:14677` | 16px |
| `control/icon-size/md` | `VariableID:6225:14678` | 18px |
| `control/icon-size/lg` | `VariableID:6225:14679` | 20px |
| `radius/sm` | `VariableID:6037:229936` | 6px |
| `radius/md` | `VariableID:6037:229937` | 8px |
| `radius/lg` | `VariableID:6037:229938` | 10px |
| `radius/xl` | `VariableID:6037:229939` | 12px |

### Menu-Specific Sizing
| Token | Variable ID | Value |
|-------|-------------|-------|
| `menu/gutter` | `VariableID:6177:14781` | 6px |
| `menu/item/gap` | `VariableID:6177:14785` | 6px |
| `menu/item/radius` | `VariableID:6177:14786` | 6px |
| `menu/item/padding/top-bottom` | `VariableID:6177:14783` | 6px |
| `menu/item/padding/left-right` | `VariableID:6177:14784` | 8px |
| `menu/separator/padding/top-bottom` | `VariableID:6177:14790` | 6px |
| `menu/slot-height` | `VariableID:6181:278245` | 20px |
| `menu/icon-size/sm` | `VariableID:6184:279525` | → control/icon-size/sm |
| `menu/icon-size/md` | `VariableID:6184:279526` | → control/icon-size/md |
| `menu/icon-size/lg` | `VariableID:6184:279527` | → control/icon-size/lg |

### Typography Variables
| Token | Variable ID | Value |
|-------|-------------|-------|
| `size/text/xs` | `VariableID:6003:702` | 12px |
| `size/text/sm` | `VariableID:6003:703` | 14px |
| `size/text/md` | `VariableID:6003:704` | 16px |
| `line/text/sm` | `VariableID:6003:758` | 20px |
| `weight/normal` | `VariableID:6003:686` | Regular |
| `weight/medium` | `VariableID:6003:696` | Medium |
| `weight/semibold` | `VariableID:6003:690` | Semi Bold |
| `family/text` | `VariableID:6003:700` | Inter |
| `tracking/text/sm-normal` | `VariableID:6003:833` | -0.14px |

## Text Node Binding Pattern

Every TEXT node must have ALL these bindings:

```
fontSize      → size/text/sm (VariableID:6003:703)
lineHeight    → line/text/sm (VariableID:6003:758)
fontFamily    → family/text (VariableID:6003:700)
fontStyle     → weight/normal (VariableID:6003:686)
letterSpacing → tracking/text/sm-normal (VariableID:6003:833)
fills[0].color → text/primary (VariableID:6037:164055)
```

## Examples Section

Contains COMPONENT compositions (NOT just frames) that group multiple instances.

### Key Rules for Examples:
- Each example IS a COMPONENT (can be instantiated in previews)
- Contains only INSTANCES of Components section items
- VERTICAL auto-layout with appropriate spacing
- Named descriptively: `{component} {variant} {size}`
- Width matches expected container width

## Mobile vs Desktop Variants

Components that differ between mobile and desktop should have:
- `size` variant axis: `sm` (mobile), `md` (desktop)
- Mobile items: 28px height (control/size/sm), larger touch targets
- Desktop items: 32px height (control/size/md)
- Mobile may hide certain elements (badges, actions)

## Preview Frame Structure

```
FRAME "preview" (VERTICAL, auto-height)
  FRAME "content" (HORIZONTAL, bg: #f3f3f3)
    FRAME "light" (VERTICAL, bg: white, 1024px)
      [INSTANCE from examples or Components] — centered
      FRAME "icon" (40x40, sun icon)
    FRAME "dark" (VERTICAL, bg: #212121, 1024px)
      [INSTANCE from examples or Components] — centered
      FRAME "icon" (40x40, moon icon)
```

## Plugin Bridge Commands

Available via HTTP API at `http://localhost:8867/command`.
**IMPORTANT**: Use `params` key (NOT `args`) for command parameters.

### Request Format:
```bash
curl -X POST http://localhost:8867/command -H "Content-Type: application/json" \
  -d '{"command":"<name>","params":{...}}'
```

### Batch:
```bash
curl -X POST http://localhost:8867/batch -H "Content-Type: application/json" \
  -d '{"commands":[{"command":"...","params":{...}},...]}'
```

### Status: `GET http://localhost:8867/status`

### Core Commands:
- `create-frame`, `create-text`, `create-rectangle`
- `create-component`, `create-component-set`
- `create-instance`
- `update-node`, `delete-node`
- `set-fill`, `set-stroke`, `set-effects`
- `find-children`, `get-node-props`
- `set-instance-props`, `insert-before`
- `export-node`, `list-components`, `set-page`

### Variable Commands:
- `list-variables` — List collections (params: filter, collection)
- `bind-variable` — Bind property to variable (params: nodeId, field, variableId)
- `get-bound-variables` — Get all bindings (params: nodeId)

## Figma API Reference

- File ID: `NjWXNCiJeb6mfICN1IN7OR`
- Plugin API (via bridge) is READ-WRITE
- Bridge: WebSocket 8866 (plugin), HTTP 8867 (commands)

### Page Node IDs:
| Page | Node ID |
|------|---------|
| Menu (reference) | `6177:14717` |
| Dropdown (reference) | `6430:44087` |
| Select (reference) | `6133:63065` |
| Sidebar (target) | `6568:185519` |
| Icons (source) | `2100:26850` |

## Reference Files

- `/figma/reference/figma-colors.json` — Color variables
- `/figma/reference/figma-sizing.json` — Sizing variables
- `/figma/reference/figma-typography.json` — Typography variables

---

## Sidebar Component Architecture

Source of truth: `http://localhost:3000/docs/components/sidebar`

### React Components (from docs)

| Component | Purpose |
|-----------|---------|
| `SidebarProvider` | Handles collapsible state, context. Props: `collapsible` ("offcanvas"/"icon"/"none"), `defaultOpen`, `open`, `onOpenChange` |
| `SidebarLayout` | Wrapper for sidebar + main content |
| `Sidebar` | Container. Props: `variant` ("sidebar"/"docs"), `side` ("left"/"right") |
| `SidebarHeader` / `SidebarFooter` | Sticky top/bottom |
| `SidebarContent` | Scrollable area |
| `SidebarGroup` | Section with optional label |
| `SidebarGroupLabel` | Section label. Props: `size` ("sm"/"lg") — sm=compact/tertiary, lg=larger/primary |
| `SidebarMenu` / `SidebarMenuItem` / `SidebarMenuButton` | Nav items. `isActive`, `tooltip` |
| `SidebarMenuSub` / `SidebarMenuSubButton` | Nested submenu. `open`, `hasIcons` |
| `SidebarCard` | CTA card in footer. `dismissible`, `onDismiss` |
| `SidebarInset` | Main content area next to sidebar |
| `SidebarTrigger` | Collapse toggle button |

### All Examples (from docs — each needs a Figma example)

| # | Example | Key Features |
|---|---------|-------------|
| 1 | **Overview** | Group labels + menu items with icons + badge ("New") + active state |
| 2 | **Scrollable Content** | Long list that scrolls, multiple groups |
| 3 | **Text-Only Navigation** | No icons, settings-style, collapsible="none" |
| 4 | **Collapse Modes** | collapsible="icon" — icon rail when collapsed, tooltips |
| 5 | **Nested Navigation** | Deep nested submenus (3+ levels), expandable tree |
| 6 | **Mobile Menu** | Mobile drawer variant, toggle controls |
| 7 | **Search** | Search input fixed at top, content scrolls |
| 8 | **Skeleton** | Loading state with skeleton placeholders |
| 9 | **Group Label Sizes** | size="sm" vs size="lg" comparison |
| 10 | **Badges** | Badge variants: "New", "Beta", count "3", "Updated", "Deprecated" |
| 11 | **Footer Cards** | CTA card at bottom, upgrade prompt |

### .internal Section

```
.sidebar-start       — COMPONENT_SET
                       Variants: type=icon lg, type=icon md, type=icon sm
                       Each: wrapper frame + icon INSTANCE sized by control/icon-size/*

.sidebar-end         — COMPONENT_SET
                       Variants: type=badge, type=notification, type=expand-arrow, type=action
                       badge: pill with count (text/tertiary bg, text/secondary color)
                       notification: dot indicator
                       expand-arrow: chevron icon
                       action: icon button

.sidebar-start-active — COMPONENT_SET (accent-colored start variants)
```

### Components Section

```
sidebar-menu-item     — COMPONENT_SET
                        Axes: state (default/hover/active/disabled) × size (sm/md)
                        Boolean: start adornment, end adornment
                        Internal: background + .sidebar-start + label + .sidebar-end
                        Bindings: menu/item/padding/*, menu/item/gap, menu/item/radius

sidebar-group-label   — COMPONENT_SET
                        Axes: size (sm/lg), collapsible (False/True)
                        sm: text/tertiary, size/text/xs, weight/semibold — compact
                        lg: text/primary, size/text/sm, weight/medium — larger with more spacing

sidebar-separator     — COMPONENT_SET
                        Axes: gradient-fade (False/True)
                        Color: ui/menu/separator/background

sidebar-card          — COMPONENT_SET
                        Axes: size (sm/md)
                        Background: surface/secondary, radius/md
                        Children: title (text/primary, weight/medium), description (text/secondary, weight/normal)
                        Optional: CTA button, dismiss button

sidebar-sub-item      — COMPONENT_SET (nested items)
                        Axes: state (default/hover/active) × depth (1/2/3)
                        Extra paddingLeft per depth level
                        Tree line indicator on left

sidebar-menu-skeleton — COMPONENT_SET (loading placeholder)
                        Axes: size (sm/md)
                        Shimmer rectangles mimicking menu items

sidebar-search        — COMPONENT_SET (search input)
                        Axes: state (default/focused)
                        Fixed at top of sidebar, above scrollable content
```

### Examples Section (COMPONENT_SETs with size=sm/md variants)

Each example is a COMPONENT_SET with `size=sm, size=md` variants.

```
sidebar overview         — Group labels + icons + active item + badge "New"
sidebar scrollable       — Long list with scroll, multiple groups
sidebar text-only        — Without icons, settings style
sidebar collapse-icon    — Icon rail mode (collapsed state)
sidebar nested           — Deep nested tree navigation (3+ levels)
sidebar mobile           — Mobile drawer variant
sidebar search           — Search input at top
sidebar skeleton         — Loading state with skeleton items
sidebar group-sizes      — sm vs lg group labels side by side
sidebar badges           — Items with badge variants (New, Beta, count, Updated, Deprecated)
sidebar footer-card      — CTA upgrade card at bottom
```

### Preview Section Structure (Standard Template)

Each page uses the "New Component Template" pattern (page `6568:184519`):

```
SECTION "" (preview)
  GROUP "group"
    FRAME "group" (VERTICAL, auto)
      INSTANCE ".title" (componentId: 6330:78705, variant: "notes + description")
        — Text: component name + description

      For each example:
        INSTANCE ".subtitle" (componentId: 6151:90929, variant: "Full width")
          — Text: example section name (e.g. "Overview", "Badges")
        INSTANCE ".description" (componentId: 6155:71546)
          — Text: brief description of the example
        FRAME "preview" (VERTICAL, auto, paddingBottom→figma/preview/gap)
          FRAME "content" (HORIZONTAL, gap→spacing/xl, padding→spacing/xl, fill→surface/tertiary)
            FRAME "light" (VERTICAL, 1024px, fill→surface, stroke→border, radius→radius/2xl, gap→figma/group/gap)
              INSTANCE "slot" — from examples section
              FRAME "icon" (40×40, sun icon)
            FRAME "dark" (VERTICAL, 1024px, fill→surface, stroke→border, radius→radius/2xl, gap→figma/group/gap)
              INSTANCE "slot" — from examples section
              FRAME "icon" (40×40, moon icon)
```

Key variable bindings for preview:
- content: `spacing/xl` (VariableID:6037:229950) for padding + itemSpacing, `surface/tertiary` (VariableID:6037:163867) fill
- light/dark: `breakpoints/lg` (VariableID:6155:67310) width, `radius/2xl` (VariableID:6037:229940) corners, `surface` (VariableID:6037:163865) fill, `border` (VariableID:6037:163984) stroke, `figma/group/gap` (VariableID:6193:27026) itemSpacing
- preview frame: `figma/preview/gap` (VariableID:6413:82922) paddingBottom

Template component IDs:
- `.title` component: `6330:78705`
- `.subtitle` component: `6151:90929`
- `.description` component: `6155:71546`


---

## npm Publishing
When user says "опубликуй" — run the full publish flow: bump version, commit, push, build, npm publish, create GitHub release.
```bash
# 1. Bump version in packages/ui/package.json (e.g. 0.7.36 → 0.7.37)

# 2. Commit & push all changes (not just package.json — include any code changes)
git add .
git commit -m "<descriptive message>"
git push origin master
# 3. Build & publish locally
cd packages/ui
npm run build
npm publish --access public

# 4. IMPORTANT: Rebuild dist after publish (npm publish triggers build:clean which deletes dist/)
cd packages/ui
npm run build

# 5. Create GitHub Release
GH=/tmp/gh/gh_2.67.0_macOS_arm64/bin/gh
$GH release create v0.7.37 --repo plex-ui/docs --title "Release v0.7.37" --target master --generate-notes
```
**Key details:**
- `gh` CLI location: `/tmp/gh/gh_2.67.0_macOS_arm64/bin/gh` (downloaded, not brew)
- Auth: logged in as `stomashevsky` via keyring
- Release tag format: `v{version}` (e.g. `v0.7.37`)
- GitHub Actions workflow (`publish.yml`) exists as backup but local publish is preferred

---

## Figma-to-CSS Verification (MANDATORY)

When implementing CSS from Figma designs, you MUST run the verification script after writing CSS. Never eyeball values.

### Workflow

1. Fetch Figma data: `mcp_figma-read_get_figma_data(fileKey, nodeId, depth=10)`
2. Extract all style values from `globalVars.styles` into a JSON file with `cssSelector` mapping
3. Write CSS module
4. Run verification:
```bash
node scripts/verify-figma-css.mjs --figma /tmp/figma-spec.json --css packages/ui/src/components/MyComponent/MyComponent.module.css
```
5. Fix ALL mismatches before considering the task done

### JSON format
```json
{
  "node-name": {
    "cssSelector": ".CSSClassName",
    "gap": "10px",
    "padding": "12px 21px",
    "fontSize": 14,
    "fontWeight": 400,
    "colors": ["#0D0D0D"],
    "dimensions": { "width": 20, "height": 20 },
    "margin-left": "-4px"
  }
}
```

### Key rules
- Every padding, gap, dimension, color, font property, border-radius, margin offset from Figma MUST be in the JSON
- Use `cssSelector` to map Figma nodes to CSS selectors exactly
- Negative Figma paddings (e.g. `padding: 0px 0px 0px -4px`) = CSS negative margins
- Script exit code 1 = mismatches exist, fix them
- Never skip this step. The script exists because manual transfer is error-prone.
- **Do NOT hardcode inherited defaults.** Figma shows ALL properties on every node (including inherited). Do NOT transfer these to CSS if they match the inherited/default value:
  - `font-family` — inherited from body/root, never hardcode
  - `font-weight: 400` — CSS default, omit unless differs
  - `color` matching parent — use CSS variable or inherit
  - `text-align: left` — CSS default
  - `display: block` — CSS default for div

---

## Turbopack Cache Fix (MANDATORY after UI package rebuild)

When you run `npm run build` in `packages/ui/`, the `build:clean` step deletes `dist/`. Turbopack caches stale references to those deleted files and will fail with `Can't resolve '...variables-semantic.css'` or similar errors even after the rebuild recreates them.

**ALWAYS do this immediately after any `packages/ui` build:**
```bash
rm -rf .next
```

Then restart the dev server if it was running:
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; rm -rf .next && npm run dev &
```

**CRITICAL: Do NOT use `> /dev/null 2>&1` or any output suppression** — this causes the bash tool to hang waiting for the background process. Always let output stream naturally, and use a short timeout (3-5s) on the bash call since the server will keep running in background.

Do NOT wait for the user to report the error — proactively nuke `.next` every time you rebuild the UI package.