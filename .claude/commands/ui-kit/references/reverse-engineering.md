# Browser Reverse Engineering Guide

## Overview

This guide describes how to reverse-engineer UI components from live OpenAI products using browser automation tools. The goal is to extract visual patterns, design tokens, and interaction states — then recreate them as production-quality components in the Plex UI token system.

## Target sites

| Site | URL Pattern | What to extract |
|------|-------------|-----------------|
| ChatGPT | `chatgpt.com/*` | Chat interface, sidebar, modals, buttons, inputs, settings |
| OpenAI Platform | `platform.openai.com/*` | Settings forms, tables, navigation, API key management |
| OpenAI Developers | `developers.openai.com/*` | Documentation layout, code blocks, navigation, search |
| OpenAI.com | `openai.com/*` | Marketing components, hero sections, cards |

## Complete state extraction workflow

### Phase 1: Page reconnaissance

1. Navigate to the target URL
2. Take a full-page screenshot
3. Use `read_page` to get the accessibility tree
4. Identify all unique components on the page
5. Ask the user which components to extract

### Phase 2: Component isolation

For each target component:

1. **Find the element** using `find` tool or `read_page`
2. **Zoom in** with `computer action: "zoom"` to see details
3. **Get the DOM structure** via `javascript_tool`:

```javascript
// Get the full HTML structure of a component
const el = document.querySelector('SELECTOR');
const clone = el.cloneNode(true);
// Remove text content for cleaner structure
function cleanText(node) {
  if (node.nodeType === 3) node.textContent = node.textContent.trim() ? '...' : '';
  node.childNodes.forEach(cleanText);
}
cleanText(clone);
clone.outerHTML
```

### Phase 3: State-by-state extraction

**CRITICAL: Extract EVERY state. Do not skip any.**

For each component, go through this checklist systematically:

#### A. Visual states (extract via screenshot + computed styles)

| # | State | How to trigger | Extract |
|---|-------|---------------|---------|
| 1 | **Default** | Do nothing | Screenshot + styles |
| 2 | **Hover** | `computer action: "hover"` on element | Screenshot + styles |
| 3 | **Active/Pressed** | Click and hold (or add `:active` class) | Screenshot + styles |
| 4 | **Focus (mouse)** | Click the element | Screenshot + styles |
| 5 | **Focus (keyboard)** | Tab to the element | Screenshot + styles (check focus ring) |
| 6 | **Disabled** | Find disabled instance or `el.disabled = true` | Screenshot + styles |
| 7 | **Loading** | Find loading instance or trigger loading | Screenshot + styles |
| 8 | **Error/Invalid** | Find error instance or set `aria-invalid` | Screenshot + styles |
| 9 | **Selected/Active** | Click to select | Screenshot + styles |
| 10 | **Open/Expanded** | Click to open dropdown/accordion | Screenshot + styles |

#### B. For form controls, additionally:

| # | State | How to trigger |
|---|-------|---------------|
| 11 | **Empty** | Clear the field |
| 12 | **Placeholder** | Focus then blur empty field |
| 13 | **Filled** | Type a value |
| 14 | **Read-only** | Set `readOnly` attribute |
| 15 | **With label** | Check if label exists above/beside |
| 16 | **With helper text** | Check for description below |
| 17 | **With error message** | Check for error text below |

#### C. Style extraction script

Run this for EACH state to capture the full style delta:

```javascript
function captureComponentState(selector, stateName) {
  const el = document.querySelector(selector);
  if (!el) return { error: `Element not found: ${selector}` };

  const cs = getComputedStyle(el);

  return {
    state: stateName,
    selector: selector,

    // Layout
    display: cs.display,
    position: cs.position,
    width: cs.width,
    height: cs.height,
    minHeight: cs.minHeight,
    padding: cs.padding,
    margin: cs.margin,
    gap: cs.gap,
    alignItems: cs.alignItems,
    justifyContent: cs.justifyContent,
    flexDirection: cs.flexDirection,

    // Typography
    fontFamily: cs.fontFamily,
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
    textAlign: cs.textAlign,
    textTransform: cs.textTransform,
    textDecoration: cs.textDecoration,

    // Colors
    color: cs.color,
    backgroundColor: cs.backgroundColor,

    // Border
    borderWidth: cs.borderWidth,
    borderStyle: cs.borderStyle,
    borderColor: cs.borderColor,
    borderRadius: cs.borderRadius,

    // Outline (focus ring)
    outline: cs.outline,
    outlineColor: cs.outlineColor,
    outlineOffset: cs.outlineOffset,
    outlineWidth: cs.outlineWidth,

    // Shadow & Effects
    boxShadow: cs.boxShadow,
    opacity: cs.opacity,
    filter: cs.filter,
    backdropFilter: cs.backdropFilter,

    // Transform & Animation
    transform: cs.transform,
    transition: cs.transition,
    transitionDuration: cs.transitionDuration,
    transitionTimingFunction: cs.transitionTimingFunction,
    transitionProperty: cs.transitionProperty,

    // Cursor
    cursor: cs.cursor,
    pointerEvents: cs.pointerEvents,
    userSelect: cs.userSelect,

    // Overflow
    overflow: cs.overflow,
    overflowX: cs.overflowX,
    overflowY: cs.overflowY,
  };
}

JSON.stringify(captureComponentState('SELECTOR', 'STATE_NAME'), null, 2);
```

