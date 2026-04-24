'use client';

import { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { ButtonGroup } from '@plexui/ui/components/ButtonGroup';
import {
  ArrowLeftSm,
  ChevronDownMd,
  Copy,
  DotsHorizontal,
  Minus,
  PlusSm,
  Search,
} from '@plexui/ui/components/Icon';
import { Input } from '@plexui/ui/components/Input';
import { Menu } from '@plexui/ui/components/Menu';
import { Popover } from '@plexui/ui/components/Popover';
import { Select } from '@plexui/ui/components/Select';

/* ============================================================
   Overview — toolbar with nested groups + gap between subgroups
   ============================================================ */

export function ButtonGroupOverviewDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="sm"
          uniform
          aria-label="Go back"
        >
          <ArrowLeftSm />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Archive
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Report
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          Snooze
        </Button>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="sm"
          uniform
          aria-label="More options"
        >
          <DotsHorizontal />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

/* ============================================================
   Orientation — vertical stack for +/- stepper
   ============================================================ */

export function ButtonGroupOrientationDemo() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Zoom controls">
      <Button
        variant="outline"
        color="secondary"
        pill={false}
        size="sm"
        uniform
        aria-label="Zoom in"
      >
        <PlusSm />
      </Button>
      <Button
        variant="outline"
        color="secondary"
        pill={false}
        size="sm"
        uniform
        aria-label="Zoom out"
      >
        <Minus />
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Size — sm / md / lg side-by-side
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
   Separator — Copy | Paste with an explicit divider
   ============================================================ */

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="soft" color="secondary" pill={false} size="sm">
        <Copy /> Copy
      </Button>
      <ButtonGroup.Separator />
      <Button variant="soft" color="secondary" pill={false} size="sm">
        Paste
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Split — primary action + chevron/more trigger
   ============================================================ */

export function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup>
      <Button variant="solid" color="primary" pill={false}>
        Deploy
      </Button>
      <ButtonGroup.Separator />
      <Button variant="solid" color="primary" pill={false} uniform aria-label="More deploy options">
        <DotsHorizontal />
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Input — Input joined with a Button
   ============================================================ */

export function ButtonGroupInputDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search docs..." style={{ minWidth: 240 }} />
      <Button variant="outline" color="secondary" pill={false} uniform aria-label="Search">
        <Search />
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Dropdown Menu — primary action + chevron trigger wired to Menu
   ============================================================ */

export function ButtonGroupDropdownMenuDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" color="secondary" pill={false}>
        Export
      </Button>
      <Menu>
        <Menu.Trigger>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            uniform
            aria-label="Export options"
          >
            <ChevronDownMd />
          </Button>
        </Menu.Trigger>
        <Menu.Content align="end" minWidth={180}>
          <Menu.Item>Export as PDF</Menu.Item>
          <Menu.Item>Export as CSV</Menu.Item>
          <Menu.Item>Export as JSON</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Print…</Menu.Item>
        </Menu.Content>
      </Menu>
    </ButtonGroup>
  );
}

/* ============================================================
   Select — join a Select trigger into the group
   ============================================================ */

const REGION_OPTIONS = [
  { value: 'us-east-1', label: 'us-east-1' },
  { value: 'us-west-2', label: 'us-west-2' },
  { value: 'eu-central-1', label: 'eu-central-1' },
  { value: 'ap-southeast-1', label: 'ap-southeast-1' },
];

export function ButtonGroupSelectDemo() {
  const [region, setRegion] = useState('us-east-1');

  return (
    <ButtonGroup>
      <Button variant="outline" color="secondary" pill={false}>
        Deploy
      </Button>
      <Select
        options={REGION_OPTIONS}
        value={region}
        onChange={(opt) => setRegion(opt.value)}
        variant="outline"
        pill={false}
        block={false}
      />
    </ButtonGroup>
  );
}

/* ============================================================
   Popover — trailing trigger opens a popover panel
   ============================================================ */

export function ButtonGroupPopoverDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" color="secondary" pill={false}>
        Share link
      </Button>
      <Popover>
        <Popover.Trigger>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
            uniform
            aria-label="Share settings"
          >
            <DotsHorizontal />
          </Button>
        </Popover.Trigger>
        <Popover.Content minWidth={260} side="bottom" align="end">
          <div style={{ padding: 12 }}>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--font-text-sm-size)',
                fontWeight: 600,
              }}
            >
              Link sharing
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 'var(--font-text-sm-size)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Anyone with the link can view this project. Expires in 7 days.
            </p>
          </div>
        </Popover.Content>
      </Popover>
    </ButtonGroup>
  );
}
