import type { Metadata } from 'next';
import { LandingSection } from '../../_components/LandingSection';

export const metadata: Metadata = {
  title: 'Bridge Setup — Figma Code↔Design Bridge',
  description: 'Install and run the Figma Code↔Design Bridge after purchase.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BridgeSuccessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingSection maxWidth="2xl">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
            Purchase Complete
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fd-muted-foreground">
            Install the plugin and start the local bridge server. Plugin will stay red until server is running.
          </p>

          <ol className="mt-6 space-y-3 text-sm text-fd-muted-foreground">
            <li>1. Download the package from your Lemon Squeezy receipt email.</li>
            <li>2. In Figma: Plugins → Development → Import plugin from manifest.</li>
            <li>
              3. Select{' '}
              <code className="rounded bg-fd-secondary px-1.5 py-0.5 text-fd-foreground">
                figma/plugin/figma-code-design-bridge/manifest.json
              </code>
              .
            </li>
            <li>
              4. Start local bridge server:
              <pre className="mt-2 overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary p-3 text-xs text-fd-foreground">
                <code>macOS: double-click start-bridge.command</code>
              </pre>
              <pre className="mt-2 overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary p-3 text-xs text-fd-foreground">
                <code>Windows: run start-bridge.bat</code>
              </pre>
            </li>
            <li>
              5. Check health:
              <pre className="mt-2 overflow-x-auto rounded-lg border border-fd-border bg-fd-secondary p-3 text-xs text-fd-foreground">
                <code>curl http://localhost:8867/status</code>
              </pre>
            </li>
            <li>6. Run plugin “Figma Code↔Design Bridge” in Figma and verify green status.</li>
          </ol>
        </div>
      </LandingSection>
    </main>
  );
}
