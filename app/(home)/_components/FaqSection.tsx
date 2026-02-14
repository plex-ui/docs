'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LandingSection } from './LandingSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: 'What format is the Figma Kit?',
    answer:
      'It\'s a native Figma file. After purchase you\'ll receive a link. Click "Duplicate to your drafts" and the full file with all pages, components, variables, and tokens will be copied to your Figma workspace.',
  },
  {
    question: 'How do I receive updates?',
    answer:
      'All plans include lifetime updates. When we release a new version we\'ll notify you by email. Open the same link again and duplicate the updated file. Your existing local copy stays untouched.',
  },
  {
    question: 'Can I use it in commercial projects?',
    answer:
      'Yes. All plans allow you to use the design system in commercial products. The Unlimited plan also permits white-labeling, so you can remove Plex UI branding and redistribute the system as part of your own product or agency deliverables.',
  },
  {
    question: 'What\'s the difference between Personal, Team, and Unlimited?',
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
    question: 'Why is Plex UI ideal for AI code editors like Claude, Cursor, and Codex?',
    answer:
      'AI code editors can write code, but they need proper building blocks to produce professional interfaces. Plex UI provides production-grade, well-structured components with consistent naming, a clear token system, and comprehensive props. Unlike unstyled primitives or limited kits like shadcn, Plex UI gives AI the full vocabulary to design real products.',
  },
];

/* ------------------------------------------------------------------ */
/*  Accordion item                                                     */
/* ------------------------------------------------------------------ */

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-fd-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-fd-foreground transition-colors hover:text-fd-foreground/80"
      >
        {question}
        <ChevronDown
          className={`size-5 shrink-0 text-fd-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-fd-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function FaqSection() {
  return (
    <LandingSection id="faq" maxWidth="2xl" data-reveal>
      <h2 className="text-center text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-10 border-t border-fd-border">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </LandingSection>
  );
}
