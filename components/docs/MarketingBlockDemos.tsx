'use client';

import React, { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { Badge } from '@plexui/ui/components/Badge';
import { Avatar } from '@plexui/ui/components/Avatar';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import {
  ArrowRight,
  CheckCircleFilled,
  Sparkles,
  Bolt,
  ShieldCheck,
  Globe,
  Star,
  StarFilled,
} from '@plexui/ui/components/Icon';

// ─── Hero Section ───

export function HeroBlock() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-12 w-full">
      <Badge color="discovery" variant="soft" size="md" pill className="mb-4">
        Now in public beta
      </Badge>
      <h1 className="heading-3xl mb-3 max-w-[560px]">
        Build beautiful apps at lightning speed
      </h1>
      <p className="text-lg text-secondary max-w-[480px] mb-8">
        Production-grade components, pixel-perfect Figma parity, and a design system
        trusted by hundreds of millions of users.
      </p>
      <div className="flex items-center gap-3">
        <Button color="primary" size="xl" pill>
          Get started <ArrowRight />
        </Button>
        <Button variant="outline" size="xl" pill>
          View components
        </Button>
      </div>
      <div className="flex items-center gap-4 mt-8 text-sm text-tertiary">
        <span className="flex items-center gap-1.5"><CheckCircleFilled className="fill-[var(--color-text-success)]" /> Free tier available</span>
        <span className="flex items-center gap-1.5"><CheckCircleFilled className="fill-[var(--color-text-success)]" /> MIT licensed</span>
        <span className="flex items-center gap-1.5"><CheckCircleFilled className="fill-[var(--color-text-success)]" /> Figma + React</span>
      </div>
    </div>
  );
}

// ─── Feature Grid ───

const features = [
  {
    Icon: Sparkles,
    title: '9-step size scale',
    description: 'From 22px compact controls to 48px hero CTAs. One size prop, consistent across all components.',
  },
  {
    Icon: ShieldCheck,
    title: 'Battle-tested',
    description: 'Based on the design system behind ChatGPT — validated at massive scale with hundreds of millions of users.',
  },
  {
    Icon: Bolt,
    title: 'Radix + Tailwind 4',
    description: 'Accessible primitives, modern CSS, zero legacy baggage. Built for React 18/19.',
  },
  {
    Icon: Globe,
    title: 'Figma parity',
    description: 'Every size, variant, and token exists identically in both Figma and code. No translation gaps.',
  },
];

export function FeatureGridBlock() {
  return (
    <div className="w-full px-6 py-10">
      <div className="text-center mb-8">
        <h2 className="heading-xl mb-2">Why teams choose Plex UI</h2>
        <p className="text-base text-secondary max-w-[400px] mx-auto">
          A component library designed for real products, not demos.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 max-w-[560px] mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 p-4 rounded-xl bg-alpha/3"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--color-bg-primary-soft)] flex items-center justify-center">
              <f.Icon className="fill-[var(--color-text-primary)]" width={18} height={18} />
            </div>
            <h3 className="text-sm font-semibold">{f.title}</h3>
            <p className="text-xs text-secondary leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pricing Card ───

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Open-source React components for everyone.',
    features: ['35+ components', '467 icons', 'MIT license', 'npm package', 'Community support'],
    cta: 'Get started',
    variant: 'outline' as const,
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: 'one-time',
    description: 'Full Figma kit with all components and variants.',
    features: ['Everything in Free', 'Figma file', 'All 9 size variants', 'Dark mode variables', 'Figma variables', 'Priority support'],
    cta: 'Buy Pro',
    variant: 'solid' as const,
    highlighted: true,
  },
  {
    name: 'Bundle',
    price: '$349',
    period: 'one-time',
    description: 'Figma + React source + blocks and templates.',
    features: ['Everything in Pro', 'React source code', 'Application blocks', 'Marketing blocks', 'Page templates', 'Lifetime updates'],
    cta: 'Buy Bundle',
    variant: 'outline' as const,
    highlighted: false,
  },
];

