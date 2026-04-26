'use client';

import { ComponentShowcase } from './_components/ComponentShowcase';
import { Hero } from './_components/Hero';
import { HomeJsonLd } from './HomeJsonLd';

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HomeJsonLd />
      <Hero />
      <ComponentShowcase />
    </main>
  );
}