#### D. Diff states to find what changes

After capturing default and hover states, compare:

```javascript
function diffStates(defaultState, hoverState) {
  const changes = {};
  for (const key of Object.keys(defaultState)) {
    if (key === 'state' || key === 'selector') continue;
    if (defaultState[key] !== hoverState[key]) {
      changes[key] = {
        from: defaultState[key],
        to: hoverState[key]
      };
    }
  }
  return changes;
}
// Use after capturing both states
```

### Phase 4: Design token extraction

Extract CSS custom properties used on the site:

```javascript
// Get all CSS variables from all stylesheets
const allVars = new Map();
for (const sheet of document.styleSheets) {
  try {
    for (const rule of sheet.cssRules) {
      const text = rule.cssText || '';
      const varMatches = text.match(/--[\w-]+/g);
      if (varMatches) {
        for (const v of varMatches) {
          const val = getComputedStyle(document.documentElement).getPropertyValue(v).trim();
          if (val) allVars.set(v, val);
        }
      }
    }
  } catch(e) { /* cross-origin */ }
}

// Group by category
const grouped = { colors: {}, spacing: {}, typography: {}, radius: {}, shadow: {}, other: {} };
for (const [name, value] of allVars) {
  if (name.match(/color|bg|text|border-color|fill|stroke/i)) grouped.colors[name] = value;
  else if (name.match(/space|gap|padding|margin|size/i)) grouped.spacing[name] = value;
  else if (name.match(/font|text|heading|line-height|letter/i)) grouped.typography[name] = value;
  else if (name.match(/radius|rounded/i)) grouped.radius[name] = value;
  else if (name.match(/shadow|elevation/i)) grouped.shadow[name] = value;
  else grouped.other[name] = value;
}
JSON.stringify(grouped, null, 2);
```

### Phase 5: Token mapping

Map extracted raw values to the Plex UI token system:

| Extracted Value | Nearest Token | Category |
|----------------|---------------|----------|
| `#6366f1` | `--primary-500` | Color |
| `14px` | `--text-md` (0.875rem) | Typography |
| `32px` height | `--size-control-md` | Control size |
| `8px` radius | `--radius-md` | Border radius |
| `0.875rem` padding | `--space-3` (0.75rem) | Spacing |

**Rules for mapping:**
- Round to the nearest token value, don't create new tokens
- If a value falls exactly between two tokens, choose the smaller one
- If the value is truly unique (e.g., a specific brand color), add it as a new primitive token
- Document any values that couldn't be mapped cleanly

### Phase 6: Component generation

After extraction, generate the component with:

1. A comment at the top: `// Reverse-engineered from: <url> on <date>`
2. All states mapped to CSS with proper selectors
3. A state matrix comment documenting all states:

```css
/*
 * State matrix (extracted from ChatGPT):
 *
 * | State     | Background      | Border          | Text Color      | Shadow          |
 * |-----------|-----------------|-----------------|-----------------|-----------------|
 * | default   | --gray-0        | --gray-200      | --gray-1000     | none            |
 * | hover     | --gray-50       | --gray-300      | --gray-1000     | --elevation-100 |
 * | active    | --gray-100      | --gray-400      | --gray-1000     | none            |
 * | focus     | --gray-0        | --primary-500   | --gray-1000     | focus-ring      |
 * | disabled  | --gray-50       | --gray-100      | --gray-400      | none            |
 * | error     | --danger-50     | --danger-500    | --gray-1000     | none            |
 */
```

## Tips

- **ChatGPT sidebar** often uses `data-testid` attributes — use these as selectors
- **OpenAI Platform** uses Radix UI primitives — look for `data-state` attributes
- **Dark mode** — toggle dark mode on the site and re-extract to get dark theme values
- **Transitions** — always capture `transition` property to replicate animation timing
- **Icons** — note icon sizes but don't extract SVGs (use the Plex UI icon set instead)
- **Responsive** — use `resize_window` tool to check mobile/tablet breakpoints
