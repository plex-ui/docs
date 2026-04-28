'use client';

import type { CSSProperties } from 'react';
import { ButtonLink } from '@plexui/ui/components/Button';
import { Card } from '@plexui/ui/components/Card';

// Apple-style hero pricing — bump Card.Title to heading-xl (32px) so it
// reads as the product hero, not as a sidebar-card label.
const cardTokens = {
  '--card-title-font-size': 'var(--font-heading-xl-size)',
  '--card-title-line-height': 'var(--font-heading-xl-line-height)',
} as CSSProperties;

export function PricingCard({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <Card className="mt-8" style={cardTokens}>
      <div className="flex flex-col items-center px-6 py-8 text-center md:px-10 md:py-10">
        <Card.Title>Figma AI Bridge</Card.Title>
        <Card.Description className="mt-2 max-w-md">
          Connect any AI agent to Figma. Tokens, not pixels.
        </Card.Description>

        <p className="mt-6 text-5xl font-semibold tracking-tight text-fd-foreground">
          $49
        </p>
        <p className="mt-1 text-sm text-fd-muted-foreground">
          One-time. Lifetime license.
        </p>

        <ButtonLink
          as="a"
          href={checkoutUrl}
          color="primary"
          variant="solid"
          size="md"
          pill={false}
          className="mt-5 min-w-[180px]"
        >
          Buy Now
        </ButtonLink>

        <p className="mt-6 text-sm text-fd-muted-foreground">
          Works with Claude Code, Codex, and Antigravity. macOS and Windows.
        </p>
      </div>
    </Card>
  );
}
