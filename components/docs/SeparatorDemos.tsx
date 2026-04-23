'use client';

import { Separator } from '@plexui/ui/components/Separator';

/* ============================================================
   Demo — overview (mirrors shadcn's primary SeparatorDemo)
   https://ui.shadcn.com/docs/components/radix/separator
   ============================================================ */

export function SeparatorOverviewDemo() {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 384,
        flexDirection: 'column',
        gap: 16,
        fontSize: 14,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ lineHeight: 1, fontWeight: 500 }}>Plex UI</div>
        <div style={{ color: 'var(--color-text-tertiary)' }}>
          The Foundation for your Design System
        </div>
      </div>
      <Separator />
      <div>
        A set of beautifully designed components that you can customize, extend,
        and build on.
      </div>
    </div>
  );
}

/* ============================================================
   Vertical — use orientation="vertical" between inline items
   ============================================================ */

export function SeparatorVerticalDemo() {
  return (
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
  );
}

/* ============================================================
   Menu — vertical separators between menu items with descriptions
   ============================================================ */

export function SeparatorMenuDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontSize: 14,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontWeight: 500 }}>Settings</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
          Manage preferences
        </span>
      </div>
      <Separator orientation="vertical" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontWeight: 500 }}>Account</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
          Profile &amp; security
        </span>
      </div>
      <Separator orientation="vertical" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontWeight: 500 }}>Help</span>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
          Support &amp; docs
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   List — horizontal separators between list rows
   ============================================================ */

export function SeparatorListDemo() {
  const rows = [
    { key: 'Item 1', value: 'Value 1' },
    { key: 'Item 2', value: 'Value 2' },
    { key: 'Item 3', value: 'Value 3' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: 384,
        flexDirection: 'column',
        gap: 8,
        fontSize: 14,
      }}
    >
      {rows.map((row, i) => (
        <span key={row.key} style={{ display: 'contents' }}>
          {i > 0 && <Separator />}
          <dl
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 0,
            }}
          >
            <dt>{row.key}</dt>
            <dd style={{ margin: 0, color: 'var(--color-text-tertiary)' }}>
              {row.value}
            </dd>
          </dl>
        </span>
      ))}
    </div>
  );
}
