import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PlexThemeSync } from '@/components/PlexThemeSync';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plex UI — Figma & React Design System for AI Code Editors',
  description:
    'Production-grade React design system with 35+ components, 9-size scale (3xs–3xl), three-layer design tokens, and 6,600+ icons. Free MIT React library plus 22,000+ Figma variant kit. Figma Bridge lets any AI model design in Figma. Built for Claude, Cursor, Codex.',
  metadataBase: new URL('https://plexui.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Plex UI — Figma & React Design System for AI Code Editors',
    description:
      '35+ React components with 9-size scale, three-layer design tokens, 6,600+ icons, and Figma Bridge for any AI model. Free React library. 22,000+ Figma variants.',
    url: 'https://plexui.com',
    siteName: 'Plex UI',
    type: 'website',
    images: [{ url: '/opengraph-image.png?v=2' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plex UI — Figma & React Design System for AI Code Editors',
    description:
      '35+ React components with 9-size scale, three-layer design tokens, 6,600+ icons, and Figma Bridge for any AI model. Free React library. 22,000+ Figma variants.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://plexui.com/#organization',
      name: 'Plex UI',
      url: 'https://plexui.com',
      logo: 'https://plexui.com/favicon.svg',
      email: 'plexuikit@gmail.com',
      sameAs: [
        'https://github.com/plex-ui/docs',
        'https://www.threads.net/@plexuikit',
        'https://www.npmjs.com/package/@plexui/ui',
        'https://www.figma.com/community/file/1605261673441035444',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://plexui.com/#website',
      url: 'https://plexui.com',
      name: 'Plex UI',
      description:
        'Production-grade Figma & React design system with 35+ components, 9-size scale, three-layer design tokens, 6,600+ icons, and Figma Bridge for any AI model. Free React library, paid Figma kit.',
      publisher: { '@id': 'https://plexui.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://plexui.com/#react-library',
      name: 'Plex UI React Library',
      image: 'https://plexui.com/opengraph-image.png?v=2',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      description:
        'Free, open-source React component library with 35+ components, 9-size scale, three-layer design tokens, and dark mode. Built on Radix UI and Tailwind CSS 4. Designed for AI code editors like Claude, Cursor, and Codex.',
      url: 'https://plexui.com/docs/components',
      downloadUrl: 'https://www.npmjs.com/package/@plexui/ui',
      softwareVersion: '0.7.45',
      author: { '@id': 'https://plexui.com/#organization' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free and open-source (MIT license)',
      },
      featureList: [
        '35+ accessible React components',
        '9-step unified size scale (3xs to 3xl)',
        'Three-layer CSS variable design token system',
        'Dark mode via CSS light-dark()',
        '6,600+ bundled icons',
        '14 React hooks',
        'Built on Radix UI + Tailwind CSS 4',
        'AI code editor ready (Claude, Cursor, Codex)',
      ],
    },
    {
      '@type': 'Product',
      '@id': 'https://plexui.com/#figma-kit',
      name: 'Plex UI Figma Design System',
      image: 'https://plexui.com/opengraph-image.png?v=2',
      description:
        'Professional Figma design system with 22,000+ variants, three-layer token system as Figma Variables, 6,600+ icons, dark & light modes, and lifetime updates.',
      url: 'https://plexui.com/pricing',
      brand: { '@id': 'https://plexui.com/#organization' },
      offers: [
        {
          '@type': 'Offer',
          name: 'Personal',
          price: '49',
          priceCurrency: 'USD',
          description: '1 designer, 1 project, lifetime updates',
        },
        {
          '@type': 'Offer',
          name: 'Team',
          price: '149',
          priceCurrency: 'USD',
          description: 'Up to 5 designers, unlimited projects, priority support',
        },
        {
          '@type': 'Offer',
          name: 'Unlimited',
          price: '299',
          priceCurrency: 'USD',
          description:
            'Unlimited designers & projects, white-label OK, priority support',
        },
      ],
    },
    {
      '@type': 'Product',
      '@id': 'https://plexui.com/#bridge',
      name: 'Plex UI Figma Bridge Plugin',
      image: 'https://plexui.com/opengraph-image.png?v=2',
      description:
        'Local Figma plugin that lets ANY AI model (Claude, GPT, Cursor, Codex, Gemini) create, read, and edit real Figma designs via HTTP API. Model-agnostic alternative to Claude-only Figma integration.',
      url: 'https://plexui.com/bridge',
      brand: { '@id': 'https://plexui.com/#organization' },
      offers: {
        '@type': 'Offer',
        price: '49',
        priceCurrency: 'USD',
        description: 'One-time payment, lifetime license',
      },
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <PlexThemeSync>
            <div className="flex min-h-screen flex-1 flex-col">{children}</div>
          </PlexThemeSync>
        </RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
