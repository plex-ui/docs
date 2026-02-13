import { ButtonLink } from '@plexui/ui/components/Button';

export function CtaBanner() {
  return (
    <div
      data-reveal
      className="bg-fd-background px-6 py-10 sm:py-14"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="text-lg font-semibold text-fd-foreground sm:text-xl">
          Start building with the full design system
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
          22,000+ variants. 9 sizes per component. One purchase, lifetime updates.
        </p>
        <div className="mt-5 flex items-center gap-4">
          <ButtonLink
            href="#pricing"
            color="primary"
            variant="solid"
            size="md"
            pill={false}
          >
            Get the Figma Kit
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
