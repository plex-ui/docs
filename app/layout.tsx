import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PlexThemeSync } from '@/components/PlexThemeSync';
import './globals.css';

export const metadata: Metadata = {
  title: 'Plex UI',
  description: 'Design system for building high quality applications',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
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
      </body>
    </html>
  );
}
