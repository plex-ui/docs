---
description: Generate a professional React + Tailwind UI kit with design tokens, themed components, Storybook stories, and browser-based reverse engineering of OpenAI components
argument-hint: <kit-name> [--reverse-engineer <url>] [--components button,input,...] [--path ./packages/my-kit]
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - AskUserQuestion
  - mcp__Claude_in_Chrome__tabs_context_mcp
  - mcp__Claude_in_Chrome__tabs_create_mcp
  - mcp__Claude_in_Chrome__navigate
  - mcp__Claude_in_Chrome__computer
  - mcp__Claude_in_Chrome__read_page
  - mcp__Claude_in_Chrome__find
  - mcp__Claude_in_Chrome__javascript_tool
  - mcp__Claude_in_Chrome__get_page_text
  - mcp__Claude_in_Chrome__update_plan
---

# UI Kit Generator

You are an expert UI engineer specializing in building production-grade React component libraries with Tailwind CSS. Your task is to generate a professional UI kit following the Plex UI architecture and patterns.

## Step 1: Gather requirements

If the user did not specify details, ask them:

1. **Kit name** — the npm package name (e.g., `@acme/ui`)
2. **Output path** — where to create the kit (default: `./packages/<kit-name>`)
3. **Components** — which components to generate. Available sets:
   - **Base**: Button, Input, Card, Badge, Avatar, Typography
   - **Extended**: Base + Modal, Dropdown, Tabs, Table, Toast, Tooltip
   - **Full**: Extended + Sidebar, Navigation, Form, DatePicker, Pagination, Select, Switch, Checkbox, RadioGroup, Textarea, Slider
   - **Custom**: user specifies exact list
4. **Brand colors** — primary, secondary, accent colors (hex values), or use defaults
5. **Border radius style** — sharp (2px), rounded (6px), pill (9999px), or mixed scale
6. **Typography** — font family for headings and body (or use system defaults)

## Step 2: Generate the kit structure

Create this directory structure:

```
<output-path>/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── src/
│   ├── index.ts                    # Barrel exports
│   ├── styles/
│   │   ├── index.css               # Main CSS entry (imports all below)
│   │   ├── variables-primitive.css  # Base color palettes, spacing, radius
│   │   ├── variables-semantic.css   # Semantic tokens (light/dark themes)
│   │   └── variables-components.css # Component-specific overrides
│   ├── lib/
│   │   ├── types.ts                # Shared types (Variants, Sizes, SemanticColors, ControlSize)
│   │   ├── cn.ts                   # clsx + twMerge utility
│   │   └── renderHelpers.ts        # Text node wrapping helpers
│   └── components/
│       └── <ComponentName>/
│           ├── index.tsx            # Component implementation + exports
│           ├── <ComponentName>.module.css  # Scoped styles
│           └── <ComponentName>.stories.tsx # Storybook stories
```

## Step 3: Design tokens

Generate a three-layer token system following the reference in `.claude/commands/ui-kit/references/tokens.md`.

### Primitive tokens (`variables-primitive.css`)
- Gray scale: 13 steps (0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000) using `light-dark()` for automatic theming
- Brand colors: primary, secondary, danger, success, warning — each with 50–900 range
- Alpha transparency scale: 17 stops (2%, 4%, 6%, 8%, 10%, 14%, 18%, 22%, 28%, 34%, 40%, 48%, 56%, 64%, 70%)
- Spacing scale: 0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24
- Border radius scale: 2xs (2px), xs (4px), sm (6px), md (8px), lg (12px), xl (16px), 2xl (20px), 3xl (24px), full (9999px)

### Semantic tokens (`variables-semantic.css`)
- Surface colors: background, surface, surface-elevated, surface-sunken
- Text colors: primary, secondary, tertiary, disabled, inverse
- Border colors: default, strong, subtle
- Interactive states: hover, active, focus, disabled
- Each semantic color (primary, danger, success, etc.) with: soft, solid, outline, ghost, surface variants + hover/active states

### Component tokens (`variables-components.css`)
- Control size scale (9 steps): 3xs (22px), 2xs (24px), xs (26px), sm (28px), md (32px), lg (36px), xl (40px), 2xl (44px), 3xl (48px)
- Per-size: height, padding-x, icon-size, font-size, border-radius, gap
- Elevation: 4 levels (100, 200, 300, 400) with base/strong/stronger shadow variants

