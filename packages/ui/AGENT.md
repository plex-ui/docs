# Plex UI -- AI Agent Reference

React component library with 35+ components, 619 icons, 14 hooks, and a three-layer design token system with automatic light/dark mode.

## Quick Start

```bash
npm install @plexui/ui
```

```css
/* global CSS or layout */
@import "@plexui/ui/css";
```

```tsx
// root layout
import { PlexUIProvider } from "@plexui/ui/components/PlexUIProvider"

export default function RootLayout({ children }) {
  return <PlexUIProvider>{children}</PlexUIProvider>
}
```

All imports use subpath pattern for tree-shaking:

```tsx
import { Button } from "@plexui/ui/components/Button"
import { Input } from "@plexui/ui/components/Input"
import { Search, Settings } from "@plexui/ui/components/Icon"
```

---

## Components

### Button

**Import:** `@plexui/ui/components/Button` -- exports `Button`, `ButtonLink`, `CopyButton`

| Prop | Type | Default |
|------|------|---------|
| color | `"primary" \| "secondary" \| "danger" \| "success" \| "info" \| "discovery" \| "caution" \| "warning"` | `"primary"` |
| variant | `"solid" \| "soft" \| "outline" \| "ghost"` | `"solid"` |
| size | `ControlSize` | `"md"` |
| pill | `boolean` | `false` |
| block | `boolean` | `false` |
| disabled | `boolean` | `false` |
| loading | `boolean` | `false` |
| selected | `boolean` | `false` |
| uniform | `boolean` | `false` |
| iconSize | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | -- |
| gutterSize | `"3xs" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl"` | -- |

### Input

**Import:** `@plexui/ui/components/Input`

| Prop | Type | Default |
|------|------|---------|
| variant | `"outline" \| "soft"` | `"outline"` |
| size | `ControlSize` | `"md"` |
| disabled | `boolean` | `false` |
| invalid | `boolean` | `false` |
| pill | `boolean` | `false` |
| onClear | `() => void` | -- (shows clear button when provided) |
| startAdornment | `ReactNode` | -- |
| endAdornment | `ReactNode` | -- |

Plus all standard HTML input attributes.

### Textarea

**Import:** `@plexui/ui/components/Textarea`

| Prop | Type | Default |
|------|------|---------|
| variant | `"outline" \| "soft"` | `"outline"` |
| size | `ControlSize` | `"md"` |
| rows | `number` | `3` |
| autoResize | `boolean` | `false` |
| maxRows | `number` | -- |
| disabled | `boolean` | `false` |
| invalid | `boolean` | `false` |

### Select

**Import:** `@plexui/ui/components/Select` -- exports `Select`, `Option`

| Prop | Type | Default |
|------|------|---------|
| options | `Option[] \| OptionGroup[]` | required |
| value | `string \| string[]` | required |
| onChange | `(option: Option \| Option[]) => void` | required |
| multiple | `boolean` | `false` |
| searchable | `boolean` | `false` |
| clearable | `boolean` | `false` |
| loading | `boolean` | `false` |
| placeholder | `string` | `"Select..."` |
| variant | `"outline" \| "soft"` | `"outline"` |
| size | `ControlSize` | `"md"` |
| pill | `boolean` | `false` |
| TriggerView | `React.FC` | -- (custom trigger) |

```typescript
type Option = {
  value: string
  label: string
  disabled?: boolean
  description?: ReactNode
  tooltip?: { content: ReactNode; maxWidth?: number }
}
```

### Menu

**Import:** `@plexui/ui/components/Menu`

Props: `forceOpen`, `onOpen`, `onClose`, `modal` (default: false)

Sub-components:
- `Menu.Trigger` -- button that opens menu
- `Menu.Content` -- container
- `Menu.Item` -- props: `onSelect`, `danger`, `disabled`, `startAdornment`, `endAdornment`
- `Menu.ItemAction` -- action button within item
- `Menu.Separator` -- divider
- `Menu.Submenu` -- nested menu
- `Menu.RadioGroup` / `Menu.RadioItem` -- radio selection
- `Menu.CheckboxItem` -- checkbox option

