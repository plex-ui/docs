# Reddit: r/reactjs

**Title:** I built a free React component library with 35 components and 9 sizes each (MIT licensed)

**Body:**

I've been working on Plex UI, a React component library that's free and MIT licensed. Figured this community might find it useful.

**What it is:**
- 35 components built on Radix primitives
- 9 sizes per component (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
- Three-layer token system for theming
- Built with Tailwind CSS 4
- 6,600+ icons included

**Why 9 sizes:**
Most libraries give you 3-4 sizes. That's fine for landing pages, but real apps need more granularity. Dashboard tables need xs buttons. Hero sections need 3xl buttons. Having all 9 sizes means you're not fighting the system.

**Installation:**
```bash
npm install @plexui/ui
```

Docs: plexui.com/docs
GitHub: github.com/plex-ui/ui

There's also a paid Figma Kit ($49-$299) if you use Figma, but the React library is completely free. Everything is built on Figma Variables so design and code stay in sync.

Built this to work well with AI code editors (Claude, Cursor, Codex). The component API is designed to be predictable and easy for LLMs to use correctly.

Would love feedback from the community.
