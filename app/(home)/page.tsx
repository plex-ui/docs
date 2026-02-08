'use client';

import { Hero } from './_components/Hero';
import { RevealOnScroll } from './_components/RevealOnScroll';
import { ValueProps } from './_components/ValueProps';
import { Why9SizesSection } from './_components/Why9SizesSection';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <RevealOnScroll>
        <Hero />
        <Why9SizesSection />
        <ValueProps />
      </RevealOnScroll>
    </main>
  );
}
