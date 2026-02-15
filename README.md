# Plex UI

The most flexible UI kit for Figma & React. Production-grade components with pixel-perfect Figma parity.

[Documentation](https://plexui.com) &bull; [Components](https://plexui.com/docs/components) &bull; [Figma Kit](https://plexui.com/#pricing) &bull; [npm](https://www.npmjs.com/package/@plexui/ui)

---

## Highlights

- **22,000+ Figma variants** across 14 components and 6,600+ icons
- **Three-layer token system** — primitive, semantic, component — all as Figma Variables
- **9-step unified size scale** — 3xs (22px) to 3xl (48px)
- **35 React components** — accessible Radix primitives + Tailwind CSS 4
- **14 hooks** — useBreakpoints, useScrollable, and more
- **Full dark mode** — via CSS `light-dark()` and Figma variable modes
- **Built for AI code editors** — production-grade building blocks for Claude, Cursor, Codex & AI-driven workflows

## Quick Start

```bash
npm install @plexui/ui
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@plexui/ui/css";
```

```tsx
import { Button } from "@plexui/ui/components/Button";

export function Example() {
  return <Button color="primary" size="md">Get started</Button>;
}
```

## Figma Design System PRO

22,000+ meticulously crafted variants built entirely on Figma Variables.

**[Get the Figma Kit &rarr;](https://plexui.com/#pricing)**

| Personal | Team | Unlimited |
|----------|------|-----------|
| $49 | $149 | $299 |
| 1 designer, 1 project | Up to 5 designers | Unlimited |
| Lifetime updates | Lifetime updates | Lifetime updates |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

React library: [MIT](./packages/ui/LICENSE)
Figma Kit: Commercial license via [plexui.com](https://plexui.com/#pricing)
