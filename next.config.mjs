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
      // /docs/components/* and /docs/icons/* moved out of /docs to be
      // top-level peers of /docs, /bridge, /blog (matches the top-nav
      // structure where Components / Icons are siblings of Docs).
      // Catch-alls so every old bookmark, search-engine index, and
      // external link continues to resolve.
      {
        source: '/docs/components/:path*',
        destination: '/components/:path*',
        permanent: true,
      },
      {
        source: '/docs/icons/:path*',
        destination: '/icons/:path*',
        permanent: true,
      },
      // Old Modal page (long-defunct) → components index.
      {
        source: '/components/modal',
        destination: '/components',
        permanent: true,
      },
      // /docs/foundations/icons (old Plex icons gallery) → /icons/plex
      // (single source of truth in the new Icons section).
      {
        source: '/docs/foundations/icons',
        destination: '/icons/plex',
        permanent: true,
      },
      // Phosphor + Remix icon libraries dropped in the 2026-04-26
      // overhaul (viewBox / corner-radius mismatches with the rest of
      // the set). The catch-all above already redirects
      // /docs/icons/{phosphor,remix} → /icons/{phosphor,remix}, but
      // those slug pages don't exist now — these redirects send them
      // on to the gallery index.
      {
        source: '/icons/phosphor',
        destination: '/icons',
        permanent: true,
      },
      {
        source: '/icons/remix',
        destination: '/icons',
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