## Step 4: Component implementation patterns

Follow the reference patterns in `.claude/commands/ui-kit/references/component-patterns.md`.

Every component MUST:

1. **Use CSS Modules** — `import s from "./ComponentName.module.css"`
2. **Use data attributes for variants** — `data-variant`, `data-size`, `data-color` instead of className-based variants
3. **Support className passthrough** — merge user's `className` with `clsx(s.ComponentName, className)`
4. **Use `clsx`** for conditional class names
5. **Export props type** — `export type ComponentNameProps = { ... }`
6. **Support ref** — via `ref?: React.Ref<HTMLElement | null>` prop
7. **Use CSS custom properties** from the token system — never hardcode colors, spacing, or sizes
8. **Support the ControlSize scale** (for interactive controls) — `size?: ControlSize` prop with `data-size` attribute
9. **Support semantic colors** where appropriate — `color?: SemanticColor` prop with `data-color` attribute

### CSS Module pattern

```css
.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--control-gap);
  height: var(--control-height);
  padding: 0 var(--control-padding-x);
  font-size: var(--control-font-size);
  border-radius: var(--control-border-radius);
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.Button[data-variant="solid"] {
  background: var(--color-background-primary-solid);
  color: var(--color-text-inverse);
}

.Button[data-variant="solid"]:hover {
  background: var(--color-background-primary-solid-hover);
}

.Button[data-size="sm"] {
  --control-height: var(--size-control-sm);
  --control-padding-x: var(--space-2);
  --control-font-size: var(--text-xs);
}
```

### TypeScript component pattern

```tsx
import { type ButtonHTMLAttributes } from "react"
import clsx from "clsx"
import type { ControlSize, SemanticColor, Variants } from "../../lib/types"
import s from "./Button.module.css"

type ButtonVariant = Variants<"solid" | "outline" | "ghost" | "soft">

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ControlSize
  color?: SemanticColor
  pill?: boolean
  disabled?: boolean
  className?: string
  ref?: React.Ref<HTMLButtonElement | null>
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">

export function Button({
  variant = "solid",
  size = "md",
  color = "primary",
  pill,
  disabled,
  className,
  ref,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={clsx(s.Button, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-pill={pill ? "" : undefined}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
```

## Step 5: Storybook stories

Generate stories for each component with:
- **Default** story showing basic usage
- **Variants** story showing all visual variants
- **Sizes** story showing the control size scale
- **Colors** story showing all semantic colors (where applicable)
- **Interactive** story with Storybook controls (args)

Follow the pattern in `.claude/commands/ui-kit/references/stories-pattern.md`.

## Step 6: Package configuration

### package.json
- Type: `"module"`
- Exports: ESM with proper `exports` field mapping
- Peer dependencies: `react`, `react-dom`, `tailwindcss`
- Dependencies: `clsx`
- Build scripts using TypeScript + PostCSS

### tsconfig.json
- Target: ES2022, Module: ESNext, JSX: react-jsx
- Strict mode enabled
- Path aliases for `@/` pointing to `src/`

### tailwind.config.ts
- Content paths pointing to `src/**/*.{ts,tsx}`
- Extended theme using CSS custom properties from the token system
- No hardcoded values in config

## Step 7: Final verification

After generating all files:

1. Verify the barrel exports in `src/index.ts` include all components
2. Verify all CSS variables are properly referenced (no undefined vars)
3. Verify all component props types are exported
4. Verify stories import components correctly
5. Present a summary to the user with:
   - Total components generated
   - File count and structure
   - Next steps (install deps, run Storybook, customize tokens)

## Step 8: Per-component workflow — Research → Build → Demo

**CRITICAL: For every component you create, follow this exact 3-phase workflow.**

### Phase A: Research on shadcn/ui

**ALWAYS start here.** Before writing any code, navigate to shadcn/ui to understand industry-standard API for this component type.

1. Open `https://ui.shadcn.com/docs/components/<component-name>` in the browser (also check `/docs/components/radix/<component-name>` — Radix versions often have MORE examples)
2. Use `get_page_text` to extract the FULL documentation content
3. **Scroll through the ENTIRE page** — shadcn pages often have 10–15+ examples, don't stop after the first few
4. Record **EVERY example** from the page. Make a numbered list:
   - Example title/heading
   - What it demonstrates (which variant, state, layout, or composition)
   - What controls/form elements are used in the example
