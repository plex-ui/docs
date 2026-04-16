import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@plexui/ui/components/Button';
import { CodeBlock } from '@plexui/ui/components/CodeBlock';
import { LandingSection } from '../_components/LandingSection';

const DEFAULT_CHECKOUT_URL =
  'https://plexui.lemonsqueezy.com/checkout/buy/98a4277b-5d30-4807-b0e9-5d7ae3f4f433';

const checkoutUrl = process.env.NEXT_PUBLIC_BRIDGE_CHECKOUT_URL ?? DEFAULT_CHECKOUT_URL;

export const metadata: Metadata = {
  title: 'Figma AI Bridge with Design Tokens — Not Just Pixels',
  description:
    'The only Figma AI bridge that gives your AI actual design token bindings — var(--spacing-xl) instead of 16px. Works with any model. Two-way: create in Figma and read back into code.',
  openGraph: {
    title: 'Figma AI Bridge with Design Tokens — Not Just Pixels',
    description:
      'The only Figma AI bridge that gives your AI actual design token bindings — var(--spacing-xl) instead of 16px. Works with any model. Two-way: create in Figma and read back into code.',
    url: 'https://plexui.com/bridge',
    images: [{ url: '/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Figma AI Bridge with Design Tokens — Not Just Pixels',
    description:
      'The only Figma AI bridge that gives your AI actual design token bindings — var(--spacing-xl) instead of 16px. Works with any model.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://plexui.com/bridge',
  },
};

const modelPrompt = `Figma AI Bridge API: http://localhost:8867
1) GET /status (connected=true)
2) POST /command with {"command":"...","params":{...}}
3) Use params, not args`;

const bridgeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Plex UI Figma AI Bridge',
  image: 'https://plexui.com/opengraph-image.png',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows',
  description:
    'Figma AI plugin with design token support. Standard Figma MCPs return raw hex and pixels — AI Bridge returns actual variable bindings (background/primary/solid, spacing/xl, radius/full). Works with any AI model via local HTTP API. Two-way: create Figma nodes and read token bindings back into code.',
  url: 'https://plexui.com/bridge',
  author: { '@type': 'Organization', name: 'Plex UI', url: 'https://plexui.com' },
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'USD',
    description: 'One-time payment, lifetime license. No subscription.',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Design token bindings — returns variable names (background/primary/solid, spacing/xl) not raw values (#181818, 16px)',
    'Works with ANY AI model — Claude, GPT, Cursor, Codex, Gemini, and more',
    'Two-way flow: AI creates Figma designs AND reads token bindings back into code',
    'Local-first — designs never leave your machine',
    'Model-agnostic HTTP API at localhost:8867',
    'Create frames, text, components, instances, auto-layout',
    'Bind Figma Variables (design tokens) to any property',
    'Read node structure, component props, and variable bindings',
    'Batch operations for performance',
    'Export as PNG/SVG',
  ],
};

const bridgeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is Plex UI AI Bridge different from standard Figma MCPs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard Figma MCPs (including the official read-only one) return raw hex colors (#181818) and pixel values (16px). AI Bridge returns actual design token variable bindings (background/primary/solid, spacing/xl, radius/full) — so AI generates CSS with var() references instead of hardcoded values. AI Bridge also works with any AI model and runs 100% locally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which AI models work with Figma AI Bridge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any AI model that can make HTTP requests: Claude (Anthropic), ChatGPT/GPT-4 (OpenAI), Cursor, Codex, Gemini (Google), Copilot, Windsurf, and more. AI Bridge is a simple HTTP API — no vendor lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Figma AI Bridge a subscription?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Figma AI Bridge is $49 one-time, lifetime license. No subscription, no recurring payments.',
      },
    },
  ],
};

export default function BridgePage() {
  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeFaqJsonLd) }}
      />
      <LandingSection maxWidth="2xl">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
            Figma AI Bridge with Design Tokens
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-fd-muted-foreground">
            Standard Figma MCPs return raw hex colors and pixel values.
            Bridge returns the actual design token names — so your AI generates
            production CSS with variable references instead of hardcoded values.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-fd-muted-foreground">
            Dark mode, theme changes, density scales — all handled by your tokens automatically.
            Works with any AI model. Two-way: create in Figma and read back into code.
          </p>

          <p className="mt-2 text-sm text-fd-muted-foreground">
            <Link href="/blog/figma-code-design-bridge-any-model" className="underline underline-offset-2 hover:text-fd-foreground">
              How it works
            </Link>
          </p>

          <div className="mt-7 rounded-xl border border-fd-border p-5">
            <p className="text-sm font-medium text-fd-foreground">Quick install (2 min)</p>
            <ol className="mt-3 space-y-2 text-sm text-fd-muted-foreground">
              <li>1. In Figma: Plugins → Development → Import plugin from manifest.</li>
              <li>2. Start bridge launcher: `start-bridge.command` (macOS) or `start-bridge.bat` (Windows).</li>
              <li>3. Give this prompt to your model:</li>
            </ol>
            <CodeBlock language="bash" className="mt-3">{modelPrompt}</CodeBlock>
          </div>

          <div className="mt-8 rounded-xl border border-fd-border p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-fd-foreground">Lifetime license</p>
                <p className="text-sm text-fd-muted-foreground">No trial. No limits. No subscription.</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-semibold tracking-tight text-fd-foreground">$49</p>
                <p className="text-xs text-fd-muted-foreground">one-time</p>
              </div>
            </div>

            <div className="mt-5">
              <ButtonLink
                as="a"
                href={checkoutUrl}
                color="primary"
                variant="solid"
                size="md"
                pill={false}
                block
              >
                Buy Now
              </ButtonLink>
            </div>

            <p className="mt-3 text-xs text-fd-muted-foreground">
              After payment, redirect to setup steps. All sales are final.
            </p>
          </div>

          <div className="mt-6 text-sm text-fd-muted-foreground">
            <p>
              Already purchased? Open{' '}
              <Link href="/bridge/success" className="underline underline-offset-2 hover:text-fd-foreground">
                setup instructions
              </Link>
              .
            </p>
          </div>
        </div>
      </LandingSection>
    </main>
  );
}
