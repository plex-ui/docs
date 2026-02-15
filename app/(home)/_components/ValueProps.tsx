import { ButtonLink } from '@plexui/ui/components/Button';
import { Figma, Palette, Rocket } from 'lucide-react';
import { LandingSection, SectionHeading, SectionCta } from './LandingSection';

const valueProps = [
  {
    title: 'Your Figma file is the source of truth',
    description:
      'Variables, auto-layout, 9 sizes per component, and a three-layer token system. Every design decision is encoded, not eyeballed. Change one variable, update everything.',
    Icon: Figma,
  },
  {
    title: 'Not locked into one aesthetic',
    description:
      'Most kits hardcode their look. Plex UI\'s semantic token layers let you re-theme without detaching components. Switch brands, go dark mode, or build a white-label product.',
    Icon: Palette,
  },
  {
    title: 'Ship without translating designs',
    description:
      'Every Figma component has an identical React counterpart. Same sizes, same tokens, same dark mode. Import the component, pass your props, deploy.',
    Icon: Rocket,
  },
];

export function ValueProps() {
  return (
    <LandingSection data-reveal>
      <SectionHeading description="Designers get a professional Figma library. Developers and AI editors get production-grade React components.">
        Why Plex UI
      </SectionHeading>

      {/* Feature cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {valueProps.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="flex flex-col items-start rounded-xl border border-fd-border p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-fd-foreground">
              {title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>

      <SectionCta>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/docs/overview/ai-setup" color="secondary" variant="outline" size="md" pill={false}>
            Set up for AI coding
          </ButtonLink>
          <ButtonLink href="#pricing" color="primary" variant="solid" size="md" pill={false}>
            Get the Figma Kit
          </ButtonLink>
        </div>
      </SectionCta>
    </LandingSection>
  );
}
