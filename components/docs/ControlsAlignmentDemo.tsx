'use client';

import type React from 'react';
import { useState } from 'react';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { RadioGroup } from '@plexui/ui/components/RadioGroup';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Field } from '@plexui/ui/components/Field';

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

const DIRECTION_OPTIONS = ['row', 'col'] as const;

export function ControlsAlignmentDemo() {
  const [direction, setDirection] = useState<'row' | 'col'>('row');

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <div style={controlRowStyle}>
          <span style={controlLabelStyle}>direction</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SegmentedControl<'row' | 'col'>
              value={direction}
              onChange={setDirection}
              aria-label="direction"
              size="xs"
            >
              {DIRECTION_OPTIONS.map((d) => (
                <SegmentedControl.Option key={d} value={d}>
                  {d}
                </SegmentedControl.Option>
              ))}
            </SegmentedControl>
          </div>
        </div>
      </div>
      <div data-demo-stage className="flex-1 flex items-center justify-center py-12 w-full">
        <div className="flex flex-col gap-6">
          <Field label="Notification channel" description="Choose how you'd like to be notified.">
            {() => (
              <RadioGroup direction={direction} defaultValue="email" aria-label="Notification channel">
                <RadioGroup.Item value="email">
                  <div className="flex flex-col">
                    <span>Email</span>
                    <span className="text-xs text-secondary mt-0.5">Messages delivered to your inbox.</span>
                  </div>
                </RadioGroup.Item>
                <RadioGroup.Item value="sms">
                  <div className="flex flex-col">
                    <span>SMS</span>
                    <span className="text-xs text-secondary mt-0.5">Text messages to your phone number.</span>
                  </div>
                </RadioGroup.Item>
                <RadioGroup.Item value="push">
                  <div className="flex flex-col">
                    <span>Push</span>
                    <span className="text-xs text-secondary mt-0.5">Real-time alerts on your device.</span>
                  </div>
                </RadioGroup.Item>
              </RadioGroup>
            )}
          </Field>
          <Field label="Topics" description="Select the topics you want to follow.">
            {() => (
              <div className={`flex ${direction === 'row' ? 'flex-row gap-5' : 'flex-col gap-2.5'}`}>
                <Checkbox
                  defaultChecked
                  label={
                    <div className="flex flex-col">
                      <span>Product updates</span>
                      <span className="text-xs text-secondary mt-0.5">New features and improvements.</span>
                    </div>
                  }
                />
                <Checkbox
                  defaultChecked
                  label={
                    <div className="flex flex-col">
                      <span>Security alerts</span>
                      <span className="text-xs text-secondary mt-0.5">Account activity and login notifications.</span>
                    </div>
                  }
                />
                <Checkbox
                  label={
                    <div className="flex flex-col">
                      <span>Community</span>
                      <span className="text-xs text-secondary mt-0.5">Events, meetups, and discussions.</span>
                    </div>
                  }
                />
              </div>
            )}
          </Field>
        </div>
      </div>
    </>
  );
}
