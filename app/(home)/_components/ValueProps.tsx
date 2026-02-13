import { Figma, Palette, Rocket, Sparkles } from 'lucide-react';

const valueProps = [
  {
    title: 'Figma-first design',
    description:
      'Pixel-perfect Figma library with auto-layout, variants, and design tokens. Every component is designed in Figma first, not added as an afterthought.',
    Icon: Figma,
  },
  {
    title: 'True flexibility',
    description:
      'Design tokens and semantic layers let you re-theme everything in seconds. You\'re not locked into one aesthetic like with shadcn or Untitled UI.',
    Icon: Palette,
  },
  {
    title: 'Production-ready React',
    description:
      'Accessible Radix components, Tailwind CSS 4, and full dark mode support. Import the component, pass your props, and ship.',
    Icon: Rocket,
  },
  {
    title: 'Built for AI code editors',
    description:
      'Claude, Cursor, Codex, Antigravity: any AI that writes code needs proper building blocks. Plex UI gives them production-grade components, not unstyled primitives.',
    Icon: Sparkles,
  },
];

export function ValueProps() {
  return (
    <section
      data-reveal
      className="bg-fd-background px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 sm:grid-cols-2">
          {valueProps.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-start text-left"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fd-border bg-fd-background text-fd-muted-foreground">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-fd-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fd-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
