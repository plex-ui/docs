'use client';

import { useTheme } from 'next-themes';
import { useEffect, type ReactNode } from 'react';

/**
 * Syncs next-themes resolved theme to html[data-theme] so Plex UI tokens
 * (:where([data-theme]) and light-dark()) apply inside previews.
 * RootProvider uses attribute="class", so we must set data-theme ourselves.
 */
export function PlexThemeSync({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    const value = resolvedTheme === 'dark' ? 'dark' : 'light';
    html.setAttribute('data-theme', value);
  }, [resolvedTheme]);

  return <>{children}</>;
}
