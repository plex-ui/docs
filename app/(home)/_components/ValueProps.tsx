import { Figma, Palette, Rocket } from 'lucide-react';

const valueProps = [
  {
    title: 'Figma-first design',
    description:
      'Pixel-perfect Figma library with auto-layout, variants, and design tokens. Not a Figma afterthought.',
    Icon: Figma,
  },
  {
    title: 'True flexibility',
    description:
      'Design tokens and semantic layers let you re-theme everything. Not locked into one aesthetic like shadcn or Untitled UI.',
    Icon: Palette,
  },
  {
    title: 'Production-ready React',
    description:
      'Accessible Radix components, Tailwind CSS 4, and dark mode. Copy, paste, and ship.',
    Icon: Rocket,
  },
];

export function ValueProps() {
  return (
    <section
      data-reveal
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-3">
          {valueProps.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-start text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
                <Icon className="size-4" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-fd-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fd-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
