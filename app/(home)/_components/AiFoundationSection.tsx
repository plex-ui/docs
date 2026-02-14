import { ButtonLink } from '@plexui/ui/components/Button';
import { LandingSection } from './LandingSection';

const AI_TOOLS = [
  { name: 'Claude',      bg: 'bg-[#D97757]/10', text: 'text-[#D97757]', border: 'border-[#D97757]/20' },
  { name: 'Cursor',      bg: 'bg-[#2D2D2D]/8',  text: 'text-[#2D2D2D] dark:text-[#E8E8E8]', border: 'border-[#2D2D2D]/15 dark:border-[#E8E8E8]/15' },
  { name: 'Codex',       bg: 'bg-[#10A37F]/10', text: 'text-[#10A37F]', border: 'border-[#10A37F]/20' },
  { name: 'Antigravity', bg: 'bg-[#6E56CF]/10', text: 'text-[#6E56CF]', border: 'border-[#6E56CF]/20' },
];

export function AiFoundationSection() {
  return (
    <LandingSection data-reveal>
      <div className="rounded-2xl border border-fd-border p-8 sm:p-12">
        {/* AI tool pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {AI_TOOLS.map(({ name, bg, text, border }) => (
            <span
              key={name}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${bg} ${text} ${border}`}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
          AI without a design system is just&nbsp;fancy&nbsp;copy&#x2011;paste
        </h2>

        {/* Narrative */}
        <div className="mt-8 space-y-4 text-base leading-relaxed text-fd-muted-foreground">
          <p>
            You describe a page, the model writes the code, you deploy. Sounds great until you look
            at what it actually produced.
          </p>
          <p>
            A button is 36px tall on one page and 42px on the next. The spacing is different in every
            section. Colors are hardcoded hex values that nobody chose on purpose. Every prompt
            generates a fresh set of magic numbers, because the model has nothing to anchor to.
          </p>
          <p>
            You wouldn&apos;t let an intern commit raw SQL strings into every
            endpoint. You&apos;d give them guardrails. The same logic applies to AI-generated UI.
            Without a shared foundation, every output is a one-off.
          </p>
          <p>
            Plex UI is that foundation. Design tokens, semantic layers, accessible components.
            One source of truth the model follows on every prompt, so every page it
            generates looks like it belongs to the same product.
          </p>
        </div>

        <div className="mt-8 flex">
          <ButtonLink href="/docs/components" color="secondary" variant="outline" size="md" pill={false}>
            Browse Components
          </ButtonLink>
        </div>
      </div>
    </LandingSection>
  );
}
