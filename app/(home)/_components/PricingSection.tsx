'use client';

import { ButtonLink } from '@plexui/ui/components/Button';
import { Check } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sharedFeatures = [
  '22,000+ Figma variants',
  '15,700+ component variants',
  '6,600+ icons (custom + Tabler)',
  'Dark & light themes',
  'Figma Variables & auto-layout',
  'Lifetime updates',
];

interface Tier {
  name: string;
  price: number;
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
    description: '1 designer, 1 project',
    features: [...sharedFeatures],
    cta: 'Get Personal',
    href: '#', // TODO: Lemonsqueezy checkout URL
  },
  {
    name: 'Team',
    price: 149,
    description: 'Up to 5 designers, unlimited projects',
    features: [...sharedFeatures, 'Priority support'],
    cta: 'Get Team',
    href: '#', // TODO: Lemonsqueezy checkout URL
    highlighted: true,
  },
  {
    name: 'Unlimited',
    price: 299,
    description: 'Unlimited designers & projects',
    features: [...sharedFeatures, 'Priority support', 'White-label OK'],
    cta: 'Get Unlimited',
    href: '#', // TODO: Lemonsqueezy checkout URL
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

      {/* Tier name */}
      <h3 className="text-sm font-semibold text-fd-foreground">
        {tier.name}
      </h3>

      {/* Price */}
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-fd-foreground">
          ${tier.price}
        </span>
        <span className="text-sm text-fd-muted-foreground">one-time</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-fd-muted-foreground">
        {tier.description}
      </p>

      {/* CTA */}
      <div className="mt-5">
        <ButtonLink
          href={tier.href}
          color={tier.highlighted ? 'primary' : 'secondary'}
          variant={tier.highlighted ? 'solid' : 'outline'}
          size="md"
          pill={false}
          block
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
  return (
    <section
      data-reveal
      id="pricing"
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
          Get the Figma Design System
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
          22,000+ meticulously crafted variants. The same design language that
          powers ChatGPT. Pay once, get lifetime updates.
        </p>

        {/* Pricing cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center text-xs text-fd-muted-foreground">
          Delivered as a Figma file. Duplicate to your workspace and start designing.
        </p>
      </div>
    </section>
  );
}