5. Also record:
   - **All variants** (e.g., Button has: default, destructive, outline, secondary, ghost, link)
   - **All sizes** available
   - **Sub-components** (e.g., Field → Field, FieldGroup, Fieldset, or AlertDialog → Trigger, Content, Header, Footer)
   - **Props API** — every documented prop
6. Also check related pages — e.g., for "Field" check both `/docs/components/radix/field` and `/docs/components/form`

**CRITICAL: You MUST reproduce ALL examples from the shadcn page, not a subset.**

For example, the Field page on shadcn has 13 examples:
Input, Textarea, Select, Slider, Fieldset, Checkbox, Radio, Switch, Choice Card, Field Group, RTL, Responsive Layout, and a main Payment Method demo. ALL 13 must be created as separate demo functions and MDX examples.

**How to ensure completeness:**
1. After extracting all examples, present the numbered list to the user and confirm: "I found N examples on the shadcn page. I will create all N. Correct?"
2. Create one demo function per example in the `*Demos.tsx` file
3. Create one `### Example Name` section per example in the `.mdx` file
4. At the end, count your examples vs the shadcn page — numbers must match

Follow the detailed guide in `.claude/commands/ui-kit/references/shadcn-reference.md`.

### Phase B: Reverse-engineer from OpenAI products

After understanding the component API from shadcn, go see how OpenAI actually implements it in production.

**Target sites:**
- `https://platform.openai.com/settings/organization/general` — forms, fields, inputs, selects
- `https://platform.openai.com/settings/profile/user` — profile settings, avatars
- `https://platform.openai.com/api-keys` — tables, badges, buttons
- `https://chatgpt.com` — chat interface, sidebar, modals, menus
- `https://developers.openai.com/api/docs` — documentation layout, navigation, code blocks
- Any other URL the user provides

**State extraction — do this for EVERY component:**

Follow the detailed guide in `.claude/commands/ui-kit/references/reverse-engineering.md`.

For each component found on the page:

1. **Screenshot default state**
2. **Hover** → screenshot + extract computed styles delta
3. **Active/pressed** → screenshot + extract delta
4. **Focus (keyboard Tab)** → screenshot + extract focus ring styles
5. **Disabled** (find disabled instance or set `el.disabled = true`) → screenshot + extract
6. **Error/invalid** (for form controls — look for red borders) → screenshot + extract
7. **Open/expanded** (for dropdowns, modals) → screenshot + extract
8. **Loading** (if applicable) → screenshot + extract

**Style extraction per state:**
```javascript
function captureComponentState(selector, stateName) {
  const el = document.querySelector(selector);
  if (!el) return { error: 'not found' };
  const cs = getComputedStyle(el);
  return {
    state: stateName,
    color: cs.color, backgroundColor: cs.backgroundColor,
    borderColor: cs.borderColor, borderWidth: cs.borderWidth, borderRadius: cs.borderRadius,
    boxShadow: cs.boxShadow, outline: cs.outline, outlineOffset: cs.outlineOffset,
    opacity: cs.opacity, cursor: cs.cursor, transition: cs.transition,
    height: cs.height, padding: cs.padding, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
  };
}
JSON.stringify(captureComponentState('SELECTOR', 'STATE_NAME'), null, 2);
```

**Compare states to find deltas:**
```javascript
function diffStates(a, b) {
  const d = {};
  for (const k of Object.keys(a)) {
    if (k === 'state' || k === 'selector') continue;
    if (a[k] !== b[k]) d[k] = { from: a[k], to: b[k] };
  }
  return d;
}
```

**Map extracted raw values → Plex UI tokens:**
- `#6366f1` → `--primary-500`
- `14px` font → `--text-md`
- `32px` height → `--size-control-md`
- `8px` radius → `--radius-md`

### Phase C: Build the component + interactive demo

After research, create:
1. **Component** (`packages/ui/src/components/<Name>/index.tsx`) — with ALL variants, sizes, colors, states discovered
2. **CSS Module** (`packages/ui/src/components/<Name>/<Name>.module.css`) — with state matrix covering every state from Phase B
3. **Storybook stories** (`packages/ui/src/components/<Name>/<Name>.stories.tsx`)
4. **Interactive demo** (`components/docs/<Name>Demos.tsx`) — with control panel to switch ALL props
5. **MDX documentation page** (`content/docs/components/<name>.mdx`) — following the pattern from AGENTS.md section 6
6. **Register in sidebar + index page** — update `meta.json` and `index.mdx` (see Phase C.6 below)

