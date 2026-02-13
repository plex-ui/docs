# Lemonsqueezy Product Setup — Copy-Paste Guide

> Follow these steps in app.lemonsqueezy.com.
> After setup, paste the 3 checkout URLs back into PricingSection.tsx

---

## Step 1: Create Store

- **Store name:** `Plex UI`
- **Store slug:** `plexui` → URL will be `plexui.lemonsqueezy.com`
- **Plan:** Fresh (free, 5% + 50¢ per transaction)

---

## Step 2: Create Product

Click **"+" → New Product**

### General

- **Name:** `Plex UI — Figma Design System PRO`
- **Description:** (paste the text below)

```
The same design language that powers ChatGPT. 22,000+ meticulously crafted Figma variants built entirely on Figma Variables and a three-layer design token system.

What's included:
• 15,700+ component variants across 14 components (Button, Select Control, Segmented Control, Input, Badge, Alert, Menu, and more)
• 6,600+ icons — 612 custom icons + 5,986 Tabler icons
• Three-layer token system: primitive → semantic → component — all wired through Figma Variables
• 9-step unified size scale (3xs 22px → 3xl 48px)
• Full dark & light mode via variable modes
• Auto-layout and responsive constraints throughout
• Complete foundations: color system, typography, elevation, spacing, effects

Format: Figma file (duplicate to your workspace)
Updates: Lifetime access to all future versions
```

- **Image:** Upload a screenshot of the Figma Cover page
- **Status:** Draft (publish after testing)

### Pricing

Select **"One-time payment"** then **enable Variants**.

### Variants

Add 3 variants:

| Variant Name | Price | Description |
|-------------|-------|-------------|
| `Personal` | `$49` | `1 designer, 1 project. Lifetime updates.` |
| `Team` | `$149` | `Up to 5 designers, unlimited projects. Priority support. Lifetime updates.` |
| `Unlimited` | `$299` | `Unlimited designers & projects. Priority support. White-label OK. Lifetime updates.` |

### Confirmation (After Purchase)

Set **Redirect URL** or **Custom confirmation page** with this message:

```
Thank you for purchasing Plex UI Figma Kit! 🎉

To get your copy:
1. Open the link below
2. Click the arrow next to the file name → "Duplicate to your drafts"
3. The full file with all components, tokens, and variables will be copied to your Figma workspace

👉 https://www.figma.com/design/9M1kq9omhvaSzTF9AEKSN2/Plex-UI---PRO-v1.0

If you have any questions, reply to the receipt email.
```

---

## Step 3: Get Checkout URLs

After creating the product, go to **Products → Plex UI → Share**.

Each variant will have a unique checkout URL like:
```
https://plexui.lemonsqueezy.com/buy/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Copy all 3 URLs.

---

## Step 4: Update PricingSection.tsx

Replace the `href: '#'` placeholders in the tiers array:

```tsx
// Personal
href: 'https://plexui.lemonsqueezy.com/buy/PERSONAL_ID_HERE',

// Team
href: 'https://plexui.lemonsqueezy.com/buy/TEAM_ID_HERE',

// Unlimited
href: 'https://plexui.lemonsqueezy.com/buy/UNLIMITED_ID_HERE',
```

---

## Step 5: Test

1. Enable **Test mode** (bottom-left toggle in Lemonsqueezy dashboard)
2. Use test card: `4242 4242 4242 4242`, any future expiry, any CVC
3. Verify the confirmation page shows the Figma link
4. Verify you can duplicate the file

---

## Step 6: Go Live

1. Disable Test mode
2. Go to **Settings → General → Activate Store**
3. Lemonsqueezy reviews (usually 1-2 business days)
4. Once approved, real payments are live

---

## Optional: Checkout Overlay (embedded popup)

Instead of redirecting to Lemonsqueezy, you can embed a checkout popup on plexui.com:

Add to `<head>` in layout.tsx:
```html
<script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
```

Then use links with class `lemonsqueezy-button`:
```html
<a href="https://plexui.lemonsqueezy.com/buy/..." class="lemonsqueezy-button">
  Get Personal
</a>
```

This opens a popup checkout without leaving plexui.com.
