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
const BOOL_OPTIONS = ['true', 'false'] as const;
export function ControlsAlignmentDemo() {
  const [direction, setDirection] = useState<'row' | 'col'>('row');
  const [showDesc, setShowDesc] = useState<'true' | 'false'>('true');
  const hasDescription = showDesc === 'true';
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
        <div style={controlRowStyle}>
          <span style={controlLabelStyle}>description</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SegmentedControl<'true' | 'false'>
              value={showDesc}
              onChange={setShowDesc}
              aria-label="description"
              size="xs"
            >
              {BOOL_OPTIONS.map((d) => (
                <SegmentedControl.Option key={d} value={d}>
                  {d}
                </SegmentedControl.Option>
              ))}
            </SegmentedControl>
          </div>
        </div>
      </div>
      <div data-demo-stage className="flex-1 flex items-center justify-center py-12 w-full">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Field label="Notification channel" description="Choose how you'd like to be notified.">
            {() => (
              <RadioGroup direction={direction} defaultValue="email" aria-label="Notification channel">
                <RadioGroup.Item value="email">
                  {hasDescription ? (
                    <div className="flex flex-col">
                      <span className="font-medium">Email</span>
                      <span className="text-xs text-secondary mt-0.5">Messages delivered to your inbox.</span>
                    </div>
                  ) : 'Email'}
                </RadioGroup.Item>
                <RadioGroup.Item value="sms">
                  {hasDescription ? (
                    <div className="flex flex-col">
                      <span className="font-medium">SMS</span>
                      <span className="text-xs text-secondary mt-0.5">Text messages to your phone number.</span>
                    </div>
                  ) : 'SMS'}
                </RadioGroup.Item>
                <RadioGroup.Item value="push">
                  {hasDescription ? (
                    <div className="flex flex-col">
                      <span className="font-medium">Push</span>
                      <span className="text-xs text-secondary mt-0.5">Real-time alerts on your device.</span>
                    </div>
                  ) : 'Push'}
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
                    hasDescription ? (
                      <div className="flex flex-col">
                        <span className="font-medium">Product updates</span>
                        <span className="text-xs text-secondary mt-0.5">New features and improvements.</span>
                      </div>
                    ) : 'Product updates'
                  }
                />
                <Checkbox
                  defaultChecked
                  label={
                    hasDescription ? (
                      <div className="flex flex-col">
                        <span className="font-medium">Security alerts</span>
                        <span className="text-xs text-secondary mt-0.5">Account activity and login notifications.</span>
                      </div>
                    ) : 'Security alerts'
                  }
                />
                <Checkbox
                  label={
                    hasDescription ? (
                      <div className="flex flex-col">
                        <span className="font-medium">Community</span>
                        <span className="text-xs text-secondary mt-0.5">Events, meetups, and discussions.</span>
                      </div>
                    ) : 'Community'
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
