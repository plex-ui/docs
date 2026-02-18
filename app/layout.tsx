import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PlexThemeSync } from '@/components/PlexThemeSync';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plex UI — Figma & React Design System for AI Code Editors',
  description:
    '22,000+ Figma variants built on Figma Variables. Built for Claude, Cursor, Codex & AI-driven workflows. 35 components, 6,600+ icons, three-layer token system.',
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
      '22,000+ Figma variants. Three-layer token system. Built for Claude, Cursor, Codex & AI-driven workflows.',
    url: 'https://plexui.com',
    siteName: 'Plex UI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plex UI — Figma & React Design System for AI Code Editors',
    description:
      '22,000+ Figma variants. Three-layer token system. Built for Claude, Cursor, Codex & AI-driven workflows.',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <PlexThemeSync>
            <div className="flex min-h-screen flex-1 flex-col">{children}</div>
          </PlexThemeSync>
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
