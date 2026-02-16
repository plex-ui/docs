const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Plex UI — Figma Design System',
  description:
    '22,000+ Figma variants built on Figma Variables. Three-layer token system, 35 components, 6,600+ icons. Built for AI-driven workflows.',
  url: 'https://plexui.com/pricing',
  brand: {
    '@type': 'Brand',
    name: 'Plex UI',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Personal',
      description: '1 designer, 1 project',
      price: '49',
      priceCurrency: 'USD',
      url: 'https://plexui.com/pricing',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Team',
      description: 'Up to 5 designers, unlimited projects',
      price: '149',
      priceCurrency: 'USD',
      url: 'https://plexui.com/pricing',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Unlimited',
      description: 'Unlimited designers & projects',
      price: '299',
      priceCurrency: 'USD',
      url: 'https://plexui.com/pricing',
      availability: 'https://schema.org/InStock',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What format is the Figma Kit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It's a native Figma file. After purchase you'll receive a link. Click \"Duplicate to your drafts\" and the full file will be copied to your Figma workspace.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I receive updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "All plans include lifetime updates. When we release a new version we'll notify you by email. Open the same link again and duplicate the updated file.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use it in commercial projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All plans allow you to use the design system in commercial products. The Unlimited plan also permits white-labeling.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the difference between Personal, Team, and Unlimited?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Personal is for solo designers on a single project. Team supports up to 5 designers on unlimited projects with priority support. Unlimited removes all restrictions and includes white-label rights.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it include the React component library?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The React library (@plexui/ui) is open-source and free on npm. The Figma Kit is the paid product with all 22,000+ variants, variables, and tokens.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need the Figma kit to use the React components?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The React library is free and open-source. Install it from npm and start building. The Figma kit is a separate paid product for designers.',
      },
    },
  ],
};

export function PricingJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
