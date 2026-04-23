'use client';

import { Separator } from '@plexui/ui/components/Separator';

/* ============================================================
   Overview — horizontal divider with a vertical inline row
   ============================================================ */

export function SeparatorOverviewDemo() {
  return (
    <div style={{ maxWidth: 360 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Plex UI</div>
        <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
          An open-source design system for building modern web apps.
        </div>
      </div>
      <Separator style={{ margin: '16px 0' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 14,
          color: 'var(--color-text-secondary)',
        }}
      >
        <span>Blog</span>
        <Separator orientation="vertical" style={{ height: 16 }} />
        <span>Docs</span>
        <Separator orientation="vertical" style={{ height: 16 }} />
        <span>Source</span>
      </div>
    </div>
  );
}

/* ============================================================
   Horizontal — between card sections (mimics Payment Method layout)
   ============================================================ */

export function SeparatorHorizontalDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 360,
      }}
    >
      <div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Account</div>
        <div style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          Manage your account information.
        </div>
      </div>
      <Separator />
      <div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Notifications</div>
        <div style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}>
          Configure how you receive notifications.
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Vertical — inline between items
   ============================================================ */

export function SeparatorVerticalDemo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 14,
      }}
    >
      <span>One</span>
      <Separator orientation="vertical" style={{ height: 20 }} />
      <span>Two</span>
      <Separator orientation="vertical" style={{ height: 20 }} />
      <span>Three</span>
    </div>
  );
}
