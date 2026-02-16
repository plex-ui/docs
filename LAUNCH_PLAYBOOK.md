# Plex UI — Launch Playbook

> Lemon Squeezy approved. Time to sell.
> Product: Figma Design System ($49 / $149 / $299 one-time)
> Free tier: React library @plexui/ui on npm (MIT)

---

## Messaging Framework

### Core Positioning (one sentence)

**"The design system that works in Figma and in your AI editor."**

### Elevator Pitch (30 seconds)

Plex UI is a production-grade Figma + React design system. 22,000 Figma variants, 35 React components, a three-layer token system, and a 9-step size scale that goes from compact data dashboards to spacious marketing pages — all from one `size` prop. The React library is free. The Figma kit starts at $49.

### Key Messages (use across all channels)

| Message | Target | Use When |
|---------|--------|----------|
| "9 sizes, not 4" | Developers + designers | Comparison with shadcn/competitors |
| "AI without a design system is just fancy copy-paste" | AI/dev audience | Twitter, Reddit, HN |
| "Your Figma file is the source of truth" | Design-heavy teams | Figma community, Dribbble |
| "Same tokens in Figma and in React" | Full-stack teams | Dev blogs, comparison articles |
| "Free React library, paid Figma kit" | Price-sensitive devs | Any pricing discussion |

### Objection Handling

| Objection | Response |
|-----------|----------|
| "shadcn is free" | "shadcn is great for unstyled primitives. Plex UI gives you a complete system — 9 sizes, Figma parity, design tokens. The React library is also free. The Figma kit is what you pay for." |
| "$49 is expensive for a Figma file" | "It's 22,000 variants, three-layer tokens as Figma Variables, 6,600 icons, and lifetime updates. Building this from scratch takes months." |
| "I don't use Figma" | "The React library is completely free on npm. Use it without Figma — the components work standalone with all 9 sizes and dark mode." |
| "Why not just use Tailwind UI?" | "Tailwind UI is templates and layouts. Plex UI is a complete design system — Figma-to-code parity, semantic token layers, and a unified size scale. Different tools for different problems." |

---

## Phase 0: Pre-Launch Checklist (Do This Week)

### Technical Prep
- [ ] Verify all 3 Lemon Squeezy checkout links work (test mode)
- [ ] Verify Figma file is ready for delivery (downloadable after purchase)
- [ ] Test purchase flow end-to-end: buy → receive → duplicate to Figma
- [ ] Check Open Graph images on all key pages (plexui.com, /pricing, /docs/components)
- [ ] Verify sitemap.xml is generated and submitted to Google Search Console
- [ ] Set up Google Analytics / Plausible / PostHog for conversion tracking
- [ ] Verify Lemon Squeezy email notifications are enabled (Settings → Email)

### Asset Prep
- [ ] Create 3-5 short demo GIFs (see "Visual Assets" below)
- [ ] Prepare Product Hunt assets (logo 240x240, gallery images 1270x760)
- [ ] Write all launch posts (see "Launch Content" section)
- [ ] Prepare a free Figma community file (subset: 3-5 components, demonstrates the system)

### Visual Assets to Create

| Asset | Format | Shows | Used On |
|-------|--------|-------|---------|
| Size scale demo | GIF/video (15s) | Slider changing all 9 sizes in real-time | PH, Twitter, Reddit |
| Figma-to-code | GIF/video (20s) | Same component in Figma → same in React | PH, Twitter |
| Dark mode toggle | GIF/video (5s) | One click switches the whole system | Twitter, landing page |
| Before/after AI | Side-by-side image | AI code without system vs with Plex UI | HN, Reddit, blog |
| Component grid | Static image | Overview of all 35 components | PH gallery, README |

---

## Phase 1: Soft Launch — Developer Community (Week 1-2)

### Day 1: Reddit + Hacker News

**Order matters: Reddit first (morning), HN (afternoon)**

**Reddit (r/reactjs):**
- Post the developer-focused story (see Launch Content below)
- Tone: honest, technical, no hype. r/reactjs hates promotional posts
- Engage with EVERY comment in first 2 hours
- Do NOT cross-post to r/webdev same day (looks spammy). Wait 2-3 days

**Hacker News (Show HN):**
- Post the technical deep-dive angle
- First comment: author context (what, why, technical decisions)
- Respond to every comment, especially critical ones
- Best posting time: Tuesday-Thursday, 8-10am ET

### Day 2-3: Twitter/X Thread

