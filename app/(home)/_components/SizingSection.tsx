'use client';

import { ButtonLink } from '@plexui/ui/components/Button';
import { SizingOverviewDemo } from '@/components/docs/SizingDemos';
import { LandingSection, SectionHeading, SectionCta } from './LandingSection';

export function SizingSection() {
  return (
    <LandingSection id="why-9-sizes" data-reveal>
      <SectionHeading
        description="Most kits ship 3 to 5 sizes per control. That's fine for a landing page, but admin panels, dense dashboards, and compact toolbars need more. Plex UI gives every control 9 sizes on one shared scale. One prop, zero overrides."
      >
        Four sizes is not enough
      </SectionHeading>

      <div className="-mt-4 overflow-hidden rounded-xl border border-fd-border [&_[data-demo-controls]>*:first-child]:!border-t-0 [&_[data-demo-controls]>*:last-child]:border-b [&_[data-demo-controls]>*:last-child]:border-fd-border [&_[data-demo-controls]>*]:!border-t-fd-border">
        <SizingOverviewDemo />
      </div>

      <SectionCta>
        <ButtonLink href="/docs/components" color="secondary" variant="outline" size="md" pill={false}>
          Browse Components
        </ButtonLink>
      </SectionCta>
    </LandingSection>
  );
}
