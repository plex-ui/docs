'use client';

import { Separator } from '@plexui/ui/components/Separator';

/* ============================================================
   Overview — 1:1 mirror of shadcn's single Separator demo:
   https://ui.shadcn.com/docs/components/radix/separator
   ============================================================ */

export function SeparatorOverviewDemo() {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h4
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1,
            fontWeight: 500,
          }}
        >
          Plex UI
        </h4>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          An open-source UI component library.
        </p>
      </div>
      <Separator style={{ margin: '16px 0' }} />
      <div
        style={{
          display: 'flex',
          height: 20,
          alignItems: 'center',
          gap: 16,
          fontSize: 14,
        }}
      >
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
