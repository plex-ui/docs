'use client';

import React, { useState } from 'react';
import {
  Bell,
  DarkMode,
  Grid,
  Home,
  LightMode,
  Menu,
  SettingsCog,
  SystemMode,
} from '@plexui/ui/components/Icon';
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
  borderRadius: 6,
  background: 'var(--docs-surface-elevated)',
};
const exampleLabelStyle: React.CSSProperties = {
  color: 'var(--color-text-tertiary)',
  fontSize: '0.875rem',
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
const GUTTER_OPTIONS = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
const BADGE_COLORS = ['secondary', 'success', 'danger', 'info'] as const;
const BADGE_VARIANTS = ['soft', 'solid'] as const;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function SegmentedControlHeroDemo() {
  const [theme, setTheme] = useState('light');
  return (
    <SegmentedControl
      value={theme}
      onChange={(next) => setTheme(next)}
      aria-label="Select theme mode"
      gutterSize="sm"
    >
      <SegmentedControl.Option value="light" aria-label="Light mode">
        <LightMode />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="dark" aria-label="Dark mode">
        <DarkMode />
      </SegmentedControl.Option>
      <SegmentedControl.Option value="system" aria-label="System mode">
        <SystemMode />
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}

export function SegmentedControlBaseDemo() {
  const [view, setView] = useState('all');
  return (
    <SegmentedControl value={view} onChange={(next) => setView(next)} aria-label="Select view">
      <SegmentedControl.Option value="all">All</SegmentedControl.Option>
      <SegmentedControl.Option value="failed">Failed</SegmentedControl.Option>
      <SegmentedControl.Option value="successful">Successful</SegmentedControl.Option>
    </SegmentedControl>
  );
}

export function SegmentedControlSizingDemo() {
  const [view, setView] = useState('all');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('xl');
  const [gutterSize, setGutterSize] = useState<(typeof GUTTER_OPTIONS)[number]>('md');
  const [pill, setPill] = useState(false);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<(typeof SIZE_OPTIONS)[number]>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>
                {s}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="gutterSize">
          <SegmentedControl<(typeof GUTTER_OPTIONS)[number]>
            value={gutterSize}
            onChange={setGutterSize}
            aria-label="gutterSize"
            size="xs"
          >
            {GUTTER_OPTIONS.map((g) => (
              <SegmentedControl.Option key={g} value={g}>
                {g}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
      <div data-demo-stage className="py-12">
        <SegmentedControl
          value={view}
          onChange={(next) => setView(next)}
          aria-label="Select view"
          size={size}
          gutterSize={gutterSize}
          pill={pill}
        >
          <SegmentedControl.Option value="all">All</SegmentedControl.Option>
          <SegmentedControl.Option value="failed">Failed</SegmentedControl.Option>
          <SegmentedControl.Option value="successful">Successful</SegmentedControl.Option>
        </SegmentedControl>
      </div>
    </>
  );
}

export function SegmentedControlBlockDemo() {
  const [view, setView] = useState('all');
  const [block, setBlock] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="block" value={block} onChange={setBlock} />
      </div>
      <div data-demo-stage className="py-12">
        <div className="w-[420px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
          <SegmentedControl
            block={block}
            value={view}
            onChange={(next) => setView(next)}
            aria-label="Select view"
          >
            <SegmentedControl.Option value="all">All</SegmentedControl.Option>
            <SegmentedControl.Option value="failed">Failed</SegmentedControl.Option>
            <SegmentedControl.Option value="successful">Successful</SegmentedControl.Option>
          </SegmentedControl>
        </div>
      </div>
    </>
  );
}

export function SegmentedControlDisabledDemo() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="py-12">
        <SegmentedControl disabled={disabled} value="all" onChange={() => {}} aria-label="Select view">
          <SegmentedControl.Option value="all">All</SegmentedControl.Option>
          <SegmentedControl.Option value="failed">Failed</SegmentedControl.Option>
          <SegmentedControl.Option value="successful">Successful</SegmentedControl.Option>
        </SegmentedControl>
      </div>
    </>
  );
}

export function SegmentedControlDisabledOptionDemo() {
  const [view, setView] = useState('all');
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="py-12">
        <SegmentedControl value={view} onChange={(next) => setView(next)} aria-label="Select view">
          <SegmentedControl.Option value="all">All</SegmentedControl.Option>
          <SegmentedControl.Option value="failed">Failed</SegmentedControl.Option>
          <SegmentedControl.Option value="successful" disabled={disabled}>
            Successful
          </SegmentedControl.Option>
        </SegmentedControl>
      </div>
    </>
  );
}

export function SegmentedControlScrollableDemo() {
  const [value, setValue] = useState('1');
  return (
    <div className="max-w-[400px]">
      <div className="flex">
        <SegmentedControl value={value} onChange={setValue} aria-label="Long options demo">
          <SegmentedControl.Option value="1">Weird</SegmentedControl.Option>
          <SegmentedControl.Option value="2">use</SegmentedControl.Option>
          <SegmentedControl.Option value="3">of this</SegmentedControl.Option>
          <SegmentedControl.Option value="4">component</SegmentedControl.Option>
          <SegmentedControl.Option value="5">but showing</SegmentedControl.Option>
          <SegmentedControl.Option value="6">it can</SegmentedControl.Option>
          <SegmentedControl.Option value="7">become</SegmentedControl.Option>
          <SegmentedControl.Option value="8">scrollable</SegmentedControl.Option>
        </SegmentedControl>
      </div>
    </div>
  );
}

