'use client';

import { ButtonLink } from '@plexui/ui/components/Button';

/* ------------------------------------------------------------------ */
/*  Icon tiles — dark rounded squares matching Shadcraft style         */
/* ------------------------------------------------------------------ */

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-[16px]"
      style={{
        boxShadow:
          'rgba(0,0,0,0.04) 0px 0.3px 0.27px -0.58px, rgba(0,0,0,0.04) 0px 1.14px 1.03px -1.17px, rgba(0,0,0,0.07) 0px 5px 4.5px -1.75px',
      }}
    >
      <div className="flex size-[52px] items-center justify-center rounded-[13px] bg-[#171717] sm:size-[60px]">
        {children}
      </div>
    </div>
  );
}

function FigmaLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="size-[28px] sm:size-[32px]"
    >
      <g transform="translate(6 0)">
        <path
          d="M5.999 12.001C9.311 12.001 11.999 9.313 11.999 6V0H5.999C2.688 0 0 2.688 0 6C0 9.313 2.688 12.001 5.999 12.001Z"
          fill="#0ACF83"
          transform="translate(0 23.999)"
        />
        <path
          d="M0 6C0 2.688 2.688 0 5.999 0H11.999V12.001H5.999C2.688 12.001 0 9.313 0 6Z"
          fill="#A259FF"
          transform="translate(0 12.003)"
        />
        <path
          d="M0 6C0 2.688 2.688 0 5.999 0H11.999V12.001H5.999C2.688 12.001 0 9.313 0 6Z"
          fill="#F24E1E"
        />
        <path
          d="M0 0H5.999C9.311 0 11.999 2.688 11.999 6C11.999 9.313 9.311 12.001 5.999 12.001H0Z"
          fill="#FF7262"
          transform="translate(12.001 0)"
        />
        <path
          d="M11.999 6C11.999 9.313 9.311 12.001 5.999 12.001C2.688 12.001 0 9.313 0 6C0 2.688 2.688 0 5.999 0C9.311 0 11.999 2.688 11.999 6Z"
          fill="#1ABCFE"
          transform="translate(12.001 12.003)"
        />
      </g>
    </svg>
  );
}

function ReactLogo() {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="size-[28px] sm:size-[32px]"
    >
      <circle cx="18.08" cy="17.67" r="3.26" fill="#61DAFB" />
      <ellipse
        cx="18"
        cy="17.67"
        rx="17.5"
        ry="6.67"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
      />
      <ellipse
        cx="18"
        cy="17.67"
        rx="17.5"
        ry="6.67"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
        transform="rotate(60 18 18)"
      />
      <ellipse
        cx="18"
        cy="17.67"
        rx="17.5"
        ry="6.67"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
        transform="rotate(120 18 18)"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      data-reveal
      data-visible="true"
      className="relative flex flex-col items-center px-6 pt-16 pb-14 sm:pt-24 sm:pb-18 md:pt-32 md:pb-24"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Icon tiles */}
        <div className="flex items-center gap-2">
          <IconTile>
            <FigmaLogo />
          </IconTile>
          <IconTile>
            <ReactLogo />
          </IconTile>
        </div>

        {/* Eyebrow */}
        <p className="mt-6 text-sm font-medium tracking-wide text-fd-muted-foreground">
          Plex UI for Figma &amp; React
        </p>

        {/* Headline — 30px/600, OpenAI-matching */}
        <h1 className="mt-4 text-[30px] leading-[42px] font-semibold tracking-[-0.6px] text-fd-foreground">
          The most flexible UI kit
          <br className="hidden sm:block" />
          {' '}for Figma &amp; React
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[38rem] text-[1.05rem] leading-relaxed text-fd-muted-foreground sm:text-lg">
          Powered by the design system behind{' '}
          <a href="https://openai.github.io/apps-sdk-ui/" target="_blank" rel="noopener noreferrer" className="text-fd-foreground underline decoration-fd-muted-foreground/40 underline-offset-2 hover:decoration-fd-foreground transition-colors">ChatGPT</a>.
          {' '}Design tokens, accessible components, and a pixel-perfect
          Figma library — ready for Claude, Cursor, Codex &amp; AI-driven workflows.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink
            href="/docs/components"
            color="secondary"
            variant="outline"
            size="lg"
            pill={false}
          >
            Browse Components
          </ButtonLink>
          <ButtonLink
            href="#pricing"
            color="primary"
            variant="solid"
            size="lg"
            pill={false}
          >
            Get the Figma Kit
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
