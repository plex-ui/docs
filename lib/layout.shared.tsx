import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Plex UI',
      url: '/',
      transparentMode: 'top',
    },
    links: [{ text: 'Docs', url: '/docs', active: 'nested-url' }],
    githubUrl: 'https://github.com/plex-ui/ui',
  };
}
