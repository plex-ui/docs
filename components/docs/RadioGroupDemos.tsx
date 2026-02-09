'use client';

import React, { useState } from 'react';
import { RadioGroup } from '@plexui/ui/components/RadioGroup';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { TextLink } from '@plexui/ui/components/TextLink';
import { Tooltip } from '@plexui/ui/components/Tooltip';

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

export function RadioGroupHeroContent() {
  return (
    <RadioGroup defaultValue="chocolate" onChange={() => { }} aria-label="Options">
      <RadioGroup.Item value="chocolate">Chocolate</RadioGroup.Item>
      <RadioGroup.Item value="vanilla">Vanilla</RadioGroup.Item>
      <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
    </RadioGroup>
  );
}

export function RadioGroupBaseDemo() {
  const [frequency, setFrequency] = useState('daily');
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Notification frequency</h3>
      <RadioGroup
        direction="col"
        value={frequency}
        onChange={setFrequency}
        aria-label="Notification frequency"
      >
        <RadioGroup.Item value="daily">Daily</RadioGroup.Item>
        <RadioGroup.Item value="weekly">Weekly</RadioGroup.Item>
        <RadioGroup.Item value="monthly">Monthly</RadioGroup.Item>
        <RadioGroup.Item value="never">Never</RadioGroup.Item>
      </RadioGroup>
    </div>
  );
}

export function RadioGroupDirectionDemo() {
  const [direction, setDirection] = useState<'col' | 'row'>('col');
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="direction">
          <SegmentedControl<'col' | 'row'>
            value={direction}
            onChange={setDirection}
            aria-label="direction"
            size="xs"
          >
            <SegmentedControl.Option value="col">col</SegmentedControl.Option>
            <SegmentedControl.Option value="row">row</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div data-demo-stage className="flex-1 flex items-center justify-center py-12 w-full">
        <RadioGroup direction={direction} defaultValue="option1" aria-label="Sample options">
          <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
          <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </>
  );
}

export function RadioGroupDisabledDemo() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="flex-1 flex items-center justify-center py-12 w-full">
        <RadioGroup disabled={disabled} defaultValue="option1" aria-label="Sample options">
          <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
          <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
        </RadioGroup>
      </div>
    </>
  );
}

export function RadioGroupItemDisabledDemo() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="flex-1 flex items-center justify-center py-12 w-full">
        <RadioGroup aria-label="Sample options" className="max-w-[320px] m-auto" direction="col">
          <RadioGroup.Item value="option1" disabled={disabled}>
            Option 1
          </RadioGroup.Item>
          <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
          <RadioGroup.Item value="option3">
            This is long content that will wrap multiple lines to demonstrate how line-height affects
            rendering of the radio group
          </RadioGroup.Item>
        </RadioGroup>
      </div>
    </>
  );
}

export function RadioGroupCustomLayoutDemo() {
  return (
    <RadioGroup className="flex-col w-[390px] gap-4" onChange={() => { }} aria-label="Sample options">
      <RadioGroup.Item className="gap-2.5" value="basic">
        <div>
          <h4 className="font-semibold mb-1">Basic Plan</h4>
          <p className="text-secondary text-sm">5 GB storage • Email support • Free</p>
        </div>
      </RadioGroup.Item>
      <hr className="border-default" />
      <RadioGroup.Item className="gap-2.5" value="standard">
        <div>
          <h4 className="font-semibold mb-1">Standard Plan</h4>
          <p className="text-secondary text-sm">100 GB storage • Priority email support • $9.99/m</p>
        </div>
      </RadioGroup.Item>
      <hr className="border-default" />
      <Tooltip
        maxWidth={258}
        content={
          <>
            Contact our <TextLink href="#">support team</TextLink> for more information on enterprise plans.
          </>
        }
        interactive
      >
        <Tooltip.Trigger>
          <RadioGroup.Item className="gap-2.5" value="enterprise" disabled>
            <div>
              <h4 className="font-semibold mb-1">Enterprise Plan</h4>
              <p className="text-secondary text-sm">
                Unlimited storage • 24/7 phone support • Custom pricing
              </p>
            </div>
          </RadioGroup.Item>
        </Tooltip.Trigger>
      </Tooltip>
    </RadioGroup>
  );
}
