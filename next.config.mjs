import { createMDX } from 'fumadocs-mdx/next';

const LEGACY_HOOK_PAGES = [
  'use-animated-scroll-to',
  'use-auto-grow-textarea',
  'use-breakpoints',
  'use-characters-per-second',
  'use-document-visible',
  'use-esc-close-stack',
  'use-is-mounted',
  'use-latest-value',
  'use-previous',
  'use-scrollable',
  'use-simulated-progress',
  'use-stable-callback',
  'use-text-selection',
  'use-trailing-value',
];

// /docs/overview/* was flattened into /docs/* (shadcn-style sidebar).
// Each former overview sub-page now lives at the docs root.
const OVERVIEW_FLATTENED_PAGES = [
  ['installation', 'installation'],
  ['skills', 'skills'],
  ['ai-setup', 'ai-setup'],
  ['mcp', 'mcp'],
  ['shadcn-registry', 'registry'],
  ['changelog', 'changelog'],
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/components/modal',
        destination: '/docs/components',
        permanent: true,
      },
      // /docs/foundations/icons (old Plex icons gallery) → /docs/icons/plex
      // (single source of truth in the new Icons section).
      {
        source: '/docs/foundations/icons',
        destination: '/docs/icons/plex',
        permanent: true,
      },
      {
        source: '/docs/overview/sizing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/overview/comparison',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/overview/why-9-sizes',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/overview/blocks',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/overview/templates',
        destination: '/',
        permanent: true,
      },
      ...LEGACY_HOOK_PAGES.map((slug) => ({
        source: `/docs/hooks/${slug}`,
        destination: '/docs/hooks',
        permanent: true,
      })),
      // /docs/overview index → /docs (Introduction)
      {
        source: '/docs/overview',
        destination: '/docs',
        permanent: true,
      },
      // /docs/overview/* sub-pages → flat /docs/* counterparts
      ...OVERVIEW_FLATTENED_PAGES.map(([oldSlug, newSlug]) => ({
        source: `/docs/overview/${oldSlug}`,
        destination: `/docs/${newSlug}`,
        permanent: true,
      })),
    ];
  },
};

const withMDX = createMDX();
export default withMDX(config);
