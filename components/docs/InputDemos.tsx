'use client';

import React, { useState } from 'react';
import { Input } from '@plexui/ui/components/Input';
import { Button } from '@plexui/ui/components/Button';
import { Field } from '@plexui/ui/components/Field';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Search } from '@plexui/ui/components/Icon';

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
const GUTTER_OPTIONS = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

export function InputSizingDemo() {
  const [username, setUsername] = useState('');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('lg');
  const [gutterSize, setGutterSize] = useState<(typeof GUTTER_OPTIONS)[number]>('md');
  const [pill, setPill] = useState(false);
  const args = { size, gutterSize, pill };
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
      <div data-demo-stage className="py-10">
        <div className="flex flex-col gap-2.5 justify-start items-start w-[320px]">
          <Input {...args} placeholder="Enter text..." />
          <Input
            {...args}
            placeholder="Search..."
            startAdornment={<Search className="fill-tertiary" />}
          />
          <Input
            {...args}
            value={username}
            placeholder="Username"
            onChange={(evt) => setUsername(evt.target.value)}
            maxLength={16}
            endAdornment={
              <span className="mt-[1.5px] tabular-nums text-tertiary text-[.875em]">
                {username.length}/16
              </span>
            }
          />
        </div>
      </div>
    </>
  );
}

export function InputEndAdornmentDemo() {
  const [value, setValue] = useState('Clearable value');
  const [pill, setPill] = useState(true);
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
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
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Input
            placeholder="Enter text..."
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            onClear={() => setValue('')}
            pill={pill}
            size={size}
          />
        </div>
      </div>
    </>
  );
}

export function InputDisabledDemo() {
  const [disabled, setDisabled] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Input placeholder="Jane Doe" disabled={disabled} defaultValue="Jane Doe" />
        </div>
      </div>
    </>
  );
}

export function InputInvalidDemo() {
  const [invalid, setInvalid] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="invalid" value={invalid} onChange={setInvalid} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Input placeholder="Invalid input" invalid={invalid} />
        </div>
      </div>
    </>
  );
}

export function InputAutoSelectDemo() {
  const [autoSelect, setAutoSelect] = useState(false);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="autoSelect" value={autoSelect} onChange={setAutoSelect} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Input
            placeholder="Add text..."
            autoSelect={autoSelect}
            defaultValue="Toggle to auto select"
          />
        </div>
      </div>
    </>
  );
}

export function InputAutofillExtensionsDemo() {
  const [allowAutofillExtensions, setAllowAutofillExtensions] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean
          name="allowAutofillExtensions"
          value={allowAutofillExtensions}
          onChange={setAllowAutofillExtensions}
        />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Input
            key={String(allowAutofillExtensions)}
            name="email"
            allowAutofillExtensions={allowAutofillExtensions}
            placeholder={allowAutofillExtensions ? 'Allowed' : 'Not allowed'}
          />
        </div>
      </div>
    </>
  );
}

export function InputOpticalAlignDemo() {
  const [opticallyAlign, setOpticallyAlign] = useState(true);
  const [pill, setPill] = useState(true);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="opticallyAlign" value={opticallyAlign} onChange={setOpticallyAlign} />
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[400px]">
          <div className="border border-dashed border-alpha/20 rounded-md py-6 px-8">
            <div className="mb-5 text-secondary text-sm">
              {opticallyAlign ? 'opticallyAlign="start"' : "Default"}
            </div>
            <div className="flex flex-col gap-5">
              <Field
                label="Full name"
                opticallyAlign={opticallyAlign ? "start" : undefined}
              >
                <Input placeholder="Jane Doe" pill={pill} />
              </Field>
              <Field
                label="Email"
                description="We'll never share your email."
                errorMessage="Please enter a valid email address."
                required
                opticallyAlign={opticallyAlign ? "start" : undefined}
              >
                <Input placeholder="jane@example.com" pill={pill} />
              </Field>
            </div>
            <Button
              className="mt-6"
              color="primary"
              variant="soft"
              pill={pill}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export function InputWithButtonDemo() {
  const [variant, setVariant] = useState<'outline' | 'soft'>('outline');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('lg');
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="variant">
          <SegmentedControl<'outline' | 'soft'>
            value={variant}
            onChange={setVariant}
            aria-label="variant"
            size="xs"
          >
            <SegmentedControl.Option value="outline">outline</SegmentedControl.Option>
            <SegmentedControl.Option value="soft">soft</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
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
      </div>
      <div data-demo-stage className="py-10">
        <div className="flex w-[320px] gap-2">
          <Input placeholder="jane.doe@gmail.com" size={size} variant={variant} />
          <Button color="primary" size={size} variant={variant} pill={false}>
            Subscribe
          </Button>
        </div>
      </div>
    </>
  );
}
