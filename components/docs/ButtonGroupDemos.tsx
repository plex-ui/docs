'use client';

import { useState } from 'react';
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
import { Select } from '@plexui/ui/components/Select';
import { Separator } from '@plexui/ui/components/Separator';
import { Textarea } from '@plexui/ui/components/Textarea';

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
      <Button variant="soft" color="secondary" pill={false} size="sm">
        Copy
      </Button>
      <ButtonGroup.Separator />
      <Button variant="soft" color="secondary" pill={false} size="sm">
        Paste
      </Button>
    </ButtonGroup>
  );
}

/* ============================================================
   Split — primary action + inline extra-action trigger
   ============================================================ */

export function ButtonGroupSplitDemo() {
  return (
    <ButtonGroup>
      <Button variant="soft" color="secondary" pill={false}>
        Button
      </Button>
      <ButtonGroup.Separator />
      <Button variant="soft" color="secondary" pill={false} uniform aria-label="Add">
        <Plus />
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
      <Button variant="outline" color="secondary" pill={false} aria-label="Search">
        <SearchSm />
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
          <Plus />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Input
          pill
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
  );
}

/* ============================================================
   Dropdown Menu — primary action + chevron trigger wired to Menu
   ============================================================ */

export function ButtonGroupDropdownMenuDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" color="secondary" pill={false}>
        Follow
      </Button>
      <Menu>
        <Menu.Trigger>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
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
  const [currency, setCurrency] = useState('$');

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={(opt) => setCurrency(opt.value)}
          variant="outline"
          pill={false}
          block={false}
        />
        <Input placeholder="10.00" inputMode="decimal" />
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" color="secondary" pill={false} uniform aria-label="Send">
          <ArrowRight />
        </Button>
      </ButtonGroup>
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
        <Robot /> Copilot
      </Button>
      <Popover>
        <Popover.Trigger>
          <Button
            variant="outline"
            color="secondary"
            pill={false}
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
  );
}
