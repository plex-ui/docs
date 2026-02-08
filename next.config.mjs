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
    ];
  },
};

const withMDX = createMDX();
export default withMDX(config);
