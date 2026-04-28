import type { Metadata } from 'next';
import { CodeBlock } from '@plexui/ui/components/CodeBlock';
import { LandingSection } from '../../_components/LandingSection';

const modelPrompt = `Start the Figma AI Bridge in the background:
  cd <unzipped-folder> && nohup node server.mjs > /tmp/figma-bridge.log 2>&1 &

Then use http://localhost:8867:
- GET  /status   → expect connected:true
- POST /command  → {"command":"...","params":{...}}
Use params, not args. Replace <unzipped-folder> with where you unzipped the plugin.`;

export const metadata: Metadata = {
  title: { absolute: 'Bridge Setup' },
  description: 'Install and run the Figma AI Bridge after purchase.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BridgeSuccessPage() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingSection maxWidth="2xl">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">
            Purchase Complete
          </h1>
          <p className="mt-4 text-base leading-relaxed text-fd-foreground">
            Three steps. Your AI agent does the bridge launch for you.
          </p>

          <ol className="mt-6 space-y-3 text-base text-fd-muted-foreground">
            <li>1. Download the plugin zip from your Lemon Squeezy receipt email and unzip it.</li>
            <li>2. In Figma: Plugins → Development → Import plugin from manifest, pick the manifest file from the unzipped folder.</li>
            <li>3. Paste this prompt into Claude Code, Codex, or Antigravity:</li>
          </ol>

          <CodeBlock language="bash" className="mt-3">{modelPrompt}</CodeBlock>

          <p className="mt-6 text-base leading-relaxed text-fd-foreground">
            The plugin window in Figma turns green once the agent has started the bridge. Now ask the agent for what you want, like &ldquo;Build me a settings menu&rdquo;.
          </p>

          <h2 className="mt-12 text-xl font-semibold tracking-tight text-fd-foreground">
            Manual fallback
          </h2>
          <p className="mt-2 text-base leading-relaxed text-fd-muted-foreground">
            No agent with shell access? Start the bridge yourself: double-click start-bridge.command on macOS or run start-bridge.bat on Windows. The terminal will show <em>Bridge listening on :8867</em>. Open the plugin in Figma and the status pill turns green.
          </p>
        </div>
      </LandingSection>
    </main>
  );
}
