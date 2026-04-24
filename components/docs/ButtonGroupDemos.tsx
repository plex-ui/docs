'use client';

import { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { ButtonGroup } from '@plexui/ui/components/ButtonGroup';
import { Card } from '@plexui/ui/components/Card';
import {
  ArrowLeftSm,
  ArrowRightSm,
  ChevronDownMd,
  Copy,
  DotsHorizontal,
  Mic,
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
   Nested — two groups side-by-side (pagination + arrow nav)
   ============================================================ */

export function ButtonGroupNestedDemo() {
  return (
    <ButtonGroup aria-label="Pager">
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          1
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          2
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          3
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          4
        </Button>
        <Button variant="outline" color="secondary" pill={false} size="sm">
          5
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="sm"
          uniform
          aria-label="Previous page"
        >
          <ArrowLeftSm />
        </Button>
        <Button
          variant="outline"
          color="secondary"
          pill={false}
          size="sm"
          uniform
          aria-label="Next page"
        >
          <ArrowRightSm />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}

/* ============================================================
   Separator — Copy | Paste with an explicit divider
   ============================================================ */

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="soft" color="secondary" pill={false}>
        <Copy /> Copy
      </Button>
      <ButtonGroup.Separator />
      <Button variant="soft" color="secondary" pill={false}>
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
      <Button variant="soft" color="primary" pill={false}>
        Deploy
      </Button>
      <ButtonGroup.Separator />
      <Button variant="soft" color="primary" pill={false} uniform aria-label="More deploy options">
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
      <Input placeholder="Search docs..." />
      <Button variant="outline" color="secondary" pill={false} uniform aria-label="Search">
        <Search />
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Input Group — message composer with leading action + inline voice toggle
   ============================================================ */

export function ButtonGroupInputGroupDemo() {
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill uniform aria-label="Add attachment">
          <PlusSm />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Input
          pill
          placeholder={voiceEnabled ? 'Record and send audio…' : 'Send a message…'}
          disabled={voiceEnabled}
          endAdornment={
            <Button
              variant={voiceEnabled ? 'soft' : 'ghost'}
              color={voiceEnabled ? 'primary' : 'secondary'}
              size="2xs"
              pill
              uniform
              aria-label="Toggle voice mode"
              aria-pressed={voiceEnabled}
              onClick={() => setVoiceEnabled((prev) => !prev)}
            >
              <Mic />
            </Button>
          }
        />
      </ButtonGroup>
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
          <Card variant="ghost" size="sm">
            <Card.Header>
              <Card.Title>Link sharing</Card.Title>
              <Card.Description>
                Anyone with the link can view this project. Expires in 7 days.
              </Card.Description>
            </Card.Header>
          </Card>
        </Popover.Content>
      </Popover>
    </ButtonGroup>
  );
}
