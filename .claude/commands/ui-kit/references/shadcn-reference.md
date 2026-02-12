# shadcn/ui Reference Guide

## Purpose

Use shadcn/ui documentation as a reference catalog to understand what component variants, props, and use cases exist in the industry. Then generate Plex UI-style components that match or exceed shadcn's feature set.

## Workflow

### Step 1: Browse the component page

Navigate to `https://ui.shadcn.com/docs/components/<component-name>` and extract:

1. **Component description** — what it does
2. **Variants/styles** — all visual variants listed
3. **Sub-components** — compound component parts (e.g., Dialog.Trigger, Dialog.Content)
4. **Props API** — all documented props
5. **Examples** — all usage patterns shown on the page

Use `get_page_text` to extract the documentation content, or `read_page` for interactive elements.

### Step 2: Extract the variant list

```javascript
// On a shadcn component page, extract all code examples
const codeBlocks = document.querySelectorAll('pre code, [data-rehype-pretty-code-fragment] code');
const examples = Array.from(codeBlocks).map((block, i) => ({
  index: i,
  code: block.textContent.slice(0, 500) // First 500 chars
}));
JSON.stringify(examples, null, 2)
```

### Step 3: Map to Plex UI patterns

| shadcn Pattern | Plex UI Equivalent |
|----------------|-------------------|
| `variant="destructive"` | `color="danger" variant="solid"` |
| `variant="outline"` | `variant="outline"` |
| `variant="secondary"` | `color="secondary" variant="soft"` |
| `variant="ghost"` | `variant="ghost"` |
| `variant="link"` | Use `TextLink` component instead |
| `size="sm"` | `size="sm"` (but Plex has 9 sizes, not 3) |
| `size="lg"` | `size="lg"` |
| `size="icon"` | Use `size="md"` + icon-only layout |
| `className="..."` (Tailwind) | `data-*` attributes + CSS Modules |
| `asChild` (Radix) | `asChild` or render prop |
| `cva()` variants | CSS `[data-variant]` selectors |

## Component catalog to check

When generating a UI kit, browse these shadcn pages for reference:

### Core controls
- `/docs/components/button` — variants, sizes, icon buttons, loading
- `/docs/components/input` — with label, disabled, with icon, file input
- `/docs/components/textarea` — auto-resize, with label, disabled
- `/docs/components/select` — single select, with groups, scrollable
- `/docs/components/checkbox` — checked, indeterminate, disabled, with text
- `/docs/components/radio-group` — basic, with description
- `/docs/components/switch` — basic, with label
- `/docs/components/slider` — range, step, with value display
- `/docs/components/toggle` — single, group, outline, with icon

### Display
- `/docs/components/badge` — variants, colors
- `/docs/components/avatar` — image, fallback, group
- `/docs/components/card` — basic structure, with form
- `/docs/components/separator` — horizontal, vertical
- `/docs/components/skeleton` — shapes, loading patterns
- `/docs/components/alert` — variants with icon and description
- `/docs/components/progress` — basic, indeterminate

### Navigation
- `/docs/components/tabs` — basic, with content, vertical
- `/docs/components/navigation-menu` — horizontal, with dropdown
- `/docs/components/breadcrumb` — basic, with dropdown, collapsed
- `/docs/components/pagination` — basic, with ellipsis
- `/docs/components/sidebar` — layouts, collapsible, with menu

### Overlays
- `/docs/components/dialog` — basic, form, scrollable, nested
- `/docs/components/dropdown-menu` — items, groups, radio, checkbox
- `/docs/components/popover` — placement, with form
- `/docs/components/tooltip` — basic, with arrow, placement
- `/docs/components/sheet` — side panels, from each direction
- `/docs/components/hover-card` — on hover display
- `/docs/components/context-menu` — right-click menu
- `/docs/components/command` — command palette / search
- `/docs/components/alert-dialog` — confirmation dialog

### Data display
- `/docs/components/table` — basic, sortable, with actions
- `/docs/components/data-table` — full-featured with pagination, sorting, filtering

### Feedback
- `/docs/components/toast` — variants, with action, with title
- `/docs/components/sonner` — notification toasts

### Date
- `/docs/components/calendar` — single, range, multiple
- `/docs/components/date-picker` — with presets, range

### Layout
- `/docs/components/accordion` — single, multiple, nested
- `/docs/components/collapsible` — basic, animated
- `/docs/components/scroll-area` — horizontal, vertical
- `/docs/components/resizable` — panels, with handle
- `/docs/components/aspect-ratio` — responsive image containers

## Enhancement checklist

For each component, after reviewing shadcn, ensure Plex UI version has:

- [ ] All variants that shadcn has (mapped to Plex naming)
- [ ] 9-step size scale (vs shadcn's 3-4)
- [ ] Semantic color support (primary, secondary, danger, success, warning)
- [ ] Dark mode via `light-dark()` (vs shadcn's `dark:` classes)
- [ ] CSS custom properties for all values (vs shadcn's Tailwind classes)
- [ ] Data attributes for state (vs shadcn's className-based state)
- [ ] Proper TypeScript types exported
- [ ] All states: default, hover, active, focus, disabled, error, loading
- [ ] Accessibility (aria attributes, keyboard navigation)
