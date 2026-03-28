# Reddit Post — r/ChatGPT

## Title:

`I built a local plugin that lets ChatGPT (or any AI) design directly in Figma — open alternative to the Claude-only integration`

---

## Post Body:

Figma recently announced an official code-to-design integration, but it only works with Claude. I built something that works with **any** model — including ChatGPT/GPT-4.

**What it does:**

A Figma plugin + local server. You give your AI model (ChatGPT, Codex, Claude, Cursor, whatever) the API endpoint, and it can:

- Create and edit real Figma components — frames, text, shapes, auto-layout
- Bind design tokens (Figma Variables) to any property
- Read existing designs — inspect structure, tokens, layout
- Generate matching code from Figma designs
- Export designs as PNG/SVG

**Example flow with ChatGPT:**

You: "Create a login form with email, password, and submit button"

GPT sends HTTP commands to localhost:8767 → components appear in your Figma file → you tweak in Figma → ask GPT to read the design → it generates React code.

Design ↔ code in both directions. Any model.

**Why model-agnostic:**

- Use GPT for design, Claude for code, Cursor for implementation — same API
- Runs locally. Your design data stays on your machine
- No vendor lock-in
- Works with anything that can make HTTP calls (even curl)

It's part of [Plex UI](https://plexui.com), which also includes a free React component library (35 components on npm). The Bridge plugin is $49 one-time.

Setup takes 2 min: [plexui.com/bridge](https://plexui.com/bridge)

---

## Prepared Responses:

**Q: "Does this work with the ChatGPT API or the web interface?"**
> It works with anything that can make HTTP requests. With the ChatGPT API (using function calling or code interpreter), it works great. The web interface would need an intermediary (like a custom GPT with actions), but API-based workflows are the primary use case.

**Q: "How does this compare to using ChatGPT Canvas?"**
> Canvas generates code in an editor. This generates actual Figma designs that your design team can edit, and then the AI can read those designs back to generate updated code. It's for teams that work in Figma, not just code.