### Sidebar

**Import:** `@plexui/ui/components/Sidebar` -- 40+ exports

**SidebarProvider** props: `defaultOpen` (true), `open`, `onOpenChange`, `collapsible` ("offcanvas" | "icon" | "none")

**Sidebar** props: `side` ("left" | "right"), `variant` ("sidebar" | "docs")

Sub-components: `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel` (props: `size` "sm"|"lg"), `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` (props: `isActive`, `size`, `tooltip`), `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuBadge`, `SidebarMenuAction`, `SidebarMenuSkeleton`, `SidebarCard` (props: `dismissible`, `onDismiss`), `SidebarSeparator`, `SidebarTrigger`, `SidebarInset`, `SidebarInput`

Hook: `useSidebar()` -- returns sidebar state

### Alert

**Import:** `@plexui/ui/components/Alert`

| Prop | Type | Default |
|------|------|---------|
| color | `SemanticColor` | `"primary"` |
| variant | `"solid" \| "soft" \| "outline"` | `"outline"` |
| title | `ReactNode` | -- |
| description | `ReactNode` | -- |
| actions | `ReactNode` | -- |
| actionsPlacement | `"end" \| "bottom"` | -- |
| indicator | `ReactNode \| false` | -- |
| onDismiss | `() => void` | -- (shows dismiss button) |

### Badge

**Import:** `@plexui/ui/components/Badge`

| Prop | Type | Default |
|------|------|---------|
| variant | `"solid" \| "soft" \| "outline"` | `"soft"` |
| size | `"sm" \| "md" \| "lg"` | `"sm"` |
| color | `"secondary" \| "success" \| "danger" \| "warning" \| "info" \| "discovery" \| "caution"` | `"secondary"` |
| pill | `boolean` | `false` |

### Checkbox

**Import:** `@plexui/ui/components/Checkbox`

| Prop | Type | Default |
|------|------|---------|
| checked | `boolean \| "indeterminate"` | -- |
| defaultChecked | `boolean \| "indeterminate"` | -- |
| label | `ReactNode` | -- |
| onCheckedChange | `(next: boolean) => void` | -- |
| disabled | `boolean` | `false` |
| orientation | `"left" \| "right"` | `"left"` |
| pill | `boolean` | `false` |
| variant | `"solid" \| "ghost"` | `"solid"` |

### Switch

**Import:** `@plexui/ui/components/Switch`

| Prop | Type | Default |
|------|------|---------|
| checked | `boolean` | -- |
| defaultChecked | `boolean` | -- |
| label | `ReactNode` | -- |
| description | `ReactNode` | -- |
| onCheckedChange | `(next: boolean) => void` | -- |
| disabled | `boolean` | `false` |
| labelPosition | `"start" \| "end"` | `"end"` |

### RadioGroup

**Import:** `@plexui/ui/components/RadioGroup`

Props: `value`, `defaultValue`, `onChange`, `direction` ("row" | "col", default: "row"), `disabled`, `name`

Sub: `RadioGroup.Item` -- props: `value`, `disabled`, `orientation`, `block`, `children`

### Tooltip

**Import:** `@plexui/ui/components/Tooltip` -- exports `Tooltip`, `CopyTooltip`

| Prop | Type | Default |
|------|------|---------|
| content | `ReactNode` | required |
| maxWidth | `number \| "none"` | `300` |
| forceOpen | `boolean` | -- |
| openDelay | `number` | `150` |
| interactive | `boolean` | -- |
| side | `"top" \| "right" \| "bottom" \| "left"` | `"top"` |
| sideOffset | `number` | `5` |
| align | `"start" \| "center" \| "end"` | `"center"` |

### Popover

**Import:** `@plexui/ui/components/Popover` -- exports `Popover`, `usePopoverController`

Props: `open`, `onOpenChange`, `showOnHover`, `hoverOpenDelay` (150)

Sub: `Popover.Trigger`, `Popover.Content`

### Avatar

**Import:** `@plexui/ui/components/Avatar` -- exports `Avatar`, `AvatarGroup`

