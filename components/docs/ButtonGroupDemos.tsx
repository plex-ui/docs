'use client';

import { Button } from '@plexui/ui/components/Button';
import { ButtonGroup } from '@plexui/ui/components/ButtonGroup';
import {
  ArrowLeftSm,
  Copy,
  DotsHorizontal,
  Minus,
  PlusSm,
  Search,
} from '@plexui/ui/components/Icon';
import { Input } from '@plexui/ui/components/Input';

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