export function SegmentedControlNarrowPillDemo() {
  const [value, setValue] = useState('1');
  const [mode, setMode] = useState('light');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('3xl');
  const [gutterSize, setGutterSize] = useState<(typeof GUTTER_OPTIONS)[number]>('2xs');
  const [pill, setPill] = useState(true);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<(typeof SIZE_OPTIONS)[number]>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>
                {s}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="gutterSize">
          <SegmentedControl<(typeof GUTTER_OPTIONS)[number]>
            value={gutterSize}
            onChange={setGutterSize}
            aria-label="gutterSize"
            size="xs"
          >
            {GUTTER_OPTIONS.map((g) => (
              <SegmentedControl.Option key={g} value={g}>
                {g}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
      <div data-demo-stage className="py-12">
        <div className="flex flex-col items-center gap-8">
          <SegmentedControl
            size={size}
            gutterSize={gutterSize}
            pill={pill}
            block={false}
            value={value}
            onChange={setValue}
            aria-label="Select number"
          >
            <SegmentedControl.Option value="1">1</SegmentedControl.Option>
            <SegmentedControl.Option value="2">2</SegmentedControl.Option>
            <SegmentedControl.Option value="3">3</SegmentedControl.Option>
          </SegmentedControl>

          <SegmentedControl
            size={size}
            gutterSize={gutterSize}
            pill={pill}
            block={false}
            value={mode}
            onChange={setMode}
            aria-label="Select mode"
          >
            <SegmentedControl.Option value="light" aria-label="Light mode">
              <LightMode />
            </SegmentedControl.Option>
            <SegmentedControl.Option value="dark" aria-label="Dark mode">
              <DarkMode />
            </SegmentedControl.Option>
            <SegmentedControl.Option value="system" aria-label="System mode">
              <SystemMode />
            </SegmentedControl.Option>
          </SegmentedControl>
        </div>
      </div>
    </>
  );
}

export function SegmentedControlIconOnlyDemo() {
  const [view, setView] = useState('grid');
  return (
    <SegmentedControl value={view} onChange={setView} aria-label="Select view mode" size="md">
      <SegmentedControl.Option value="grid" icon={<Grid />} aria-label="Grid view" />
      <SegmentedControl.Option value="list" icon={<Menu />} aria-label="List view" />
    </SegmentedControl>
  );
}

export function SegmentedControlIconAndTextDemo() {
  const [tab, setTab] = useState('home');
  return (
    <SegmentedControl value={tab} onChange={setTab} aria-label="Select section" size="lg">
      <SegmentedControl.Option value="home" icon={<Home />}>
        Home
      </SegmentedControl.Option>
      <SegmentedControl.Option value="settings" icon={<SettingsCog />}>
        Settings
      </SegmentedControl.Option>
      <SegmentedControl.Option value="notifications" icon={<Bell />}>
        Notifications
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}

export function SegmentedControlWithBadgeDemo() {
  const [tab, setTab] = useState('all');
  return (
    <SegmentedControl value={tab} onChange={setTab} aria-label="Select filter" size="lg">
      <SegmentedControl.Option value="all" badge={128}>
        All
      </SegmentedControl.Option>
      <SegmentedControl.Option value="unread" badge={{ content: 12, color: 'info' }}>
        Unread
      </SegmentedControl.Option>
      <SegmentedControl.Option value="flagged" badge={{ content: 3, color: 'danger' }}>
        Flagged
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}

export function SegmentedControlIconTextBadgeDemo() {
  const [tab, setTab] = useState('inbox');
  return (
    <SegmentedControl value={tab} onChange={setTab} aria-label="Select mailbox" size="xl">
      <SegmentedControl.Option value="inbox" icon={<Home />} badge={24}>
        Inbox
      </SegmentedControl.Option>
      <SegmentedControl.Option
        value="notifications"
        icon={<Bell />}
        badge={{ content: 5, color: 'danger' }}
      >
        Alerts
      </SegmentedControl.Option>
      <SegmentedControl.Option value="settings" icon={<SettingsCog />}>
        Settings
      </SegmentedControl.Option>
    </SegmentedControl>
  );
}

export function SegmentedControlBadgeVariantsDemo() {
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
  const [pill, setPill] = useState(true);
  const [badgePill, setBadgePill] = useState(true);
  const [softSelected, setSoftSelected] = useState('secondary');
  const [solidSelected, setSolidSelected] = useState('danger');

  const states = {
    soft: [softSelected, setSoftSelected],
    solid: [solidSelected, setSolidSelected],
  } as const;

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<(typeof SIZE_OPTIONS)[number]>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>
                {s}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
        <DemoControlBoolean name="badgePill" value={badgePill} onChange={setBadgePill} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="flex flex-col justify-center gap-6 min-h-[320px]">
          {BADGE_VARIANTS.map((variant) => {
            const [selected, setSelected] = states[variant];
            return (
              <div key={variant} className="flex flex-col items-start gap-2">
                <span style={exampleLabelStyle}>{capitalize(variant)}</span>
                <SegmentedControl
                  value={selected}
                  onChange={setSelected}
                  aria-label={`Badge ${variant} variants`}
                  size={size}
                  pill={pill}
                >
                  {BADGE_COLORS.map((color) => (
                    <SegmentedControl.Option
                      key={color}
                      value={color}
                      badge={{ content: 5, color, variant, pill: badgePill }}
                    >
                      {capitalize(color)}
                    </SegmentedControl.Option>
                  ))}
                </SegmentedControl>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
