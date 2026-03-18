# Twitter/X Launch Thread

## Main Thread (post as a thread, one tweet per section):

---

**Tweet 1 (Hook):**

Figma just announced a Claude-only code-to-design flow.

I built one that works with any AI model.

Here's the full system — free React library, paid Figma kit, and a model-agnostic Bridge:

---

**Tweet 2 (Bridge):**

The Bridge: a local Figma plugin + HTTP server.

Your AI sends commands to localhost:8767. It creates real Figma nodes — frames, text, components, auto-layout, design tokens. Any model works: Claude, GPT, Cursor, Codex, Gemini.

Designs never leave your machine. $49 one-time.

plexui.com/bridge

---

**Tweet 3 (The Problem):**

The other problem nobody talks about:

Most UI kits give you 3–4 button sizes. Your dashboard toolbar needs 24px. Forms need 32px. Settings page needs 36px. Landing hero needs 48px.

With 3 sizes, you're overriding everything. Your "design system" becomes a suggestion system.

---

**Tweet 4 (9 Sizes):**

Plex UI has 9 sizes from 22px to 48px.

Every control shares the same scale: Button, Input, Select, SegmentedControl.

One `size` prop. Zero overrides.

[ATTACH: GIF of size slider changing all 9 sizes]

---

**Tweet 5 (AI angle):**

AI code editors (Claude, Cursor, Codex) generate magic numbers without a system.

A button is 36px on one page, 42px on the next. Colors are random hex values.

Plex UI gives AI a vocabulary. Same tokens. Same sizes. Every time.

---

**Tweet 6 (Token system):**

Three-layer design tokens:

Primitive: --gray-500
Semantic: --color-text-secondary
Component: --button-text-color

Change one value. The whole system updates.

Works in CSS, in React, AND in Figma Variables.

---

**Tweet 7 (What's included):**

What you get (free, MIT licensed):

- 35+ components (Radix + Tailwind 4)
- 9-step size scale (3xs–3xl)
- Three-layer token system
- Dark mode via CSS light-dark()
- 6,600+ icons
- 14 hooks

npm install @plexui/ui

---

**Tweet 8 (Figma):**

For design teams: every component exists identically in Figma.

22,000+ variants. Three-layer tokens as Figma Variables.

Plus: any AI model can now design AND read your Figma file via the Bridge.

Design-to-code. Code-to-design. Both directions.

[ATTACH: side-by-side Figma vs React screenshot]

---

**Tweet 9 (CTA):**

React library: free forever on npm
Figma kit: from $49 (one-time)
Bridge plugin: $49 (one-time, any AI model)

Docs: plexui.com
Bridge: plexui.com/bridge

---

## Follow-up Tweets (post throughout launch day):

**1 hour later:**
"How the Bridge works in practice: describe a UI to your AI → it creates it in Figma → designer tweaks → AI reads the updated design → generates matching React code. Two-way loop. Any model."

**3 hours later:**
"FAQ: 'Why not just use shadcn?'

shadcn is great for unstyled primitives you fully customize. Plex UI is a complete system with a defined scale and Figma parity. Both free for React. Different tools."

**5 hours later:**
"The three-layer token system in action. One variable change updates everything from the button to the input to the select."
[ATTACH: GIF of theme change]

**End of day:**
"Thank you for the response. If you installed @plexui/ui today, I'd love to hear what you're building with it. Reply or DM."

---

## Hashtags (use sparingly, 2–3 max per tweet):

#reactjs #designsystem #figma #tailwindcss #opensource #webdev

## Accounts to tag (only in relevant tweets, not every one):

- @tailwindcss (when mentioning Tailwind 4)
- @figma (when showing Figma features)
- Don't tag competitors
