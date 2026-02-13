'use client';

import { ComparisonSection } from './_components/ComparisonSection';
import { CtaBanner } from './_components/CtaBanner';
import { FaqSection } from './_components/FaqSection';
import { Hero } from './_components/Hero';
import { PricingSection } from './_components/PricingSection';
import { RevealOnScroll } from './_components/RevealOnScroll';
import { StatsBar } from './_components/StatsBar';
import { ValueProps } from './_components/ValueProps';
import { SizingSection } from './_components/SizingSection';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <RevealOnScroll>
        <Hero />
        <StatsBar />
        <SizingSection />
        <ValueProps />
        <ComparisonSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </RevealOnScroll>
    </main>
  );
}
