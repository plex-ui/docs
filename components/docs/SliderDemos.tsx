'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Tooltip } from '@plexui/ui/components/Tooltip';
import { Switch } from '@plexui/ui/components/Switch';

const Slider = dynamic(
  () => import('@plexui/ui/components/Slider').then((mod) => mod.Slider),
  { ssr: false }
);

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

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

export function SliderBaseDemo({ disabled = false }: { disabled?: boolean }) {
  const mounted = useMounted();
  const [value, setValue] = useState(1000);
  if (!mounted) return <div style={{ width: 300, height: 48 }} />;
  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 300 }}>
        <Slider
          label="Example field"
          min={0}
          max={2000}
          resetValue={1000}
          step={10}
          unit="ms"
          value={value}
          onChange={setValue}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export function SliderBaseDemoWithControls() {
  const [disabled, setDisabled] = useState(false);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <SliderBaseDemo disabled={disabled} />
    </>
  );
}

export function SliderTooltipsDemo() {
  const mounted = useMounted();
  const [value, setValue] = useState(1000);
  if (!mounted) return <div style={{ width: 300, height: 48 }} />;
  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 300 }}>
        <Slider
          label={
            <Tooltip content="More details about this field">
              <Tooltip.TriggerDecorator>Example field</Tooltip.TriggerDecorator>
            </Tooltip>
          }
          min={0}
          max={2000}
          resetValue={1000}
          step={10}
          unit="ms"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}

export function SliderMarksDemo() {
  const mounted = useMounted();
  const [value, setValue] = useState(3);
  if (!mounted) return <div style={{ width: 300, height: 64 }} />;
  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-20 w-full">
      <div style={{ width: 300 }}>
        <Slider
          value={value}
          label="Passing grade"
          min={1}
          max={5}
          step={1}
          onChange={setValue}
          marks={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ]}
          trackColor="#61C454"
          rangeColor="#EF4146"
        />
      </div>
    </div>
  );
}
