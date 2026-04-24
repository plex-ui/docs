'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { ButtonGroup } from '@plexui/ui/components/ButtonGroup';
import { Card } from '@plexui/ui/components/Card';
import {
  ArrowLeftSm,
  ArrowRight,
  ArrowRightSm,
  BellOff,
  ChevronDownMd,
  Copy,
  DotsHorizontal,
  Mic,
  Minus,
  Plus,
  PlusSm,
  RemoveTrash,
  Robot,
  SearchSm,
  Share,
  UserDelete,
} from '@plexui/ui/components/Icon';
import { Input } from '@plexui/ui/components/Input';
import { Menu } from '@plexui/ui/components/Menu';
import { Popover } from '@plexui/ui/components/Popover';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Select } from '@plexui/ui/components/Select';
import { Separator } from '@plexui/ui/components/Separator';
import { Textarea } from '@plexui/ui/components/Textarea';

/* ------------------------------------------------------------------
 * Shared demo-control primitives (same shape ButtonDemos / InputDemos use)
 * ------------------------------------------------------------------ */

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

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

const SIZE_OPTIONS = ['sm', 'md', 'lg'] as const;
type DemoSize = (typeof SIZE_OPTIONS)[number];

function SizeToggle({ value, onChange }: { value: DemoSize; onChange: (v: DemoSize) => void }) {
  return (
    <div data-demo-controls style={controlsTableStyle}>
      <DemoControlRow name="size">
        <SegmentedControl<DemoSize> value={value} onChange={onChange} aria-label="size" size="xs">
          {SIZE_OPTIONS.map((s) => (
            <SegmentedControl.Option key={s} value={s}>
              {s}
            </SegmentedControl.Option>
          ))}
        </SegmentedControl>
      </DemoControlRow>
    </div>
  );
}

function DemoStage({ children }: { children: React.ReactNode }) {
  return <div data-demo-stage>{children}</div>;
}

/**
 * Skip SSR for the demo subtree — stacking a Radix SegmentedControl (size
 * toggle) ahead of a Plex Input in the same tree causes React 19 useId
 * drift, because the SegmentedControl's nested useIds run before Input's
 * 1Password-prevention useId and the two renderers (SSR + CSR) disagree
 * on the counter position. Rendering null on first paint, then the real
 * tree post-mount, sidesteps the mismatch entirely.
 */
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

/* ============================================================
   Overview — toolbar with nested groups + gap between subgroups
   ============================================================ */

export function ButtonGroupOverviewDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            size={size}
            uniform
            aria-label="Go back"
          >
            <ArrowLeftSm />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            Archive
          </Button>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            Report
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            Snooze
          </Button>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            size={size}
            uniform
            aria-label="More options"
          >
            <DotsHorizontal />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Orientation — vertical stack for +/- stepper
   ============================================================ */

export function ButtonGroupOrientationDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup orientation="vertical" aria-label="Zoom controls">
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size={size}
          uniform
          aria-label="Zoom in"
        >
          <PlusSm />
        </Button>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size={size}
          uniform
          aria-label="Zoom out"
        >
          <Minus />
        </Button>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Size — sm / md / lg side-by-side (intentional showcase, no toggle)
   ============================================================ */

export function ButtonGroupSizeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Small
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Button
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Group
        </Button>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="sm"
          uniform
          aria-label="Add"
        >
          <PlusSm />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false}>
          Default
        </Button>
        <Button variant="outline" color="secondary" pill={false}>
          Button
        </Button>
        <Button variant="outline" color="secondary" pill={false}>
          Group
        </Button>
        <Button variant="outline" color="secondary" pill={false} uniform aria-label="Add">
          <PlusSm />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size="lg">
          Large
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="lg">
          Button
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="lg">
          Group
        </Button>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="lg"
          uniform
          aria-label="Add"
        >
          <PlusSm />
        </Button>
      </ButtonGroup>
    </div>
  );
}

/* ============================================================
   Nested — two groups side-by-side (pagination + arrow nav)
   ============================================================ */

export function ButtonGroupNestedDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup aria-label="Pager">
        <ButtonGroup>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            1
          </Button>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            2
          </Button>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            3
          </Button>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            4
          </Button>
          <Button variant="outline" color="secondary" pill={false} size={size}>
            5
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            size={size}
            uniform
            aria-label="Previous page"
          >
            <ArrowLeftSm />
          </Button>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            size={size}
            uniform
            aria-label="Next page"
          >
            <ArrowRightSm />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Separator — Copy | Paste with an explicit divider
   ============================================================ */

export function ButtonGroupSeparatorDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <Button variant="soft" color="secondary" pill={false} size={size}>
          Copy
        </Button>
        <ButtonGroup.Separator />
        <Button variant="soft" color="secondary" pill={false} size={size}>
          Paste
        </Button>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Split — primary action + inline extra-action trigger
   ============================================================ */

export function ButtonGroupSplitDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <Button variant="soft" color="secondary" pill={false} size={size}>
          Button
        </Button>
        <ButtonGroup.Separator />
        <Button
          variant="soft"
          color="secondary"
          pill={false}
          size={size}
          uniform
          aria-label="Add"
        >
          <Plus />
        </Button>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Input — Input joined with a Button
   ============================================================ */

export function ButtonGroupInputDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <Input placeholder="Search docs..." size={size} />
        <Button variant="outline" color="secondary" pill={false} size={size} aria-label="Search">
          <SearchSm />
        </Button>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Input Group — message composer with leading action + inline voice toggle
   ============================================================ */

export function ButtonGroupInputGroupDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            color="secondary"
            pill
            size={size}
            uniform
            aria-label="Add attachment"
          >
            <Plus />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Input
            pill
            size={size}
            placeholder={voiceEnabled ? 'Record and send audio…' : 'Send a message…'}
            disabled={voiceEnabled}
            endAdornment={
              <Input.AdornmentButton
                aria-label="Toggle voice mode"
                aria-pressed={voiceEnabled}
                onClick={() => setVoiceEnabled((prev) => !prev)}
              >
                <Mic />
              </Input.AdornmentButton>
            }
          />
        </ButtonGroup>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Dropdown Menu — primary action + chevron trigger wired to Menu
   ============================================================ */

export function ButtonGroupDropdownMenuDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size={size}>
          Follow
        </Button>
        <Menu>
          <Menu.Trigger>
            <Button
              variant="outline"
              color="secondary"
              pill={false}
              size={size}
              uniform
              aria-label="More follow options"
            >
              <ChevronDownMd />
            </Button>
          </Menu.Trigger>
          <Menu.Content align="end" minWidth={200}>
            <Menu.Item>
              <BellOff /> Mute conversation
            </Menu.Item>
            <Menu.Item>
              <Copy /> Copy link
            </Menu.Item>
            <Menu.Item>
              <Share /> Share
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>
              <UserDelete /> Unfollow
            </Menu.Item>
            <Menu.Item>
              <RemoveTrash /> Report
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Select — currency picker joined to an amount input + send
   ============================================================ */

const CURRENCY_OPTIONS = [
  { value: '$', label: '$ · US Dollar' },
  { value: '€', label: '€ · Euro' },
  { value: '£', label: '£ · British Pound' },
];

export function ButtonGroupSelectDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  const [currency, setCurrency] = useState('$');

  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <ButtonGroup>
          <Select
            options={CURRENCY_OPTIONS}
            value={currency}
            onChange={(opt) => setCurrency(opt.value)}
            variant="outline"
            pill={false}
            size={size}
            block={false}
          />
          <Input placeholder="10.00" size={size} inputMode="decimal" />
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            size={size}
            uniform
            aria-label="Send"
          >
            <ArrowRight />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}

/* ============================================================
   Popover — trailing trigger opens a popover panel
   ============================================================ */

export function ButtonGroupPopoverDemo() {
  const [size, setSize] = useState<DemoSize>('sm');
  return (
    <ClientOnly>
      <SizeToggle value={size} onChange={setSize} />
      <DemoStage>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size={size}>
          <Robot /> Copilot
        </Button>
        <Popover>
          <Popover.Trigger>
            <Button
              variant="outline"
              color="secondary"
              pill={false}
              size={size}
              uniform
              aria-label="Open Copilot"
            >
              <ChevronDownMd />
            </Button>
          </Popover.Trigger>
          <Popover.Content minWidth={320} side="bottom" align="end">
            <Card variant="ghost" size="sm">
              <Card.Header>
                <Card.Title>Agent tasks</Card.Title>
              </Card.Header>
              <Separator />
              <Card.Content>
                <Textarea placeholder="Describe your task in natural language." rows={3} />
                <Card.Title>Start a new task with Copilot</Card.Title>
                <Card.Description>
                  Describe your task in natural language. Copilot will work in the background and
                  open a pull request for your review.
                </Card.Description>
              </Card.Content>
            </Card>
          </Popover.Content>
        </Popover>
      </ButtonGroup>
      </DemoStage>
    </ClientOnly>
  );
}
