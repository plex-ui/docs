'use client';

import type { CSSProperties } from 'react';
import { Accordion } from '@plexui/ui/components/Accordion';

// Match the homepage FaqSection feel — 16px question, 14px relaxed answer,
// 16px vertical padding — but via the shipped Plex Accordion's design tokens
// so behavior, focus ring, chevron animation, and theme support stay unified.
const faqTokens = {
  '--accordion-trigger-font-size': 'var(--font-text-base-size)',
  '--accordion-trigger-line-height': 'var(--font-text-base-line-height)',
  '--accordion-trigger-padding-block': '1rem',
  '--accordion-content-font-size': 'var(--font-text-base-size)',
  '--accordion-content-line-height': 'var(--font-text-base-line-height)',
  '--accordion-content-padding-bottom': '1rem',
} as CSSProperties;

export function BridgeFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="mt-5" style={faqTokens}>
      {faqs.map((f, i) => (
        <Accordion.Item key={f.q} value={`faq-${i}`}>
          <Accordion.Trigger>{f.q}</Accordion.Trigger>
          <Accordion.Content>{f.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
