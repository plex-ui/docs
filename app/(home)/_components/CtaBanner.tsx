import { ButtonLink } from '@plexui/ui/components/Button';
import { LandingSection } from './LandingSection';

export function CtaBanner() {
  return (
    <LandingSection as="div" className="!py-12 sm:!py-16" data-reveal>
      <div className="flex flex-col items-center text-center">
        <p className="text-lg font-semibold text-fd-foreground sm:text-xl">
          Start building with Plex UI
        </p>
        <p className="mt-2 text-base leading-relaxed text-fd-muted-foreground">
          Install @plexui/ui in 30 seconds. Professional Figma kit from $49.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/docs/overview/ai-setup" color="secondary" variant="outline" size="md" pill={false}>
            Set up for AI coding
          </ButtonLink>
          <ButtonLink href="#pricing" color="primary" variant="solid" size="md" pill={false}>
            Get the Figma Kit
          </ButtonLink>
        </div>
      </div>
    </LandingSection>
  );
}
