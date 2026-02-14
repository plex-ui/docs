'use client';

import { ButtonLink } from '@plexui/ui/components/Button';
import { Check, Minus } from 'lucide-react';
import { LandingSection, SectionHeading, SectionCta } from './LandingSection';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type CellValue = true | false | string;

interface Row {
  feature: string;
  plexui: CellValue;
  shadcn: CellValue;
  untitledui: CellValue;
}

const rows: Row[] = [
  {
    feature: 'Figma variants',
    plexui: '22,000+',
    shadcn: '~200',
    untitledui: '8,000+',
  },
  {
    feature: 'Size scale per component',
    plexui: '9 sizes',
    shadcn: '3 to 4 sizes',
    untitledui: '4 to 5 sizes',
  },
  {
    feature: 'Three-layer token system',
    plexui: true,
    shadcn: false,
    untitledui: false,
  },
  {
    feature: 'All tokens as Figma Variables',
    plexui: true,
    shadcn: false,
    untitledui: false,
  },
  {
    feature: 'React component library',
    plexui: true,
    shadcn: true,
    untitledui: true,
  },
  {
    feature: 'Figma ↔ code parity',
    plexui: true,
    shadcn: false,
    untitledui: false,
  },
  {
    feature: 'Built for AI code editors',
    plexui: true,
    shadcn: false,
    untitledui: false,
  },
  {
    feature: 'Dark mode via variables',
    plexui: true,
    shadcn: true,
    untitledui: true,
  },
  {
    feature: 'Custom icon library',
    plexui: '6,600+',
    shadcn: false,
    untitledui: '2,000+',
  },
  {
    feature: 'Pricing',
    plexui: 'From $49',
    shadcn: 'Free',
    untitledui: 'From $79',
  },
];

/* ------------------------------------------------------------------ */
/*  Cell renderer                                                      */
/* ------------------------------------------------------------------ */

function CellContent({ value }: { value: CellValue }) {
  if (value === true) {
    return <Check className="inline-block size-5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />;
  }
  if (value === false) {
    return <Minus className="inline-block size-5 text-fd-muted-foreground" strokeWidth={2} />;
  }
  return (
    <span className="text-sm font-medium text-fd-foreground">{value}</span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function ComparisonSection() {
  return (
    <LandingSection data-reveal>
      <SectionHeading description="See how Plex UI compares to other popular design systems.">
        How Plex UI compares
      </SectionHeading>

      {/* Table — desktop */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-fd-border sm:block">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-fd-border bg-fd-muted/50">
                <th className="px-5 py-3.5 text-left text-sm font-semibold text-black dark:text-white">
                  Feature
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-semibold text-black dark:text-white">
                  Plex UI
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-semibold text-black dark:text-white">
                  shadcn/ui
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-semibold text-black dark:text-white">
                  Untitled UI
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={
                    i < rows.length - 1 ? 'border-b border-fd-border' : ''
                  }
                >
                  <td className="px-5 py-3 text-left text-sm text-fd-muted-foreground">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <CellContent value={row.plexui} />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <CellContent value={row.shadcn} />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center">
                      <CellContent value={row.untitledui} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile — stacked cards */}
        <div className="mt-10 flex flex-col gap-3 sm:hidden">
          {rows.map((row) => (
            <div
              key={row.feature}
              className="rounded-lg border border-fd-border px-4 py-3"
            >
              <p className="text-center text-sm font-medium text-fd-foreground">
                {row.feature}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs text-fd-muted-foreground">
                <div className="flex flex-col items-center">
                  <p className="mb-1 font-medium text-fd-foreground">Plex UI</p>
                  <CellContent value={row.plexui} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="mb-1">shadcn</p>
                  <CellContent value={row.shadcn} />
                </div>
                <div className="flex flex-col items-center">
                  <p className="mb-1">Untitled UI</p>
                  <CellContent value={row.untitledui} />
                </div>
              </div>
            </div>
          ))}
        </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-fd-muted-foreground">
        <strong className="text-fd-foreground">shadcn/ui</strong> is great if you want free,
        unstyled primitives and will build your own system.{' '}
        <strong className="text-fd-foreground">Untitled UI</strong> has a strong Figma library
        and a React library, but the two aren&apos;t built as a single system.{' '}
        <strong className="text-fd-foreground">Plex UI</strong> is for teams that need both:
        a professional Figma system and production-grade React components that stay in sync.
      </p>

      <SectionCta>
        <ButtonLink href="#pricing" color="primary" variant="solid" size="md" pill={false}>
          Get the Figma Kit
        </ButtonLink>
      </SectionCta>
    </LandingSection>
  );
}
