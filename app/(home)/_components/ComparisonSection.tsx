'use client';

import { Check, Minus } from 'lucide-react';

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
    shadcn: '3–4 sizes',
    untitledui: '4–5 sizes',
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
    untitledui: false,
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
    return <Check className="size-4 text-emerald-500" />;
  }
  if (value === false) {
    return <Minus className="size-4 text-fd-muted-foreground/40" />;
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
    <section
      data-reveal
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
          Why Plex UI?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
          See how Plex UI compares to other popular design systems.
        </p>

        {/* Table — desktop */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-fd-border sm:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-fd-border bg-fd-muted/50">
                <th className="px-5 py-3.5 text-sm font-medium text-fd-muted-foreground">
                  Feature
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-semibold text-fd-foreground">
                  Plex UI
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-medium text-fd-muted-foreground">
                  shadcn/ui
                </th>
                <th className="px-5 py-3.5 text-center text-sm font-medium text-fd-muted-foreground">
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
                  <td className="px-5 py-3 text-sm text-fd-muted-foreground">
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
              <p className="text-sm font-medium text-fd-foreground">
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
      </div>
    </section>
  );
}
