# Twitter/X Launch Thread

## Main Thread (post as a thread, one tweet per section):

---

**Tweet 1 (Hook):**

Most UI kits give you 3 button sizes.

I built a design system with 9.

Here's why that matters (and why your AI editor will thank you):

🧵

---

**Tweet 2 (Problem):**

The problem with 3-4 sizes:

- Your dashboard toolbar needs 24px controls
- Your forms need 32px
- Your settings page needs 36px
- Your landing hero needs 48px

With 3 sizes, you're overriding everything. Your "design system" becomes a suggestion system.

---

**Tweet 3 (Solution):**

Plex UI has 9 sizes from 22px to 48px.

Every control shares the same scale: Button, Input, Select, SegmentedControl.

One `size` prop. Zero overrides.

[ATTACH: GIF of size slider changing all 9 sizes]

---

**Tweet 4 (AI angle):**

Here's the part nobody talks about:

AI code editors (Claude, Cursor, Codex) generate magic numbers without a system.

A button is 36px on one page, 42px on the next. Colors are random hex values.

Plex UI gives AI a foundation. Same tokens, same sizes, every time.

---

**Tweet 5 (Token system):**

Three-layer design tokens:

Primitive → `--gray-500`
Semantic → `--color-text-secondary`
Component → `--button-text-color`

Change one value. The whole system updates.

Works in CSS, in React, AND in Figma Variables.

---

**Tweet 6 (What's included):**

What you get (free, MIT licensed):

- 35 components (Radix + Tailwind 4)
- 9-step size scale
- Three-layer token system
- Dark mode via CSS light-dark()
- 467+ icons
- 14 hooks

```
npm install @plexui/ui
```

---

**Tweet 7 (Figma angle):**

For design teams: every component exists identically in Figma.

22,000+ variants. Three-layer tokens as Figma Variables.

Same sizes. Same colors. Same dark mode.

No Figma-to-code translation layer.

[ATTACH: side-by-side Figma vs React screenshot]

---

**Tweet 8 (CTA):**

React library: free forever on npm
Figma kit: from $49 (launch price)
Docs: plexui.com

If you're building with AI code editors, this is the foundation your prompts have been missing.

---

## Follow-up Tweets (post throughout launch day):

**1 hour later:**
"Here's the size comparison. Left: what most libraries give you. Right: Plex UI."
[ATTACH: comparison image]

**3 hours later:**
"FAQ from the thread: 'Why not just use shadcn?'

shadcn is great for unstyled primitives you fully customize. Plex UI is a complete system with a defined scale and Figma parity.

Different tools. Both valid. The React library is also free."

**5 hours later:**
"The three-layer token system in action. One variable change updates everything from the button to the input to the select."
[ATTACH: GIF of theme change]

**End of day:**
"Thank you for the incredible response today. X likes, Y reposts.

If you installed @plexui/ui today, I'd love to hear what you're building with it. Reply or DM."

---

## Hashtags (use sparingly, 2-3 max per tweet):

`#reactjs #designsystem #figma #tailwindcss #opensource #webdev`

## Accounts to tag (only in relevant tweets, not every one):

- @tailwindcss (when mentioning Tailwind 4)
- @radaborhof / @radaborhof (Radix)
- @figma (when showing Figma features)
- Don't tag competitors (shadcn, etc.) — let the comparison speak for itself
