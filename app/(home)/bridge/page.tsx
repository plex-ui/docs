import type { Metadata } from 'next';
import Link from 'next/link';
import { ButtonLink } from '@plexui/ui/components/Button';
import { CodeBlock } from '@plexui/ui/components/CodeBlock';
import { LandingSection } from '../_components/LandingSection';

const DEFAULT_CHECKOUT_URL =
  'https://plexui.lemonsqueezy.com/checkout/buy/98a4277b-5d30-4807-b0e9-5d7ae3f4f433';

const checkoutUrl = process.env.NEXT_PUBLIC_BRIDGE_CHECKOUT_URL ?? DEFAULT_CHECKOUT_URL;

export const metadata: Metadata = {
  title: 'Figma Code↔Design Bridge for ANY AI Model',
  description:
    'Two-way Figma bridge for ANY AI model: model can draw in editable Figma and read structure back into code context.',
  openGraph: {
    title: 'Figma Code↔Design Bridge for ANY AI Model',
    description:
      'Two-way Figma bridge for ANY AI model: model can draw in editable Figma and read structure back into code context.',
    url: 'https://plexui.com/bridge',
  },
  twitter: {
    title: 'Figma Code↔Design Bridge for ANY AI Model',
    description:
      'Two-way Figma bridge for ANY AI model: model can draw in editable Figma and read structure back into code context.',
  },
  alternates: {
    canonical: 'https://plexui.com/bridge',
  },
};

const modelPrompt = `Figma Bridge API: http://localhost:8867
1) GET /status (connected=true)
2) POST /command with {"command":"...","params":{...}}
3) Use params, not args`;

export default function BridgePage() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingSection maxWidth="2xl">
        <div className="mx-auto max-w-xl">
          <div className="mb-3 inline-flex rounded-full border border-fd-border px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            Works with ANY AI model
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
            Figma Code↔Design Bridge for ANY AI model
          </h1>

          <p className="mt-4 text-base leading-relaxed text-fd-muted-foreground">
            Your model can turn ideas into editable Figma layouts, inspect structure (components, tokens, auto-layout),
            and work design ↔ code in both directions.
          </p>

          <p className="mt-3 text-sm font-medium text-fd-foreground">
            Two-way flow: Design ↔ Code
          </p>

          <div className="relative left-1/2 mt-6 w-[min(100vw-2rem,1200px)] -translate-x-1/2 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
            <video
              className="block h-auto w-full"
              controls
              playsInline
              preload="metadata"
            >
              <source src="/bridge/figma-code-design-bridge-hq.mp4" type="video/mp4" />
              <source src="/bridge/figma-code-design-bridge.mov" type="video/quicktime" />
            </video>
            <p className="px-4 py-3 text-xs text-fd-muted-foreground">
              Live demo: ANY AI model draws directly in Figma via local Bridge API.
            </p>
          </div>

          <p className="mt-4 text-sm font-semibold leading-relaxed text-fd-foreground">
            Bridge works on a different principle: more freedom and faster iteration than the official Claude Code to Figma flow.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
            Figma&apos;s official announcement (February 17, 2026) is Claude-specific.
            Bridge uses a model-agnostic local command API, so ANY model can directly create/update real Figma nodes.
            Result: less tooling lock-in, more control, and faster design ↔ code loops.
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            Reference:{' '}
            <a
              href="https://www.figma.com/blog/introducing-claude-code-to-figma/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-fd-foreground"
            >
              Introducing Claude Code to Figma (Feb 17, 2026)
            </a>
          </p>
          <p className="mt-2 text-sm text-fd-muted-foreground">
            More details:{' '}
            <Link href="/blog/figma-code-design-bridge-any-model" className="underline underline-offset-2 hover:text-fd-foreground">
              Figma Code↔Design Bridge for ANY AI model
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
