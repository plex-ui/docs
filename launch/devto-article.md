# Dev.to Article

**Title:** Why Your Design System Needs 9 Component Sizes, Not 4

---

Most design systems give you three or four sizes per component. Small, medium, large. Maybe extra-small if you're lucky.

This works fine for marketing sites. But when you're building a real application, you hit the constraints fast.

You need a compact button for table row actions. A medium button for forms. A large button for primary CTAs. An extra-large button for hero sections. And everything in between.

With only 4 sizes, you end up customizing. You add one-off padding classes. You create variant components. You fight the system instead of using it.

## The case for 9 sizes

Plex UI ships with 9 sizes for every component: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl.

Here's what each size is actually for:

- **xs/sm**: Dense UIs, table actions, compact toolbars
- **md/lg**: Forms, dialogs, standard app interfaces
- **xl/2xl**: Marketing pages, CTAs, prominent actions
- **3xl/4xl/5xl**: Hero sections, landing pages, billboards

When you have the full range, you stop customizing. You just pick the size that fits.

## How this works with tokens

Every size is defined through a three-layer token system:

```tsx
// Primitive tokens (raw values)
const spacing = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  // ... up to 96
}

// Semantic tokens (contextual meaning)
const button = {
  padding: {
    xs: spacing[2],
    sm: spacing[3],
    md: spacing[4],
    // ...
  }
}

// Component tokens (applied to UI)
<Button size="xs" /> // Uses button.padding.xs
```

This three-layer approach means you can theme the entire system by changing semantic tokens. Want denser buttons across your app? Change one value. Every button updates.

## Example: Button component API

Here's what the API looks like in practice:

```tsx
import { Button } from '@plexui/ui'

// 9 sizes
<Button size="xs">Compact</Button>
<Button size="sm">Small</Button>
<Button size="md">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="2xl">2X Large</Button>
<Button size="3xl">3X Large</Button>
<Button size="4xl">4X Large</Button>
<Button size="5xl">5X Large</Button>

// Multiple variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

// Combine size + variant
<Button size="xl" variant="primary">
  Hero CTA
</Button>
```

Every component in the system works this way. Inputs, selects, badges, cards. All 9 sizes.

## Figma ↔ React parity

The token system exists in both Figma and React. In Figma, all 22,000+ component variants are built on Figma Variables. In React, they're Tailwind CSS 4 classes.

Same tokens. Same structure. Same naming.

This means when a designer picks `Button/Primary/lg` in Figma, the developer uses `<Button variant="primary" size="lg">` in React. The output is identical.

No more "the design looks different in production." No more manual spacing adjustments. It just matches.

## Built for AI code editors

The component API is designed to be predictable. AI code editors like Claude, Cursor, and Codex can use it correctly because the patterns are consistent.

Every component has a `size` prop with the same 9 values. Every component has a `variant` prop. The naming is semantic and obvious.

This makes AI-generated code actually usable. The LLM picks the right size, the right variant, and it works.

## Why 4 sizes isn't enough

Let's look at a real example. You're building a dashboard with:
- Table row actions (need xs buttons)
- Form submit buttons (need md buttons)
- Primary page action (need xl button)
- Onboarding hero (need 3xl button)

With 4 sizes, you're customizing at least two of these. With 9 sizes, you just pick the right one.

The granularity matters. It's the difference between fighting your design system and trusting it.

## Try it yourself

Plex UI is free and MIT licensed for React. Install it:

```bash
npm install @plexui/ui
```

Docs: https://plexui.com/docs
GitHub: https://github.com/plex-ui/ui

There's also a paid Figma Kit ($49-$299) if you want the design files. But the React library gives you everything you need to start building.

Test the 9-size approach in your next project. See if you still need to customize components, or if the system just works.
