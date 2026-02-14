import { ButtonLink } from '@plexui/ui/components/Button';
import { LandingSection } from './LandingSection';

export function CtaBanner() {
  return (
    <LandingSection as="div" className="!py-16 sm:!py-20" data-reveal>
      <div className="flex flex-col items-center text-center">
        <p className="text-lg font-semibold text-fd-foreground sm:text-xl">
          Start building with the full design system
        </p>
        <p className="mt-2 text-base leading-relaxed text-fd-muted-foreground">
          22,000+ variants. 9 sizes per component. One purchase, lifetime updates.
        </p>
        <div className="mt-5 flex items-center gap-4">
          <ButtonLink href="#pricing" color="primary" variant="solid" size="md" pill={false}>
            Get the Figma Kit
          </ButtonLink>
        </div>
      </div>
    </LandingSection>
  );
}
