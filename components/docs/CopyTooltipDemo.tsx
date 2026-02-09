'use client';

import { useState } from 'react';
import { CopyTooltip, Tooltip } from '@plexui/ui/components/Tooltip';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { SliderValueControl } from './SliderValueControl';

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

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;
const ALIGN_OPTIONS = ['start', 'center', 'end'] as const;

function DemoControlRow({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

export function CopyTooltipBaseDemo() {
  const [openDelay, setOpenDelay] = useState(150);
  const [sideOffset, setSideOffset] = useState(5);
  const [alignOffset, setAlignOffset] = useState(0);
  const [side, setSide] = useState<(typeof SIDE_OPTIONS)[number]>('top');
  const [align, setAlign] = useState<(typeof ALIGN_OPTIONS)[number]>('center');

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="openDelay">
          <SliderValueControl
            ariaLabel="openDelay"
            min={0}
            max={1500}
            step={50}
            value={openDelay}
            onChange={setOpenDelay}
            width="min(42vw, 340px)"
          />
        </DemoControlRow>
        <DemoControlRow name="sideOffset">
          <SliderValueControl
            ariaLabel="sideOffset"
            min={0}
            max={40}
            step={1}
            value={sideOffset}
            onChange={setSideOffset}
            width="min(42vw, 340px)"
          />
        </DemoControlRow>
        <DemoControlRow name="alignOffset">
          <SliderValueControl
            ariaLabel="alignOffset"
            min={0}
            max={40}
            step={1}
            value={alignOffset}
            onChange={setAlignOffset}
            width="min(42vw, 340px)"
          />
        </DemoControlRow>
        <DemoControlRow name="side">
          <SegmentedControl<(typeof SIDE_OPTIONS)[number]>
            value={side}
            onChange={setSide}
            aria-label="side"
            size="xs"
          >
            {SIDE_OPTIONS.map((option) => (
              <SegmentedControl.Option key={option} value={option}>
                {option}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="align">
          <SegmentedControl<(typeof ALIGN_OPTIONS)[number]>
            value={align}
            onChange={setAlign}
            aria-label="align"
            size="xs"
          >
            {ALIGN_OPTIONS.map((option) => (
              <SegmentedControl.Option key={option} value={option}>
                {option}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div data-demo-stage>
        <CopyTooltip
          copyValue="Very cool content to copy"
          openDelay={openDelay}
          align={align}
          sideOffset={sideOffset}
          side={side}
          alignOffset={alignOffset}
        >
          <Tooltip.TriggerDecorator>sess_12345abcdefg</Tooltip.TriggerDecorator>
        </CopyTooltip>
      </div>
    </>
  );
}
