'use client';

import { useEffect } from 'react';
import { ButtonLink } from '@plexui/ui/components/Button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { LandingSection, SectionHeading } from './LandingSection';

/* ------------------------------------------------------------------ */
/*  Lemonsqueezy embed script                                          */
/* ------------------------------------------------------------------ */

function useLemonSqueezy() {
  useEffect(() => {
    if (document.getElementById('lemonsqueezy-js')) return;
    const script = document.createElement('script');
    script.id = 'lemonsqueezy-js';
    script.src = 'https://assets.lemonsqueezy.com/lemon.js';
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  /* Lock body scroll while the Lemon Squeezy overlay is open */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isOpen = document.body.classList.contains('lemonsqueezy-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => {
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sharedFeatures = [
  '22,000+ Figma variants',
  '15,700+ component variants',
  '6,600+ icons (custom + Tabler)',
  'Three-layer token system (primitive \u2192 semantic \u2192 component)',
  'All tokens as Figma Variables',
  'Dark & light themes via variables',
  'Auto-layout & responsive constraints',
  'Lifetime updates',
];

interface Tier {
  name: string;
  price: number;
  regularPrice: number;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Personal',
    price: 49,
    regularPrice: 79,
    description: '1 designer, 1 project',
    features: [...sharedFeatures],
    cta: 'Get Personal',
    href: 'https://plexui.lemonsqueezy.com/checkout/buy/073c8848-4cbd-43cc-b09d-78b85171a489',
  },
  {
    name: 'Team',
    price: 149,
    regularPrice: 249,
    description: 'Up to 5 designers, unlimited projects',
    features: [...sharedFeatures, 'Priority support'],
    cta: 'Get Team',
    href: 'https://plexui.lemonsqueezy.com/checkout/buy/1384af62-7adc-401c-afae-d199229b21e1',
    highlighted: true,
  },
  {
    name: 'Unlimited',
    price: 299,
    regularPrice: 499,
    description: 'Unlimited designers & projects',
    features: [...sharedFeatures, 'Priority support', 'White-label OK'],
    cta: 'Get Unlimited',
    href: 'https://plexui.lemonsqueezy.com/checkout/buy/73b78ea2-3111-4d9d-8ceb-5b04106cf58e',
  },
];

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function PricingCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 ${
        tier.highlighted
          ? 'border-fd-foreground'
          : 'border-fd-border'
      }`}
    >
      {/* "Most popular" badge */}
      {tier.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-fd-foreground px-3 py-0.5 text-xs font-medium text-fd-background">
          Most popular
        </span>
      )}

      {/* Tier name + launch badge */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fd-foreground">
          {tier.name}
        </h3>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          Launch price
        </span>
      </div>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight text-fd-foreground">
          ${tier.price}
        </span>
        <span className="text-lg text-fd-muted-foreground/50 line-through">
          ${tier.regularPrice}
        </span>
        <span className="text-sm text-fd-muted-foreground">one-time</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-fd-muted-foreground">
        {tier.description}
      </p>

      {/* CTA — lemonsqueezy-button triggers overlay checkout */}
      <div className="mt-5">
        <ButtonLink
          as="a"
          href={tier.href}
          color={tier.highlighted ? 'primary' : 'secondary'}
          variant={tier.highlighted ? 'solid' : 'outline'}
          size="md"
          pill={false}
          block
          className="lemonsqueezy-button"
          external={false}
        >
          {tier.cta}
        </ButtonLink>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-fd-border" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-fd-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-fd-muted-foreground" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function PricingSection() {
  useLemonSqueezy();

  return (
    <LandingSection id="pricing" data-reveal>
      <SectionHeading
        description="22,000+ production-ready variants, a three-layer token system, and full Figma Variables from day one. Pay once, get lifetime updates."
      >
        Get the Figma Design System
      </SectionHeading>

      <div className="mb-8 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 text-center text-sm text-fd-muted-foreground">
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          The React library is free and open-source.
        </span>
        {' '}These plans are for the Figma design system only.
      </div>

      {/* Pricing cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-6 text-center text-xs text-fd-muted-foreground">
        Delivered as a Figma file. Duplicate to your workspace and start designing.
        The React library (@plexui/ui) is always free on npm. Compare{' '}
        <Link href="/compare/shadcn-ui" className="underline underline-offset-2 hover:text-fd-foreground">
          Plex UI vs shadcn/ui
        </Link>{' '}
        and{' '}
        <Link href="/compare/untitled-ui" className="underline underline-offset-2 hover:text-fd-foreground">
          Plex UI vs Untitled UI
        </Link>
        .
      </p>
    </LandingSection>
  );
}