### Phase C.4: Interactive demo with controls (REQUIRED for every component)

Every component MUST get an interactive demo file that lets the user toggle all variants, sizes, colors, and states. Follow the exact Plex UI demo pattern from `components/docs/ButtonDemos.tsx`.

**Demo file pattern:**

```tsx
'use client';

import React, { useState } from 'react';
import { ComponentName } from '@plexui/ui/components/ComponentName';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';

// ─── Shared demo styles (same in every demo file) ───
const controlsTableStyle: React.CSSProperties = {
  background: 'var(--docs-surface-elevated)',
  width: '100%',
};
const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 16px 6px 8px',
  borderTop: '1px solid var(--color-fd-border)',
};
const controlLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: '0.8125rem',
  padding: '2px 8px',
};

function DemoControlBoolean({
  name, value, onChange,
}: { name: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={controlRowStyle}>
      <label htmlFor={`demo-${name}`} style={controlLabelStyle}>{name}</label>
      <Switch id={`demo-${name}`} checked={value} onCheckedChange={onChange} />
    </div>
  );
}

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

// ─── Options ───
const SIZE_OPTIONS = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
const VARIANT_OPTIONS = ['solid', 'soft', 'outline', 'ghost'] as const; // adjust per component
const COLOR_OPTIONS = ['primary', 'secondary', 'danger', 'success', 'warning'] as const;

// ─── Main interactive demo ───
export function ComponentNameOverviewDemo() {
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
  const [variant, setVariant] = useState<(typeof VARIANT_OPTIONS)[number]>('solid');
  const [color, setColor] = useState<(typeof COLOR_OPTIONS)[number]>('primary');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // ... add more state props as needed (pill, error, etc.)

  return (
    <>
      {/* ─── Controls panel ─── */}
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="variant">
          <SegmentedControl value={variant} onChange={setVariant} size="xs" aria-label="variant">
            {VARIANT_OPTIONS.map((v) => (
              <SegmentedControl.Option key={v} value={v}>{v}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>

        <DemoControlRow name="size">
          <SegmentedControl value={size} onChange={setSize} size="xs" aria-label="size">
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>

        <DemoControlRow name="color">
          <SegmentedControl value={color} onChange={setColor} size="xs" aria-label="color">
            {COLOR_OPTIONS.map((c) => (
              <SegmentedControl.Option key={c} value={c}>{c}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>

        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
        <DemoControlBoolean name="loading" value={loading} onChange={setLoading} />
      </div>

      {/* ─── Component stage ─── */}
      <div className="flex-1 flex items-center justify-center py-12 w-full" data-demo-stage>
        <ComponentName
          variant={variant}
          size={size}
          color={color}
          disabled={disabled}
          loading={loading}
        >
          Example content
        </ComponentName>
      </div>
    </>
  );
}

// ─── Color × Variant matrix demo ───
export function ComponentNameColorsDemo() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `auto repeat(${COLOR_OPTIONS.length}, 1fr)` }}>
      <div />
      {COLOR_OPTIONS.map((c) => <div key={c} className="text-center text-sm text-muted-foreground">{c}</div>)}
      {VARIANT_OPTIONS.map((v) => (
        <React.Fragment key={v}>
          <div className="text-right text-sm text-muted-foreground mr-3">{v}</div>
          {COLOR_OPTIONS.map((c) => (
            <div key={`${v}-${c}`} className="text-center">
              <ComponentName color={c} variant={v} size="md">Label</ComponentName>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── States showcase demo ───
export function ComponentNameStatesDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center flex-wrap">
        <ComponentName>Default</ComponentName>
        <ComponentName disabled>Disabled</ComponentName>
        <ComponentName loading>Loading</ComponentName>
        {/* Add error, selected, readonly etc. as applicable */}
      </div>
      <p className="text-sm text-muted-foreground">
        Hover and Tab to buttons above to see hover/focus states.
      </p>
    </div>
  );
}
```

**Controls to include per component type:**

