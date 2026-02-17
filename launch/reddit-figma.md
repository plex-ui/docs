# Reddit: r/FigmaDesign

**Title:** Built a Figma design system with 22,000+ variants using only Figma Variables

**Body:**

I just released Plex UI, a Figma design system that's built entirely on Figma Variables. Thought this community might appreciate the technical approach.

**The setup:**
- 22,000+ component variants
- 35 components, 9 sizes each
- Three-layer token architecture (primitive → semantic → component)
- All tokens are Figma Variables (no hard-coded values)
- 6,600+ icons

**Why Figma Variables for everything:**
Most design systems use a mix of variables and hard-coded values. This breaks down when you need to theme or scale. I built every single token as a Figma Variable. Colors, spacing, typography, shadows, everything. Theme switching is just changing variable modes.

**The three-layer token system:**
1. Primitive tokens: raw values (gray.100, spacing.4)
2. Semantic tokens: contextual meaning (background.primary, spacing.component.gap)
3. Component tokens: applied to UI (button.background, input.padding)

Change a semantic token, every component updates.

**Figma ↔ Code parity:**
There's a free React library (MIT on npm) that matches the Figma file exactly. Same components, same tokens, same variants. Design in Figma, build in React, it just works.

The Figma Kit is paid ($49-$299). Check it out at plexui.com.

Would love to hear thoughts from other designers who've built token systems.
