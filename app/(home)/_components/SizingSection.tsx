'use client';

import { ButtonLink } from '@plexui/ui/components/Button';
import { SizingOverviewDemo } from '@/components/docs/SizingDemos';

export function SizingSection() {
  return (
    <section
      data-reveal
      id="why-9-sizes"
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
          Four sizes is not enough
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
          Shadcn/ui ships 3 to 4 sizes per control. Untitled UI offers 4 to 5.
          For a landing page that's fine, but the moment you build an admin
          panel, a data-dense dashboard, or any real web app, you hit the wall.
          Compact toolbars, inline table controls, dense sidebars: none of
          that works with just "sm / md / lg". Plex UI gives every control
          9 sizes on one shared height scale, so everything aligns with
          a single prop and zero overrides.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-black/5 dark:border-white/5 [&_[data-demo-controls]>*:first-child]:!border-t-0 [&_[data-demo-controls]>*:last-child]:border-b [&_[data-demo-controls]>*:last-child]:border-black/5 dark:[&_[data-demo-controls]>*:last-child]:border-white/5 [&_[data-demo-controls]>*]:!border-t-black/5 dark:[&_[data-demo-controls]>*]:!border-t-white/5">
          <SizingOverviewDemo />
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonLink
            href="/docs/components"
            color="secondary"
            variant="outline"
            size="md"
            pill={false}
          >
            Browse Components
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