| Component type | Controls |
|----------------|----------|
| **Button** | variant, size, color, pill, disabled, loading, selected, block |
| **Input** | size, error, disabled, readonly, placeholder |
| **Select** | size, error, disabled, placeholder, open |
| **Checkbox** | checked, indeterminate, disabled, error |
| **Switch** | checked, disabled, size |
| **Badge** | variant, size, color, pill |
| **Card** | variant, padding, elevation |
| **Modal/Dialog** | open, size, closable |
| **Tabs** | variant, size, orientation |
| **Table** | striped, hoverable, compact, bordered |
| **Toast** | variant, color, position, dismissible |
| **Tooltip** | placement, delay, arrow |
| **Sidebar** | collapsed, position, width |
| **DatePicker** | error, disabled, range mode |

**Demo requirements:**
- `data-demo-controls` wrapper with `controlsTableStyle` for the controls panel
- `data-demo-stage` wrapper for the component display area
- Use `SegmentedControl` for enum props (variant, size, color)
- Use `Switch` for boolean props (disabled, loading, pill, error)
- Use `DemoControlRow` for custom controls (color picker, slider)
- EVERY prop that affects visual appearance MUST have a toggle
- The demo should let users experience ALL states interactively

### Phase C.5: MDX documentation page (REQUIRED for every component)

Create `content/docs/components/<name>.mdx` following the pattern from AGENTS.md section 6:

**CRITICAL: Example descriptions go inside `details` prop, NOT as free text above `<ComponentPreview>`.**

Every example that has a description MUST use the `details` prop on `<ComponentPreview>`:

```mdx
<ComponentPreview details={<>Description text here. Use <code>propName</code> for inline code.</>} code={`...`}>
```

This renders the description inside a collapsible details/disclosure section within the preview component. Do NOT write descriptions as plain paragraphs before or after `<ComponentPreview>`.

**Template:**

```mdx
---
title: ComponentName
description: Short description of what the component does
---

import { ComponentName } from "@plexui/ui/components/ComponentName"
import { ComponentNameOverviewDemo, ComponentNameColorsDemo, ComponentNameStatesDemo } from "@/components/docs/ComponentNameDemos"

<UsageBlock>{`import { ComponentName } from "@plexui/ui/components/ComponentName";`}</UsageBlock>

## Examples

### Overview

<ComponentPreview details={<>ComponentName wraps a form control with a label, optional description, and error message. It automatically generates <code>htmlFor</code>, <code>aria-describedby</code>, and <code>aria-invalid</code> linking.</>} code={`<ComponentName variant="solid" size="md" color="primary">Example</ComponentName>`}>
  <ComponentNameOverviewDemo />
</ComponentPreview>

### Sizing

<ComponentPreview details={<>ComponentName accepts a <code>size</code> prop that scales the label and description font size to match the child control. Pass the same size to both ComponentName and the child control.</>} code={`<ComponentName size="lg">...</ComponentName>`}>
  <ComponentNameSizingDemo />
</ComponentPreview>

### Colors

<ComponentPreview details={<>Color × variant matrix showing all semantic color and variant combinations.</>} code={`<ComponentName color="primary">Label</ComponentName>`}>
  <ComponentNameColorsDemo />
</ComponentPreview>

### States

<ComponentPreview details={<>All component states: default, disabled, loading, error. Hover and Tab to elements to see hover/focus states.</>} code={`<ComponentName disabled>Disabled</ComponentName>`}>
  <ComponentNameStatesDemo />
</ComponentPreview>

## Reference

<PropsTable>
  {/* Document all props with Prop, Type, Default, Description */}
</PropsTable>
```

### Phase C.6: Register in sidebar, index, badges, and changelog (REQUIRED)

After creating the MDX page, you MUST update these files so the component appears everywhere and is marked as new:

**1. Add to sidebar — `content/docs/components/meta.json`:**

Read the current `meta.json`, then add the new component name (without `.mdx`) to the `pages` array in **alphabetical order**:

```json
{
  "title": "Components",
  "root": true,
  "pages": ["index", "alert", "avatar", ..., "field", ..., "tooltip"]
}
```

**Rules:**
- Insert in alphabetical order among existing entries
- Use kebab-case filename matching the `.mdx` file (e.g., `"floating-label-input"`)
- `"index"` always stays first
- Do NOT remove or reorder existing entries

