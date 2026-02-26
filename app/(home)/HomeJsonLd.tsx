const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Plex UI',
  url: 'https://plexui.com',
  description:
    'Figma & React Design System with 22,000+ variants, three-layer token system, and 9-step control sizing. Built for Claude, Cursor, Codex & AI-driven workflows.',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Plex UI',
  url: 'https://plexui.com',
  logo: 'https://plexui.com/favicon.svg',
  description:
    'Figma & React Design System built for AI code editors. 35 components, 6,600+ icons, three-layer token system.',
};

export function HomeJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}