| Prop | Type | Default |
|------|------|---------|
| size | `number` (px) | -- |
| name | `string` | -- (for initials) |
| imageUrl | `string` | -- |
| Icon | `React.ComponentType` | -- |
| color | `SemanticColor` | `"secondary"` |
| variant | `"soft" \| "solid"` | `"soft"` |

`AvatarGroup` props: `max` (number), `size` (number)

### Tabs

**Import:** `@plexui/ui/components/Tabs`

| Prop | Type | Default |
|------|------|---------|
| value | `string` | -- |
| defaultValue | `string` | -- |
| onValueChange | `(value: string) => void` | -- |
| orientation | `"horizontal" \| "vertical"` | `"horizontal"` |
| variant | `"default" \| "underline" \| "pill"` | `"default"` |
| size | `"sm" \| "md" \| "lg"` | `"md"` |

Sub: `Tabs.List`, `Tabs.Trigger` (props: `value`, `badge`, `disabled`), `Tabs.Content` (props: `value`)

### Dialog

**Import:** `@plexui/ui/components/Dialog`

Props: `open`, `onOpenChange`

Sub: `Dialog.Trigger`, `Dialog.Content`, `Dialog.Header`, `Dialog.Footer`

### DatePicker

**Import:** `@plexui/ui/components/DatePicker`

Props: `id` (required), `value` (DateTime | null), `onChange`, `min`, `max`, `disabled`, `placeholder`, `variant`, `size`, `pill`, `side`, `align`

Uses Luxon `DateTime`.

### DateRangePicker

**Import:** `@plexui/ui/components/DateRangePicker`

Props: `value` (DateRange), `onChange`, `min`, `max`, `shortcuts`

### TagInput

**Import:** `@plexui/ui/components/TagInput`

Props: `value` (Tag[]), `onChange`, `placeholder`, `disabled`, `invalid`, `size`, `variant`, `pill`, `maxTags`

```typescript
type Tag = { id: string; label: string }
```

### Slider

**Import:** `@plexui/ui/components/Slider`

Single: `value` (number), `onChange`, `min`, `max`, `step`, `label`, `marks`, `unit`, `disabled`
Range: `range={true}`, `value` ([number, number]), `onChange`

### Skeleton

**Import:** `@plexui/ui/components/Skeleton`

Props: `circle` (boolean, default: false). Standard div attributes.

### Table

**Import:** `@plexui/ui/components/Table`

Sub: `Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`, `Table.Head`, `Table.Footer`, `Table.Caption`

### DataTable

**Import:** `@plexui/ui/components/DataTable`

Props: `columns` (ColumnDef[] from @tanstack/react-table), `data`, `pagination`, `sorting`, `columnVisibility`

### Icon

**Import:** `@plexui/ui/components/Icon`

619 named SVG icon exports. Each renders inline SVG with `fill="currentColor"`, `width="1em"`, `height="1em"`, `aria-hidden="true"`. Icons scale with font size and inherit text color.

```tsx
import { Search, ChevronDown, Settings, Bell, Star, Home, Plus, X } from "@plexui/ui/components/Icon"
```

### Indicators

**Import:** `@plexui/ui/components/Indicator`

- `LoadingIndicator` -- props: `size` ("sm" | "md" | "lg")
- `LoadingDots`
- `CircularProgress` -- props: `value` (0-100), `size`, `strokeWidth`

### Transitions

**Import:** `@plexui/ui/components/Transition`

Exports: `Animate`, `AnimateLayout`, `AnimateLayoutGroup`, `TransitionGroup`

### Other Components

