import { ButtonLink } from '@plexui/ui/components/Button';
import { LandingSection } from './LandingSection';

export function BridgePromo() {
  return (
    <LandingSection maxWidth="2xl" data-reveal>
      <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8">
        <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
          New
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
          Figma AI Bridge with Design Tokens
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-fd-muted-foreground md:text-base">
          Standard Figma MCPs give raw hex colors and pixel values. Bridge gives your AI the actual
          design token bindings — so it generates <code className="rounded bg-fd-secondary px-1 py-0.5 text-xs">var(--spacing-xl)</code> instead
          of <code className="rounded bg-fd-secondary px-1 py-0.5 text-xs">16px</code>.
          Works with any model. Two-way: create in Figma and read back into code.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/bridge" color="primary" variant="solid" size="md" pill={false}>
            Open AI Bridge
          </ButtonLink>
          <ButtonLink href="/bridge/success" color="secondary" variant="outline" size="md" pill={false}>
            Install in 2 min
          </ButtonLink>
        </div>
      </div>
    </LandingSection>
  );
}