export function PricingBlock() {
  const [billing, setBilling] = useState<'personal' | 'team'>('personal');

  return (
    <div className="w-full px-6 py-10">
      <div className="text-center mb-6">
        <h2 className="heading-xl mb-2">Simple pricing</h2>
        <p className="text-base text-secondary mb-4">One-time payment. Lifetime updates.</p>
        <SegmentedControl<'personal' | 'team'>
          value={billing}
          onChange={setBilling}
          aria-label="Billing type"
          size="sm"
        >
          <SegmentedControl.Option value="personal">Personal</SegmentedControl.Option>
          <SegmentedControl.Option value="team">Team</SegmentedControl.Option>
        </SegmentedControl>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-[720px] mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col p-5 rounded-xl border ${
              plan.highlighted
                ? 'border-[var(--color-border-primary)] bg-[var(--color-bg-primary-soft)]/30'
                : 'border-alpha/10'
            }`}
          >
            {plan.highlighted && (
              <Badge color="primary" variant="solid" size="sm" pill className="self-start mb-3">
                Most popular
              </Badge>
            )}
            <h3 className="text-base font-semibold">{plan.name}</h3>
            <div className="mt-1 mb-2">
              <span className="heading-lg">{billing === 'team' && plan.price !== '$0' ? (plan.price === '$149' ? '$349' : '$749') : plan.price}</span>
              <span className="text-sm text-tertiary ml-1">/ {plan.period}</span>
            </div>
            <p className="text-xs text-secondary mb-4">{plan.description}</p>
            <ul className="flex flex-col gap-1.5 mb-5 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2 text-xs">
                  <CheckCircleFilled className="fill-[var(--color-text-success)] flex-shrink-0 mt-0.5" width={14} height={14} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <Button
              color="primary"
              variant={plan.variant}
              size="md"
              block
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Newsletter / CTA ───

export function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-[480px] mx-auto text-center">
        <h2 className="heading-lg mb-2">Stay in the loop</h2>
        <p className="text-base text-secondary mb-6">
          Get notified when we ship new components, blocks, and Figma updates.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 py-3 text-[var(--color-text-success)]">
            <CheckCircleFilled />
            <span className="text-sm font-medium">You're on the list!</span>
          </div>
        ) : (
          <div className="flex gap-2 max-w-[400px] mx-auto">
            <Input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="xl"
              pill
              type="email"
              className="flex-1"
            />
            <Button
              color="primary"
              size="xl"
              pill
              onClick={() => setSubmitted(true)}
            >
              Subscribe
            </Button>
          </div>
        )}
        <p className="text-xs text-tertiary mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

// ─── Testimonial / Social Proof ───

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Lead Designer at Vercel',
    quote: 'The 9-size scale changed how we think about component density. No more custom CSS for compact views.',
    rating: 5,
  },
  {
    name: 'Maria Santos',
    role: 'Frontend Lead at Linear',
    quote: 'Figma-to-code parity is real here. Our designers hand off specs and everything just matches.',
    rating: 5,
  },
  {
    name: 'Jordan Kim',
    role: 'Solo Founder',
    quote: 'Shipped my SaaS landing page and dashboard in one weekend. Same components, just different sizes.',
    rating: 5,
  },
];

export function TestimonialBlock() {
  return (
    <div className="w-full px-6 py-10">
      <div className="text-center mb-8">
        <h2 className="heading-xl mb-2">Loved by builders</h2>
        <p className="text-base text-secondary">See what teams are saying about Plex UI.</p>
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-[720px] mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col p-4 rounded-xl border border-alpha/10"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <StarFilled
                  key={i}
                  className="fill-[var(--color-text-warning)]"
                  width={14}
                  height={14}
                />
              ))}
            </div>
            <p className="text-sm text-secondary leading-relaxed flex-1 mb-4">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-2">
              <Avatar name={t.name} size={28} color="secondary" variant="soft" />
              <div>
                <div className="text-xs font-medium">{t.name}</div>
                <div className="text-[10px] text-tertiary">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
