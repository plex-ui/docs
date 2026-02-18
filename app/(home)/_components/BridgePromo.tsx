import { ButtonLink } from '@plexui/ui/components/Button';
import { LandingSection } from './LandingSection';

export function BridgePromo() {
  return (
    <LandingSection data-reveal>
      <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8">
        <p className="text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
          New
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fd-foreground md:text-3xl">
          Figma Bridge for ANY AI model
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fd-muted-foreground md:text-base">
          Any model can now draw your idea directly in Figma, read components/tokens/layout,
          and continue design ↔ code in one loop. Different principle from official Claude-only flow:
          more freedom, faster iteration.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/bridge" color="primary" variant="solid" size="md" pill={false}>
            Open Bridge
          </ButtonLink>
          <ButtonLink href="/bridge/success" color="secondary" variant="outline" size="md" pill={false}>
            Install in 2 min
          </ButtonLink>
        </div>
      </div>
    </LandingSection>
  );
}
