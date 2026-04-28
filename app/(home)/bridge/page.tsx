import type { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@plexui/ui/components/CodeBlock';
import { BridgeFaq } from './_components/BridgeFaq';
import { PricingCard } from './_components/PricingCard';

const DEFAULT_CHECKOUT_URL =
  'https://plexui.lemonsqueezy.com/checkout/buy/98a4277b-5d30-4807-b0e9-5d7ae3f4f433';

const checkoutUrl = process.env.NEXT_PUBLIC_BRIDGE_CHECKOUT_URL ?? DEFAULT_CHECKOUT_URL;

const PLUGIN_VERSION = '1.0.3';

export const metadata: Metadata = {
  title: { absolute: 'Figma AI Bridge: AI designs in your Figma' },
  description:
    'Connect any AI agent to Figma. Your agent reads variables, picks the right components from your library, creates new ones when nothing fits, and binds every property to your design tokens.',
  openGraph: {
    title: 'Figma AI Bridge: AI designs in your Figma',
    description:
      'Connect any AI agent to Figma. Your agent reads variables, picks the right components from your library, creates new ones when nothing fits, and binds every property to your design tokens.',
    url: 'https://plexui.com/bridge',
    images: [{ url: 'https://plexui.com/opengraph-image.png?v=3', width: 2400, height: 1260, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Figma AI Bridge: AI designs in your Figma',
    description:
      'Connect any AI agent to Figma. Your agent reads variables, picks components, creates new ones, and binds every property to your tokens.',
    images: ['https://plexui.com/opengraph-image.png?v=3'],
  },
  alternates: {
    canonical: 'https://plexui.com/bridge',
  },
};

const modelPrompt = `Start the Figma AI Bridge in the background:
  cd <unzipped-folder> && nohup node server.mjs > /tmp/figma-bridge.log 2>&1 &

Then use http://localhost:8867:
- GET  /status   → expect connected:true
- POST /command  → {"command":"...","params":{...}}
Use params, not args. Replace <unzipped-folder> with where you unzipped the plugin.`;

const features = [
  'Reads your variables and component bindings to learn the design system',
  'Picks components from your library, creates new ones when nothing fits',
  'Binds every property (fill, stroke, text, padding, gap, radius) to your tokens',
  'Builds frames, text, instances with auto-layout, no hardcoded values',
  'Works with any agent that has shell access: Claude Code, Codex, Antigravity',
  'Local-first. Designs never leave your machine',
];

const faqs = [
  {
    q: 'How is this different from standard Figma MCPs?',
    a: 'Standard Figma MCPs (including the official read-only one) return raw hex (#181818) and pixel values (16px). AI Bridge returns the design-token names: background/primary/solid, spacing/xl, radius/full. The AI generates CSS with var() references instead of hardcoded values. AI Bridge also works with any model and runs 100% locally.',
  },
  {
    q: 'Which AI tools work with it?',
    a: 'Any agentic editor with shell + HTTP tools: Claude Code, Codex, Antigravity. The agent runs `node server.mjs` to start the local bridge, then talks to it on localhost:8867. No vendor lock-in.',
  },
  {
    q: 'What does $49 actually buy?',
    a: 'A perpetual license for one developer. The download is a zip with the plugin manifest, plugin code, and a small Node bridge launcher.',
  },
  {
    q: 'Refunds?',
    a: 'If the plugin does not work as advertised in your setup within 14 days of purchase, email a refund request and you will get a full refund. Beyond that window all sales are final since the plugin source is delivered on download.',
  },
  {
    q: 'System requirements?',
    a: 'Figma desktop or web on macOS or Windows. Node.js 18+ for the local bridge launcher (start-bridge.command on macOS, start-bridge.bat on Windows).',
  },
];

const bridgeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Plex UI Figma AI Bridge',
  image: 'https://plexui.com/opengraph-image.png',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows',
  softwareVersion: PLUGIN_VERSION,
  description:
    'Figma AI plugin with design token support. Standard Figma MCPs return raw hex and pixels. AI Bridge returns actual variable bindings (background/primary/solid, spacing/xl, radius/full). Works with any AI model via local HTTP API. Two-way: create Figma nodes and read token bindings back into code.',
  url: 'https://plexui.com/bridge',
  author: { '@type': 'Organization', name: 'Plex UI', url: 'https://plexui.com' },
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'USD',
    description: 'One-time payment, lifetime license. No subscription.',
    availability: 'https://schema.org/InStock',
  },
  featureList: features,
};

const bridgeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function BridgePage() {
  return (
    <main className="flex flex-1 flex-col bg-fd-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bridgeFaqJsonLd) }}
      />

      {/* Hero text */}
      <section className="px-6 pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
            Figma AI Bridge with Design Tokens
          </h1>

          <p className="mt-4 text-base leading-relaxed text-fd-foreground">
            Your AI agent designs in Figma using your design system. It reads variables, picks the right components from your library, and creates new ones when nothing fits. Every fill, padding, and radius is bound to your tokens automatically.
          </p>
        </div>
      </section>

      {/* Full-width demo video */}
      <section className="mt-7 px-6">
        <figure className="mx-auto max-w-[90rem]">
          <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-secondary">
            <video
              src="/bridge/figma-ai-bridge.mp4"
              poster="/bridge/figma-ai-bridge-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              className="block w-full"
              aria-label="Figma AI Bridge demo. AI builds a context menu using design system components in real time."
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-fd-muted-foreground">
            Claude Code on the left calls the bridge. Figma on the right builds a menu from your components: labels, hover state, danger variant, all bound to your tokens.
          </figcaption>
        </figure>
      </section>

      {/* Rest of the content */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-2xl">
          <p className="mt-8 text-base leading-relaxed text-fd-foreground">
            Two-way workflow. Read existing frames to learn your patterns, then build new screens that match. Dark mode, theme, density: your tokens handle all of it.
          </p>

          <p className="mt-2 text-base text-fd-muted-foreground">
            <Link href="/blog/figma-code-design-bridge-any-model" className="underline underline-offset-2 hover:text-fd-foreground">
              How it works
            </Link>
          </p>

          <ul className="mt-7 space-y-2 text-base text-fd-foreground">
            {features.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-fd-foreground/40" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <section aria-labelledby="bridge-install-heading" className="mt-12">
            <h2 id="bridge-install-heading" className="text-xl font-semibold tracking-tight text-fd-foreground md:text-2xl">
              Quick install
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground">
              Two minutes from receipt email to running plugin.
            </p>

            <ol className="mt-6 space-y-3 text-base text-fd-foreground">
              <li>1. Download the plugin zip from your Lemon Squeezy receipt email and unzip it.</li>
              <li>2. In Figma: Plugins → Development → Import plugin from manifest, pick the manifest file from the unzipped folder.</li>
              <li>3. Paste this prompt into Claude Code, Codex, or Antigravity. The agent starts the bridge and connects:</li>
            </ol>

            <CodeBlock language="bash" className="mt-4">{modelPrompt}</CodeBlock>
          </section>

          <PricingCard checkoutUrl={checkoutUrl} />

          <section aria-labelledby="bridge-faq-heading" className="mt-12">
            <h2 id="bridge-faq-heading" className="text-xl font-semibold tracking-tight text-fd-foreground md:text-2xl">
              FAQ
            </h2>
            <BridgeFaq faqs={faqs} />
          </section>

          <div className="mt-10 text-base text-fd-muted-foreground">
            <p>
              Already purchased? Open{' '}
              <Link href="/bridge/success" className="underline underline-offset-2 hover:text-fd-foreground">
                setup instructions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