- Post the main launch thread (see Launch Content below)
- Pin the thread
- Reply with individual GIFs throughout the day
- Tag relevant accounts (Tailwind, Radix, Figma — don't spam, be genuine)

### Day 4-5: Dev.to / Hashnode Article

- Publish the long-form "AI needs a design system" article
- Cross-link to docs and pricing
- Include actual code examples

### Week 2: Follow-up Content

- Post "Component of the week" on Twitter (start a series)
- Share comparison GIFs (Plex UI vs shadcn size scale)
- Engage in relevant Twitter discussions about design systems

---

## Phase 2: Product Hunt Launch (Week 2-3)

### Pre-launch
- [ ] Schedule launch for Tuesday or Wednesday (best PH days)
- [ ] Prepare gallery: 5 images showing key features
- [ ] Write maker comment (see Launch Content)
- [ ] Line up 10-20 people who will upvote + leave genuine comments on launch day
- [ ] Prepare answers for common PH questions

### Launch Day
- Launch at 12:01 AM PT (Product Hunt resets at midnight PT)
- Post maker comment immediately
- Share on Twitter, Discord, personal networks
- Respond to every PH comment within 30 min
- Share progress updates throughout the day ("We hit #5 on PH today!")

### PH Listing Details

**Tagline (60 chars max):**
`The Figma + React design system with 9 sizes, not 4`

**Description (see Launch Content section for full text)**

**Topics:** Design Tools, Figma, React, Developer Tools, Open Source

---

## Phase 3: Design Community (Week 3-4)

### Figma Community
- [ ] Publish free community file with 3-5 components (subset of the full kit)
- [ ] Description links to full paid kit
- [ ] Include Variables setup so designers see the token system in action
- [ ] Add "Get the full kit" CTA in the file itself (on a dedicated page)

### Dribbble / Behance
- [ ] Post 3-4 shots showing the system in use (dashboard, landing page, settings page)
- [ ] Link to plexui.com in descriptions
- [ ] Use tags: design system, figma, ui kit, component library

### Design Twitter
- [ ] Thread targeting designers: "How I organized 22,000 Figma variants"
- [ ] Share the Figma Variables architecture visually
- [ ] Tag Figma official account (they sometimes repost interesting community files)

---

## Phase 4: SEO & Content Engine (Month 2+)

### Priority SEO Pages

| Page | Target Keywords | Type |
|------|----------------|------|
| `/compare/shadcn-ui` | "plex ui vs shadcn", "shadcn alternative" | Comparison |
| `/compare/untitled-ui` | "untitled ui alternative", "figma design system" | Comparison |
| `/blog/why-9-sizes` | "design system sizes", "button size scale" | Educational |
| `/blog/ai-design-system` | "ai code editor design system", "claude ui components" | Educational |
| `/blog/design-tokens-explained` | "design tokens css", "three layer tokens" | Educational |

### Content Calendar (Month 2-3)

| Week | Content | Channel |
|------|---------|---------|
| W5 | "Why 9 button sizes matter for product design" | Blog + Twitter |
| W6 | "Plex UI vs shadcn/ui: honest comparison" | Blog (SEO) |
| W7 | "Three-layer design tokens explained" | Blog + Dev.to |
| W8 | "Building a design system for AI editors" | Blog + HN |
| W9 | "From Figma Variables to CSS custom properties" | Blog + Twitter |
| W10 | "Plex UI vs Untitled UI comparison" | Blog (SEO) |
| W11 | "The hidden cost of 3-size button systems" | Blog + Twitter |
| W12 | Case study: "How [project] uses Plex UI" | Blog + Twitter |

### Ongoing Twitter Cadence

- **Monday:** Component spotlight (GIF + code snippet)
- **Wednesday:** Design token tip or Figma trick
- **Friday:** Community feature or user showcase

---

## Metrics to Track

### Week 1-2 Targets

| Metric | Target | Tool |
|--------|--------|------|
| Site visits | 2,000+ | Analytics |
| Docs page views | 500+ | Analytics |
| npm installs | 100+ | npm stats |
| GitHub stars | 50+ | GitHub |
| Lemon Squeezy revenue | 5+ sales | Lemon Squeezy |
| Email list signups | 100+ | Email tool |

### Month 1 Targets

| Metric | Target |
|--------|--------|
| Site visits | 10,000+ |
| npm weekly downloads | 200+ |
| GitHub stars | 200+ |
| Revenue | $500-1,500 |
| Figma community file duplicates | 100+ |

### What to Optimize Based on Data

| Signal | Action |
|--------|--------|
| High traffic, low sales | Pricing page needs work. Test lower price or better value messaging |
| Low traffic, high conversion | Distribution problem. Double down on content + communities |
| High bounce on landing | Hero or value props aren't landing. A/B test messaging |
| Traffic from comparison searches | SEO is working. Create more comparison content |
| Traffic from AI-related searches | Double down on "AI + design system" messaging |

---

## Pricing Psychology Notes

### Current Pricing: $49 / $149 / $299

**What works:**
- "Launch price" badge creates urgency
- "One-time" payment removes subscription anxiety
- Free React library lowers barrier — people try it, then buy Figma kit
- Three tiers with "Most popular" on middle tier (classic decoy pricing)

**Consider testing:**
- Strikethrough "regular" price (e.g., ~~$99~~ $49) to anchor higher value
- Limited-time launch offer: first 100 purchases at launch price, then increase
- Annual "price lock" promise: "Buy now, this price is locked forever"

**Avoid:**
- Discounts > 50% (devalues the product)
- Free trials of the Figma kit (hard to revoke access)
- Complicated licensing tiers

---

## Distribution Channels Ranked by ROI

| Channel | Effort | Expected ROI | Timeline |
|---------|--------|-------------|----------|
| Reddit (r/reactjs) | Low | High (if post lands) | Immediate |
| Twitter/X threads | Medium | Medium-High | Week 1 |
| Hacker News | Low | High (if it hits front page) | Immediate |
| Product Hunt | High | Medium-High | Week 2-3 |
| Figma Community | Medium | High (passive, long-term) | Week 3 |
| SEO comparison pages | Medium | High (long-term) | Month 2+ |
| Blog articles | High | Medium (long-term) | Month 2+ |
| Dev.to / Hashnode | Low | Low-Medium | Week 1-2 |
| YouTube tutorials | High | Medium (long-term) | Month 2+ |
| Paid ads (Google/Twitter) | High cost | Low-Medium | Only after organic validation |