**2. Add to components index grid — `content/docs/components/index.mdx`:**

Read the current `index.mdx`, then add a `<ComponentCard>` in alphabetical order within the `<Cards>` block:

```mdx
<ComponentCard title="Field" href="/docs/components/field" isNew />
```

**Rules:**
- Insert alphabetically among existing `<ComponentCard>` entries
- **ALWAYS** use `isNew` flag for newly added components
- `title` should be the display name (PascalCase, e.g., "FloatingLabelInput" or "Date Picker")
- `href` must match `/docs/components/<filename>` (kebab-case)

**3. Add "New" badge in sidebar — `lib/docs-new-badges.ts`:**

Read the current file, then add the new component's slug to the `NEW_COMPONENT_SLUGS` array:

```typescript
export const NEW_COMPONENT_SLUGS = [
  'sidebar',
  'skeleton',
  'floating-label-input',
  'progress-steps',
  'shimmer-text',
  'field',  // ← add new component slug here
] as const;
```

This makes a blue "New" badge appear next to the component name **in the sidebar navigation**. The badge is rendered by `components/layout/SidebarItemWithBadge.tsx` which reads this array.

**Rules:**
- Slug must match the `.mdx` filename (kebab-case, no extension)
- Keep existing entries — they will be cleaned up in a future release

**4. Add changelog entry — `content/docs/overview/changelog.mdx`:**

Read the current changelog, then add a new `<li>` inside the `## Unreleased → ### Added` section:

```mdx
<li>
  <strong>Field component</strong> (<a href="/docs/components/field">Field</a>)<br/>
  New component that wraps a form control with a label, optional description, and error message. Automatically generates <code>htmlFor</code>, <code>aria-describedby</code>, and <code>aria-invalid</code> linking. Supports 9-step size scale, fieldsets, field groups, and composition with Input, Textarea, Select, Slider, Checkbox, Radio, and Switch controls.
</li>
```

**Changelog rules:**
- Add under `## Unreleased` → `### Added` section
- Use `<strong>Component Name component</strong>` for the title
- Add link to the component page in parentheses: `(<a href="/docs/components/slug">Name</a>)`
- Use `<br/>` after the link, then a description
- Description should mention: what the component does, key features, sub-components, and notable capabilities
- Use `<code>propName</code>` for inline code references
- Follow the existing entries' style — look at the Sidebar or Skeleton entries as reference

**5. Verify the registration:**
- After updating all four files, run `npm run build` (Step 9)
- Check that the build succeeds
- The new component should appear with "New" badges in:
  - Left sidebar under "Components" section (blue "New" badge)
  - Components grid page at `/docs/components` (card with "New" tag)
  - Changelog page at `/docs/overview/changelog`

## Step 9: Build verification (MANDATORY after every code change)

After creating or modifying ANY file (component, CSS, demo, MDX page), you MUST verify the code compiles without errors before proceeding to the next task.

### Verification sequence

Run these commands in order. If any step fails, fix the errors before continuing.

1. **TypeScript type check** (fast, catches type errors):
   ```bash
   npx tsc --noEmit
   ```

2. **Next.js build** (catches import errors, MDX issues, SSR problems):
   ```bash
   npm run build
   ```

3. **Lint** (catches code style issues):
   ```bash
   npm run lint
   ```

### When to run

- After creating a new component (`index.tsx` + `.module.css`)
- After creating/updating a demo file (`*Demos.tsx`)
- After creating/updating an MDX documentation page
- After modifying the barrel exports (`index.ts`)
- After modifying design tokens (CSS variable files)
- **Before presenting the "done" summary to the user**

### How to handle errors

1. Read the FULL error output — don't skip lines
2. Fix the root cause, not the symptom
3. Re-run the FULL verification sequence after fixing
4. Only proceed when ALL 3 checks pass with zero errors
5. If a build error is in an unrelated file, note it to the user but still ensure your changes don't add NEW errors

### Common errors to watch for

| Error | Cause | Fix |
|-------|-------|-----|
| `Module not found` | Wrong import path | Check barrel exports in `index.ts` |
| `Type 'X' is not assignable` | Props type mismatch | Update type definition or usage |
| `Property does not exist on type` | Missing prop in type | Add prop to the exported Props type |
| `Cannot find module '*.module.css'` | Missing CSS module or declaration | Create the CSS file or add `declare module` |
| `Hydration mismatch` | SSR/client difference | Ensure `'use client'` on interactive demos |
| `Expected expression` in MDX | Invalid JSX in MDX | Check MDX syntax, escape `{` characters |

