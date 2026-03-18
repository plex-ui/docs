# Plex UI — Marketing Strategy (Updated March 2026)

## Current State

### Products
| Product | Price | Status |
|---------|-------|--------|
| React Library (@plexui/ui) | Free MIT | Live on npm, v0.7.45 |
| Figma Design System | $49–$299 one-time | Live on Lemon Squeezy |
| Figma Bridge Plugin | $49 one-time | Live, model-agnostic |

### Positioning

**"Figma + React design system where ANY AI model designs AND codes — not just Claude."**

Three audiences, three hooks:

| Audience | Hook | Where |
|----------|------|-------|
| AI editor users | "Your AI can now design in Figma, not just code" | r/ClaudeAI, r/cursor, r/ChatGPT, HN |
| React devs | "9 sizes, design tokens, AI-ready components" | r/reactjs, r/webdev, Dev.to |
| Designers | "22K variants + any AI model can edit your Figma file" | r/FigmaDesign, Threads, Dribbble |

### AI Discovery (COMPLETED)
- [x] llms.txt with competitive positioning vs shadcn
- [x] llms-full.txt with full component API reference
- [x] robots.ts with 35+ AI crawler directives
- [x] JSON-LD structured data (Organization, WebSite, SoftwareApplication, 2x Product, FAQ)
- [x] FAQ schema on home page, pricing page, comparison pages, bridge page
- [x] Meta descriptions optimized for GEO/AEO
- [x] Sitemap includes all pages (static + docs + blog)
- [x] BlogPosting schema on all blog posts
- [x] OG images programmatically generated

### Marketing Materials (UPDATED)
- [x] marketing/reddit-r-reactjs.md — 3 post variants with Bridge angle
- [x] marketing/reddit-r-claudeai.md — Bridge focus
- [x] marketing/reddit-r-cursor.md — Cursor integration focus
- [x] marketing/reddit-r-chatgpt.md — GPT focus
- [x] marketing/hackernews-show-hn.md — Bridge + 9 sizes + tokens
- [x] marketing/twitter-launch-thread.md — 9-tweet thread with Bridge lead
- [x] marketing/producthunt.md — Full listing with Bridge product
- [x] marketing/threads-content.md — 4-week content plan with Bridge lead

---

## Launch Plan (Step by Step)

### Step 1: Deploy (today)

Push all changes and verify:
- plexui.com/llms.txt
- plexui.com/llms-full.txt
- plexui.com/blog
- plexui.com/compare/shadcn-ui
- plexui.com/compare/untitled-ui
- plexui.com/bridge
- plexui.com/#pricing

### Step 2: Test Purchase Flow

1. Lemon Squeezy → Test Mode → buy Figma Kit
2. Verify email + file delivery
3. Test Bridge purchase flow
4. Verify "Duplicate to drafts" works

### Step 3: Analytics

- Vercel Analytics already installed
- Enable Lemon Squeezy webhook notifications
- Add plexui.com to Google Search Console → submit sitemap

### Step 4: Visual Assets (you do this)

Record 3 GIF/videos:
- **GIF 1 (15s):** Size scale demo — switch 3xs→3xl in real time
- **GIF 2 (5s):** Dark mode toggle
- **GIF 3 (20s):** Bridge in action — AI creates Figma design

### Step 5: Figma Community File

Publish free file with 4-5 components (Button, Input, Select, SegmentedControl, Badge).
Include "Get the full kit → plexui.com/pricing" page.

---

## Wave 1: Dev Community (Week 1-2)

### Day 1: Reddit AI subs (most receptive to Bridge)

**r/ClaudeAI** — Post from `marketing/reddit-r-claudeai.md`
- Fresh accounts OK here
- Bridge angle: "open alternative to official Claude-Figma"
- First 2 hours: answer EVERY comment

**r/cursor** — Post from `marketing/reddit-r-cursor.md`
- Cursor integration details
- Include .cursor/rules setup

### Day 2: r/reactjs

Post from `marketing/reddit-r-reactjs.md` (Option A or B)
- Most critical sub — technical, no hype
- First 2 hours: answer EVERY comment

### Day 3: Twitter/X Thread

Post from `marketing/twitter-launch-thread.md`
- 9 tweets + follow-ups throughout day
- Pin thread
- Attach GIFs to tweets 2, 4, 8

### Day 4-5: r/webdev + Threads

- r/webdev adaptation from reddit-r-reactjs.md
- Start Threads content plan (Week 1 posts)

---

## Wave 2: Product Hunt (Week 2-3)

From `marketing/producthunt.md`:
1. Create draft listing with all assets
2. Gather 10-20 supporters (ask for "honest feedback", not upvotes)
3. Launch Tuesday/Wednesday 00:01 AM PT
4. Maker comment immediately
5. Share on Twitter + Reddit
6. Respond to every PH comment for 12 hours

---

## Wave 3: Design Community (Week 3-4)

- Figma Community free file
- r/FigmaDesign post
- Dribbble/Behance shots
- Threads designer-focused content

---

## Wave 4: Content Engine (Month 2+)

Blog articles (publish 1/week):
1. "Plex UI vs shadcn/ui — honest comparison" (expand /compare page into blog post)
2. "Three-layer design tokens explained"
3. "From Figma Variables to CSS custom properties"
4. "Building a design system for AI editors"

Twitter cadence:
- Monday: Component spotlight
- Wednesday: Bridge use case / design token tip
- Friday: Community / behind-the-scenes

---

## Metrics

### Week 1-2 Targets
| Metric | Target |
|--------|--------|
| Site visits | 2,000+ |
| npm installs | 100+ |
| GitHub stars | 50+ |
| Sales | 5+ |

### Month 1 Targets
| Metric | Target |
|--------|--------|
| Site visits | 10,000+ |
| npm weekly downloads | 200+ |
| GitHub stars | 200+ |
| Revenue | $500–1,500 |
