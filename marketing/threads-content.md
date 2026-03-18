# Threads Content Plan — @plexuikit

## Strategy

Threads — casual, developer-friendly tone. Mix of technical and relatable.
Post 4-5 times/week. Engage with dev community.

**Two products to promote:**
- Free React library (@plexui/ui on npm)
- Paid: Figma Kit ($49-$299) + Bridge Plugin ($49)

**Lead with Bridge** — it's the most newsworthy angle right now (Figma announced Claude-only integration on Feb 17, 2026; Bridge works with ANY model).

---

## WEEK 1: Bridge + Launch Wave

### Post 1 — Bridge Hook (Day 1) ★ POST FIRST

Figma just shipped a code-to-design feature.

It only works with Claude.

I built one that works with any AI model. Claude, GPT, Cursor, Codex, Gemini — anything that can make HTTP calls.

It's a local plugin. Your designs stay on your machine. $49 one-time, no subscription.

plexui.com/bridge

### Post 2 — How Bridge Works (Day 1, evening)

How it works:

1. Install the Figma plugin
2. Start the local bridge server
3. Tell your AI: "Figma API is at localhost:8767"

Your model sends HTTP commands → the plugin creates real Figma nodes.

Create frames, text, components. Bind design tokens. Read existing designs. Two-way flow.

Any model. No vendor lock-in.

### Post 3 — AI Code Quality (Day 2)

Hot take: AI code editors without a design system are just fancy copy-paste machines.

Claude, Cursor, Codex — they all generate magic numbers. A button is 36px on one page, 42px on the next.

Plex UI gives AI a vocabulary. Same tokens. Same sizes. Every time.

npm install @plexui/ui

### Post 4 — Size Scale (Day 2, evening)

Most UI kits give you 3 button sizes.

Plex UI has 9. From 3xs (22px) to 3xl (48px).

One size prop. Zero overrides.

Dense dashboard? Use 3xs-sm.
Marketing page? Use lg-3xl.
Same system. Same tokens.

plexui.com/docs/components

### Post 5 — Design ↔ Code Loop (Day 3)

The dream workflow:

1. Describe a UI to your AI
2. AI creates it in Figma (via Bridge)
3. Designer tweaks in Figma
4. AI reads the updated design
5. AI generates matching React code
6. Deploy

Design ↔ code. Both directions. Any model.

This is what we built. plexui.com/bridge

### Post 6 — What's Free (Day 3, evening)

What you get for free (MIT license):

35+ React components (Radix + Tailwind 4)
9-step size scale (3xs to 3xl, 22px to 48px)
Three-layer design token system
Dark mode via CSS light-dark()
6,600+ icons
14 hooks
Figma Bridge — any AI model → real Figma designs

npm install @plexui/ui
plexui.com

### Post 7 — Token System (Day 4)

Design tokens that actually make sense:

Layer 1: --gray-500 (raw value)
Layer 2: --color-text-secondary (purpose)
Layer 3: --button-text-color (component)

Change one variable. The whole system updates.

Works in CSS, React, AND Figma Variables.

---

## WEEK 2: Deep Dives + Social Proof

### Post 8 — vs Claude-Figma Official

"Why not just use Figma's official Claude integration?"

Two reasons:

1. Bridge works with ANY model, not just Claude
2. It runs locally — your designs never leave your machine

If you only use Claude, the official flow works. If you use anything else, Bridge is your only option.

### Post 9 — vs shadcn

"Why not just use shadcn?"

shadcn gives you unstyled primitives to customize from scratch. Great for that.

Plex UI gives you a complete system — 9 sizes, token layers, Figma parity. Plus a Bridge that connects your AI directly to Figma.

Different tools. Both valid. Both free (React library).

### Post 10 — Real Problem

You're building an app. You need:
- 22px controls in a compact toolbar
- 32px inputs in a form
- 40px buttons in settings
- 48px CTAs on the landing page

With 3 sizes, you're overriding everything.
With 9, you just pick the right one.

### Post 11 — For Design Teams

Designers: your Figma file IS the source of truth.

22,000+ variants. All tokens as Figma Variables. Dark + light modes.

Change a semantic token → every component updates.

Plus: your AI can now read AND write to the same file.

Figma Kit from $49. plexui.com/pricing

### Post 12 — Community Ask

Building Plex UI in the open.

What's the one thing that annoys you most about working with AI code editors?

I'm genuinely trying to solve the design ↔ code problem. What am I missing?

---

## WEEK 3-4: Ongoing Cadence

### Monday: Component Spotlight
Show one component in detail with code snippet.

### Wednesday: Bridge Use Case / Dev Tip
Real workflow example using Bridge, or design token tip.

### Friday: Community / Behind-the-scenes
Build process, user stories, industry observations.

---

## Engagement Rules

1. Reply to every comment
2. Follow and engage with React/Figma/AI/design system accounts
3. Never be promotional in replies to others — add value first
4. Share real insights, not just product features
5. Be honest about competitors — respect earns trust
6. When people mention Cursor/Claude/AI coding — jump in with genuine value
