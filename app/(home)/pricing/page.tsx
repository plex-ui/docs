import type { Metadata } from 'next';
import { RevealOnScroll } from '../_components/RevealOnScroll';
import { PricingSection } from '../_components/PricingSection';
import { FaqSection } from '../_components/FaqSection';
import { CtaBanner } from '../_components/CtaBanner';
import { PricingJsonLd } from './PricingJsonLd';

export const metadata: Metadata = {
  title: 'Pricing — Plex UI Figma Design System',
  description:
    'Get the Plex UI Figma design system. 22,000+ variants, three-layer token system, lifetime updates. Plans from $49.',
  openGraph: {
    title: 'Pricing — Plex UI Figma Design System',
    description:
      'Get the Plex UI Figma design system. 22,000+ variants, three-layer token system, lifetime updates. Plans from $49.',
    url: 'https://plexui.com/pricing',
  },
  twitter: {
    title: 'Pricing — Plex UI Figma Design System',
    description:
      'Get the Plex UI Figma design system. 22,000+ variants, three-layer token system, lifetime updates. Plans from $49.',
  },
  alternates: {
    canonical: 'https://plexui.com/pricing',
  },
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PricingJsonLd />
      <RevealOnScroll>
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </RevealOnScroll>
    </main>
  );
}
