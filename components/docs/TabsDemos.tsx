'use client';

import React, { useState } from 'react';
import {
  Bell,
  Home,
  SettingsCog,
} from '@plexui/ui/components/Icon';
import { Tabs } from '@plexui/ui/components/Tabs';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Switch } from '@plexui/ui/components/Switch';

const controlsTableStyle: React.CSSProperties = {
  background: 'var(--docs-surface-elevated)',
  width: '100%',
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 16px 6px 8px',
  borderTop: '1px solid var(--color-fd-border)',
};

const controlLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: '0.8125rem',
  padding: '2px 8px',
};

function DemoControlBoolean({
  name,
  value,
  onChange,
}: {
  name: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const controlId = "demo-switch-" + name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={controlRowStyle}>
      <label htmlFor={controlId} style={controlLabelStyle}>{name}</label>
      <Switch id={controlId} checked={value} onCheckedChange={onChange} aria-label={name} />
    </div>
  );
}

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

const SIZE_OPTIONS = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
const VARIANT_OPTIONS = ['segmented', 'underline'] as const;
const ORIENTATION_OPTIONS = ['horizontal', 'vertical'] as const;

// ─── Overview demo with all controls ───
export function TabsOverviewDemo() {
  const [tab, setTab] = useState('overview');
  const [variant, setVariant] = useState<(typeof VARIANT_OPTIONS)[number]>('segmented');
  const [orientation, setOrientation] = useState<(typeof ORIENTATION_OPTIONS)[number]>('horizontal');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
  const [pill, setPill] = useState(true);
  const [block, setBlock] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="variant">
          <SegmentedControl value={variant} onChange={setVariant} size="xs" aria-label="variant">
            {VARIANT_OPTIONS.map((v) => (
              <SegmentedControl.Option key={v} value={v}>{v}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="orientation">
          <SegmentedControl value={orientation} onChange={setOrientation} size="xs" aria-label="orientation">
            {ORIENTATION_OPTIONS.map((o) => (
              <SegmentedControl.Option key={o} value={o}>{o}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="size">
          <SegmentedControl value={size} onChange={setSize} size="xs" aria-label="size">
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
        <DemoControlBoolean name="block" value={block} onChange={setBlock} />
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div className="flex-1 flex items-center justify-center py-12 w-full" data-demo-stage>
        <Tabs
          value={tab}
          onChange={setTab}
          variant={variant}
          orientation={orientation}
          size={size}
          pill={pill}
          block={block}
          disabled={disabled}
          aria-label="Demo tabs"
        >
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
          <Tabs.Tab value="reports">Reports</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
}

// ─── Underline horizontal ───
export function TabsUnderlineDemo() {
  const [tab, setTab] = useState('overview');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      aria-label="Sections"
    >
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
      <Tabs.Tab value="reports">Reports</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
    </Tabs>
  );
}

// ─── Underline block ───
export function TabsUnderlineBlockDemo() {
  const [tab, setTab] = useState('overview');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      block
      aria-label="Sections"
    >
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
      <Tabs.Tab value="reports">Reports</Tabs.Tab>
    </Tabs>
  );
}

// ─── Underline with icons ───
export function TabsUnderlineIconsDemo() {
  const [tab, setTab] = useState('home');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      size="lg"
      aria-label="Navigation"
    >
      <Tabs.Tab value="home" icon={<Home />}>Home</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
      <Tabs.Tab value="notifications" icon={<Bell />}>Notifications</Tabs.Tab>
    </Tabs>
  );
}

// ─── Underline with badge ───
export function TabsUnderlineBadgeDemo() {
  const [tab, setTab] = useState('all');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      size="lg"
      aria-label="Filter"
    >
      <Tabs.Tab value="all" badge={128}>All</Tabs.Tab>
      <Tabs.Tab value="unread" badge={{ content: 12, color: "info" }}>Unread</Tabs.Tab>
      <Tabs.Tab value="flagged" badge={{ content: 3, color: "danger" }}>Flagged</Tabs.Tab>
    </Tabs>
  );
}

// ─── Vertical segmented ───
export function TabsVerticalSegmentedDemo() {
  const [tab, setTab] = useState('account');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      orientation="vertical"
      aria-label="Settings"
    >
      <Tabs.Tab value="account">Account</Tabs.Tab>
      <Tabs.Tab value="password">Password</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      <Tabs.Tab value="display">Display</Tabs.Tab>
    </Tabs>
  );
}

// ─── Vertical underline ───
export function TabsVerticalUnderlineDemo() {
  const [tab, setTab] = useState('account');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      orientation="vertical"
      aria-label="Settings"
    >
      <Tabs.Tab value="account">Account</Tabs.Tab>
      <Tabs.Tab value="password">Password</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      <Tabs.Tab value="display">Display</Tabs.Tab>
    </Tabs>
  );
}

// ─── Vertical underline with icons ───
export function TabsVerticalUnderlineIconsDemo() {
  const [tab, setTab] = useState('home');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      orientation="vertical"
      size="lg"
      aria-label="Navigation"
    >
      <Tabs.Tab value="home" icon={<Home />}>Home</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
      <Tabs.Tab value="notifications" icon={<Bell />}>Notifications</Tabs.Tab>
    </Tabs>
  );
}

// ─── Disabled tab ───
export function TabsDisabledDemo() {
  const [tab, setTab] = useState('overview');

  return (
    <Tabs
      value={tab}
      onChange={setTab}
      variant="underline"
      aria-label="Sections"
    >
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
      <Tabs.Tab value="reports" disabled>Reports</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
    </Tabs>
  );
}

// ─── Sizing demo with interactive controls ───
export function TabsSizingDemo() {
  const [tab, setTab] = useState('overview');
  const [variant, setVariant] = useState<(typeof VARIANT_OPTIONS)[number]>('underline');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="variant">
          <SegmentedControl value={variant} onChange={setVariant} size="xs" aria-label="variant">
            {VARIANT_OPTIONS.map((v) => (
              <SegmentedControl.Option key={v} value={v}>{v}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="size">
          <SegmentedControl value={size} onChange={setSize} size="xs" aria-label="size">
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div className="flex-1 flex items-center justify-center py-12 w-full" data-demo-stage>
        <Tabs
          value={tab}
          onChange={setTab}
          variant={variant}
          size={size}
          aria-label="Demo tabs"
        >
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
          <Tabs.Tab value="reports">Reports</Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
}
