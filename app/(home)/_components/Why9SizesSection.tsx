'use client';

import { SizingOverviewDemo } from '@/components/docs/SizingDemos';

export function Why9SizesSection() {
  return (
    <section
      data-reveal
      id="why-9-sizes"
      className="bg-fd-background px-6 py-10 sm:py-14"
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

        <div className="mt-8 overflow-hidden rounded-xl border border-fd-border [&_[data-demo-controls]>*:first-child]:!border-t-0">
          <SizingOverviewDemo />
        </div>
      </div>
    </section>
  );
}
