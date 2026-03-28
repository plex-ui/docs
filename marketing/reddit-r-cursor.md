# Reddit Post — r/cursor

## Title:

`Your Cursor can now design directly in Figma — built a local Bridge that works with any AI model`

---

## Post Body:

I built a Figma plugin + local server that lets Cursor (or any AI model) create and modify real Figma designs via HTTP.

The idea: you describe a UI in Cursor, the model generates Figma commands, and the components appear in your actual Figma file. Then you can also go the other direction — inspect existing Figma designs and generate matching React code.

**How it works with Cursor:**

1. Install the Figma plugin + run the local bridge server
2. In Cursor, give it the API context:

```
Figma Bridge API: http://localhost:8767
1) GET /status (check connected=true)
2) POST /command with {"command":"...","params":{...}}
3) Use params, not args
```

3. Ask Cursor to design something → it sends commands to Figma
4. Ask Cursor to inspect your Figma design → it reads the structure and generates React code

**What it can do:**

- Create frames, text, shapes, components, instances
- Set auto-layout, fills, strokes, effects
- Bind Figma Variables (design tokens) to properties
- Read any node's structure and properties
- Batch multiple operations
- Export as PNG/SVG

**Why I built this:**

Figma recently announced a Claude-only code-to-design feature. But most of us use Cursor day-to-day, and that integration doesn't help. The Bridge is model-agnostic — it's just an HTTP API that any AI can call.

It's part of [Plex UI](https://plexui.com) — a design system with a free React library (35 components, 9-size scale, design tokens) + paid Figma kit. The Bridge plugin is $49 one-time.

Setup: [plexui.com/bridge](https://plexui.com/bridge) — takes about 2 minutes.

Anyone else using AI to bridge design and code? Would love to hear what workflows people have set up.

---

## Prepared Responses:

**Q: "Does this work with Cursor's agent mode?"**
> Yes, perfectly. Agent mode can make HTTP calls, so Cursor can autonomously create and modify Figma designs. Give it the API context in your rules file or chat, and it'll use the Bridge API as a tool.

**Q: "How does this compare to v0/bolt for generating UI?"**
> v0 and bolt generate code from prompts. This generates actual Figma designs AND code. The key difference: your designers can then edit the Figma output, and the Bridge can re-read it to update code. It's a two-way loop, not one-shot generation.

**Q: "Can I add the Bridge endpoint to .cursor/rules?"**
> Yes! That's the recommended setup. Add the API context to a `.cursor/rules/figma-bridge.mdc` file and Cursor will automatically use it when relevant. I can share the exact rule file content if you want.

**Q: "$49 seems steep for a plugin"**
> It's one-time, lifetime license. No subscription. The alternative is manually translating between Figma and code, or being locked into Claude-only. If you use Cursor as your main AI editor, this is the only way to get Figma ↔ code in both directions.

---

## Engagement Rules:

1. r/cursor loves practical workflow improvements
2. Include specific Cursor integration details (rules files, agent mode)
3. Show, don't tell — be concrete about what commands look like
4. Be helpful if people ask how to set up their specific workflow