## Step 10: Publish npm package (after all verification passes)

After Step 9 passes with zero errors, update and publish the `@plexui/ui` npm package.

### 10.1 Bump the version in `packages/ui/package.json`

Read the current version, then bump it following semver:
- **Patch** (`0.2.1` → `0.2.2`) — bug fixes, minor CSS tweaks
- **Minor** (`0.2.1` → `0.3.0`) — new component added (this is the most common case for `/ui-kit`)
- **Major** (`0.2.1` → `1.0.0`) — breaking API changes (rare)

**For new components, ALWAYS bump minor version.**

```bash
# Example: bump minor version
cd packages/ui && npm version minor --no-git-tag-version && cd ../..
```

Or edit `packages/ui/package.json` `"version"` field directly.

### 10.2 Commit, push, and publish via GitHub Actions

**IMPORTANT: The npm account uses passkey auth, so `npm publish` from CLI will fail with EOTP error. Always use the GitHub Actions workflow instead.**

1. **Commit all changes** (version bump + new component files):
   ```bash
   git add <files> && git commit -m "feat: add <ComponentName>, bump @plexui/ui to X.Y.Z"
   ```

2. **Push to master**:
   ```bash
   git push origin master
   ```

3. **Trigger the publish workflow** (`.github/workflows/publish.yml`):
   ```bash
   gh workflow run publish.yml
   ```
   This workflow uses `NPM_TOKEN` secret (automation token) which bypasses OTP/passkey.

4. **Wait and verify**:
   ```bash
   # Check workflow status
   gh run list --workflow=publish.yml --limit=1

   # After completion, verify on npm
   npm view @plexui/ui version
   ```

The workflow:
1. Checks out the repo
2. Installs dependencies (`npm ci`)
3. Builds `packages/ui` (`npm run build`)
4. Publishes with `NODE_AUTH_TOKEN` from secrets

It also triggers automatically on GitHub Release creation.

**Fallback — local publish (only if you have TOTP authenticator configured):**
```bash
npm run publish:ui
# When prompted for OTP, enter the 6-digit code from authenticator
```

### 10.3 Report to user

After publishing, present:
- Old version → new version
- What was added (new component name + link)
- npm package URL: `https://www.npmjs.com/package/@plexui/ui`

## Important rules

- NEVER move to the next component or present "done" without passing all 3 verification steps: `npx tsc --noEmit`, `npm run build`, `npm run lint`
- ALWAYS bump the minor version in `packages/ui/package.json` when adding a new component, then commit, push, and publish via `gh workflow run publish.yml` (NOT `npm run publish:ui` — CLI publish fails due to passkey auth)
- NEVER hardcode colors or sizes — always use CSS custom properties
- ALWAYS use the data-attribute pattern for variants, not className switching
- ALWAYS support the full 9-step ControlSize scale for interactive controls
- ALWAYS generate both light and dark theme support via `light-dark()` CSS function
- ALWAYS follow the 3-phase workflow: shadcn research → OpenAI reverse-engineer → build + demo
- ALWAYS reproduce ALL examples from the shadcn page — count them, confirm with user, create every single one. No skipping
- ALWAYS put example descriptions inside the `details` prop of `<ComponentPreview>`, NEVER as plain text paragraphs outside the component
- ALWAYS mark new components with "New" badge in ALL three places: `isNew` on ComponentCard, slug in `lib/docs-new-badges.ts`, and entry in changelog under `## Unreleased → ### Added`
- ALWAYS create interactive demos with `data-demo-controls` and `data-demo-stage` for every component
- ALWAYS check ALL states: default, hover, active, focus, focus-visible, disabled, error, loading, open, selected
- Keep components focused — each component does ONE thing well
- Prefer composition over configuration — small, composable components
- All text should use the typography token scale, never raw px/rem for font sizes
- When reverse-engineering, ALWAYS map raw CSS values to the nearest design token — never copy raw hex/px values directly
- When reverse-engineering, take screenshots BEFORE and AFTER interactions to capture all states
- When reverse-engineering, respect the site's terms of service — extract visual patterns, not proprietary code
