import { ButtonLink } from '@plexui/ui/components/Button';
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
      'AI models generate better UI when they have real components to work with. Plex UI gives them production-grade building blocks instead of unstyled primitives.',
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
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground sm:text-3xl">
            Why Plex UI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
            Everything you need to design and ship consistent, production-grade interfaces.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {valueProps.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-start rounded-xl border border-black/5 p-6 dark:border-white/5"
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

        <div className="mt-10 flex justify-center">
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
    </section>
  );
}