| Component | Import | Key Props |
|-----------|--------|-----------|
| Field | `@plexui/ui/components/Field` | `label`, `error`, `required`, `children` |
| FieldError | `@plexui/ui/components/FieldError` | `children` |
| EmptyMessage | `@plexui/ui/components/EmptyMessage` | `fill`; sub: `.Icon`, `.Title`, `.Description` |
| TextLink | `@plexui/ui/components/TextLink` | Standard link with semantic colors |
| CodeBlock | `@plexui/ui/components/CodeBlock` | `code`, `language`, `showLineNumbers` |
| Markdown | `@plexui/ui/components/Markdown` | `children` (string), `components` |
| FloatingLabelInput | `@plexui/ui/components/FloatingLabelInput` | Same as Input + floating label |
| FloatingLabelSelect | `@plexui/ui/components/FloatingLabelSelect` | Same as Select + floating label |
| OTPInput | `@plexui/ui/components/OTPInput` | `value`, `onChange`, `length` (6), `disabled` |
| ProgressSteps | `@plexui/ui/components/ProgressSteps` | `steps`, `currentStep`, `onStepChange` |
| SelectControl | `@plexui/ui/components/SelectControl` | Native select: `value`, `onChange`, `options`, `variant`, `size` |
| ShimmerText | `@plexui/ui/components/ShimmerText` | `children`, `shimmer` |
| StatCard | `@plexui/ui/components/StatCard` | `title`, `value`, `change`, `trend` |
| Image | `@plexui/ui/components/Image` | Standard img with lazy loading |

---

## Types

Import from `@plexui/ui/types`:

```typescript
type ControlSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
type Size = "5xs" | "4xs" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
type Radius = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
type TextColor = "base" | "emphasis" | "secondary" | "tertiary"
type SemanticColor = "primary" | "secondary" | "danger" | "success" | "warning" | "caution" | "discovery" | "info"
type Variant = "solid" | "soft" | "outline" | "ghost"
type Alignment = "start" | "center" | "end"
type FontWeight = "inherit" | "normal" | "medium" | "semibold" | "bold"
```

## Control Size Scale

| Size | Height | Font Size | Icon Size |
|------|--------|-----------|-----------|
| 3xs  | 22px   | 12px      | 14px      |
| 2xs  | 24px   | 12px      | 14px      |
| xs   | 26px   | 12px      | 16px      |
| sm   | 28px   | 12px      | 16px      |
| **md** | **32px** | **14px** | **18px** |
| lg   | 36px   | 16px      | 20px      |
| xl   | 40px   | 16px      | 20px      |
| 2xl  | 44px   | 16px      | 22px      |
| 3xl  | 48px   | 16px      | 24px      |

All form controls (Button, Input, Select, Textarea, TagInput, DatePicker) share this scale.

---

## Hooks

All hooks import from `@plexui/ui/hooks/{hookName}`.

| Hook | Signature | Description |
|------|-----------|-------------|
| useBreakpoint | `(bp: "xs"\|"sm"\|"md"\|"lg"\|"xl"\|"2xl") => boolean` | Viewport at or above breakpoint |
| useAutoGrowTextarea | `(ref, value) => void` | Auto-size textarea to content |
| useScrollable | `(ref) => { isScrollable, isAtStart, isAtEnd }` | Scroll state detection |
| useIsMounted | `() => boolean` | False on SSR, true after hydration |
| usePrevious | `(value: T) => T` | Previous render value |
| useStableCallback | `(fn: T) => T` | Stable callback identity |
| useEscCloseStack | `(listening, cb) => void` | Stacked ESC key handlers |
| useDocumentVisible | `() => boolean` | Document visibility state |
| useLatestValue | `(value: T) => MutableRefObject<T>` | Latest value ref |
| useTrailingValue | `(value: T, delay: number) => T` | Delayed trailing value |
| useSimulatedProgress | `(startAt, maxDuration, completed?) => number` | Simulated progress 0-100 |
| useAnimatedScrollTo | `(scrollRef) => (target: number) => void` | Animated scroll |
| useCharactersPerSecond | `(text, streaming) => () => number` | Streaming text speed |
| useTextSelection | `(listening, cb) => void` | Text selection tracking |

---

## Utilities

Import from `@plexui/ui/helpers`:

- `copyToClipboard(content)` / `copyText(text)` -- clipboard operations
- `createId(prefix, maxLength?)` -- random ID generation
- `sleep(ms)` -- promise sleep
- `toCssVariables(vars)` -- object to CSS custom properties
- `focusableElements(el)` -- query focusable children
- `prefersReducedMotion()` -- check user motion preference
- `groupByProperty(items, key, format?)` -- group array by property

