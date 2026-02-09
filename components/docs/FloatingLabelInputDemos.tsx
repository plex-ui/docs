'use client';

import React, { useState } from 'react';
import { FloatingLabelInput } from '@plexui/ui/components/FloatingLabelInput';
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

export function FloatingLabelInputWithClearButtonDemoWithControls() {
  const [value, setValue] = useState('clearable@example.com');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
        <DemoControlBoolean name="readOnly" value={readOnly} onChange={setReadOnly} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[360px]">
          <FloatingLabelInput
            label="Email address"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            onClear={() => setValue('')}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      </div>
    </>
  );
}

export function FloatingLabelInputDisabledDemoWithControls() {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="disabled" value={disabled} onChange={setDisabled} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[360px]">
          <FloatingLabelInput
            label="Email address"
            defaultValue="disabled@example.com"
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
