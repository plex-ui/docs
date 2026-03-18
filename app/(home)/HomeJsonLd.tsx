const faqs = [
  {
    question: 'What format is the Figma Kit?',
    answer:
      "It's a native Figma file. After purchase you'll receive a link. Click \"Duplicate to your drafts\" and the full file with all pages, components, variables, and tokens will be copied to your Figma workspace.",
  },
  {
    question: 'How do I receive updates?',
    answer:
      "All plans include lifetime updates. When we release a new version we'll notify you by email. Open the same link again and duplicate the updated file. Your existing local copy stays untouched.",
  },
  {
    question: 'Can I use it in commercial projects?',
    answer:
      'Yes. All plans allow you to use the design system in commercial products. The Unlimited plan also permits white-labeling, so you can remove Plex UI branding and redistribute the system as part of your own product or agency deliverables.',
  },
  {
    question: "What's the difference between Personal, Team, and Unlimited?",
    answer:
      'Personal is for solo designers working on a single project. Team supports up to 5 designers on unlimited projects with priority support. Unlimited removes all seat and project restrictions and includes white-label rights.',
  },
  {
    question: 'Does it include the React component library?',
    answer:
      'The React library (@plexui/ui) is open-source and free on npm. The Figma Kit is the paid product. It gives you the full design system with all 22,000+ variants, variables, and tokens that match the React components pixel-for-pixel.',
  },
  {
    question: 'Do I need the Figma kit to use the React components?',
    answer:
      'No. The React library (@plexui/ui) is free and open-source. Install it from npm and start building. The Figma kit is a separate paid product for designers who want the full visual system with all 22,000+ variants, variables, and token layers.',
  },
  {
    question: 'How do I set up Plex UI for Claude, Cursor, or Codex?',
    answer:
      'Install @plexui/ui from npm and add the CSS import to your global stylesheet. The AI will recognize component names and props automatically. See the installation guide for the full setup.',
  },
  {
    question: 'What does "three-layer token system" mean?',
    answer:
      'Every value in the kit flows through three layers: primitive tokens (raw colors, spacing, radii), semantic tokens (purpose-based aliases like "text-primary" or "bg-surface"), and component tokens (scoped to each component like "button-bg-solid"). Change one variable and the entire system updates.',
  },
  {
    question:
      'Why is Plex UI ideal for AI code editors like Claude, Cursor, and Codex?',
    answer:
      'AI code editors can write code, but they need proper building blocks to produce professional interfaces. Plex UI provides production-grade, well-structured components with consistent naming, a clear token system, and comprehensive props. Unlike unstyled primitives or limited kits like shadcn, Plex UI gives AI the full vocabulary to design real products.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  );
}
