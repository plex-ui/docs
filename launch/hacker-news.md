# Hacker News

**Title:** Show HN: Plex UI – Design system with 22K Figma variants and free React library

**Body:**

I built Plex UI, a design system with a free React library (MIT) and a paid Figma Kit. The goal was to solve the design-code sync problem.

The system uses a three-layer token structure: primitive tokens (raw values), semantic tokens (contextual mappings), component tokens (applied styles). In Figma, all 22,000+ variants are built on Figma Variables. In React, the components use Radix primitives and Tailwind CSS 4. The token structure is identical across both.

Most component libraries offer 3-4 sizes. We ship 9 (xs through 5xl). Real applications need this range. Dashboard UIs need xs buttons for table actions. Landing pages need 3xl CTAs.

The React library is free and MIT licensed (npm install @plexui/ui). The Figma Kit is paid ($49-$299). Built for AI code editors. The component API is designed to be predictable and easy for LLMs to use correctly.

Docs: https://plexui.com/docs
GitHub: https://github.com/plex-ui/ui