Import from `@plexui/ui/theme`:

- `useDocumentTheme() => "light" | "dark"` -- reactive theme hook
- `getDocumentTheme() => "light" | "dark"` -- get current theme
- `applyDocumentTheme(theme)` -- set theme on document

---

## Design Tokens

Three-layer CSS custom property system imported via `@import "@plexui/ui/css"`.

### Text Colors
```
--color-text              (primary text)
--color-text-secondary    (muted)
--color-text-tertiary     (subtle)
--color-text-inverse      (on dark backgrounds)
--color-text-disabled
```

### Surfaces
```
--color-surface            (primary bg)
--color-surface-secondary
--color-surface-tertiary
--color-surface-elevated   (popovers, modals)
```

### Borders
```
--color-border-subtle      (5-6% opacity)
--color-border             (10-12% opacity)
--color-border-strong      (15-20% opacity)
```

### Semantic Color Pattern

Each semantic color (primary, secondary, danger, success, warning, info, discovery, caution) provides 5 variant sets:

```
--color-background-{color}-solid          (+ hover, active)
--color-background-{color}-soft           (+ hover, active)
--color-background-{color}-soft-alpha     (+ hover, active)
--color-background-{color}-outline-hover  (+ active)
--color-background-{color}-ghost-hover    (+ active)
--color-text-{color}-solid
--color-text-{color}-soft
--color-border-{color}-outline            (+ hover)
```

### Radius
```
--radius-2xs (2px)  --radius-xs (4px)   --radius-sm (6px)
--radius-md (8px)   --radius-lg (10px)  --radius-xl (12px)
--radius-2xl (16px) --radius-3xl (20px) --radius-full (9999px)
```

### Shadows
```
--shadow-100 through --shadow-400 (with -strong, -stronger variants)
--shadow-hairline (1px border-like shadow)
```

### Alpha Transparency
```
--alpha-02 through --alpha-70 (auto-inverts in dark mode)
```

### Typography
```
Headings: --font-heading-{5xl..xs}-size (72px down to 16px)
Text:     --font-text-{lg..3xs}-size (18px down to 8px)
Weights:  --font-weight-normal (400), -medium (500), -semibold (600), -bold (700)
Families: --font-sans (system stack), --font-mono
```

### Motion
```
--cubic-enter, --cubic-exit, --cubic-move
--transition-duration-basic: 150ms
```

### Breakpoints
```
xs: 380px, sm: 576px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
```

---

## Dark Mode

Three ways to set theme:

```css
/* CSS */
:root { color-scheme: dark; }
:root { color-scheme: light dark; }  /* OS auto */
```

```html
<!-- HTML attribute -->
<html data-theme="dark">
```

```tsx
// JavaScript
import { applyDocumentTheme } from "@plexui/ui/theme"
applyDocumentTheme("dark")
```

All components and tokens auto-adapt via `light-dark()` CSS function.

---

## Common Patterns

### Controlled vs Uncontrolled

```tsx
// Uncontrolled
<Input defaultValue="hello" />

// Controlled
const [value, setValue] = useState("hello")
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Composition (Menu, Sidebar, Tabs, Dialog)

```tsx
<Menu>
  <Menu.Trigger>Open</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
    <Menu.Separator />
    <Menu.Item onSelect={() => {}} danger>Delete</Menu.Item>
  </Menu.Content>
</Menu>
```

### Form Field with Validation

```tsx
<Field label="Email" error={errors.email} required>
  <Input type="email" invalid={!!errors.email} />
</Field>
```

### Button with Icon

```tsx
import { Button } from "@plexui/ui/components/Button"
import { Plus } from "@plexui/ui/components/Icon"

<Button size="md" variant="outline">
  <Plus /> Add item
</Button>
```

### Sidebar Layout

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Logo</SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <Home /> Dashboard
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    {/* main content */}
  </SidebarInset>
</SidebarProvider>
```
