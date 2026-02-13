'use client';

import { Hero } from './_components/Hero';
import { PricingSection } from './_components/PricingSection';
import { RevealOnScroll } from './_components/RevealOnScroll';
import { ValueProps } from './_components/ValueProps';
import { SizingSection } from './_components/SizingSection';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <RevealOnScroll>
        <Hero />
        <SizingSection />
        <ValueProps />
        <PricingSection />
      </RevealOnScroll>
    </main>
  );
}
