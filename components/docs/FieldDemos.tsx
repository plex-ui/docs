'use client';

import React, { useState } from 'react';
import { Field } from '@plexui/ui/components/Field';
import { Input } from '@plexui/ui/components/Input';
import { Textarea } from '@plexui/ui/components/Textarea';
import { Select } from '@plexui/ui/components/Select';
import { Button } from '@plexui/ui/components/Button';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Switch } from '@plexui/ui/components/Switch';
import { RadioGroup } from '@plexui/ui/components/RadioGroup';
import dynamic from 'next/dynamic';

const Slider = dynamic(
  () => import('@plexui/ui/components/Slider').then((mod) => mod.Slider),
  { ssr: false }
);
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';

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

export function FieldOverviewDemo() {
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
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
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Field label="Email" size={size}>
            <Input placeholder="Enter email..." size={size} />
          </Field>
        </div>
      </div>
    </>
  );
}

export function FieldWithDescriptionDemo() {
  return (
    <div className="w-[320px]">
      <Field
        label="Email"
        description="We'll never share your email with anyone else."
      >
        <Input placeholder="Enter email..." />
      </Field>
    </div>
  );
}

export function FieldWithErrorDemo() {
  const [showError, setShowError] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="errorMessage" value={showError} onChange={setShowError} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Field
            label="Email"
            errorMessage={showError ? 'Please enter a valid email address' : undefined}
          >
            <Input placeholder="Enter email..." />
          </Field>
        </div>
      </div>
    </>
  );
}

export function FieldRequiredDemo() {
  const [required, setRequired] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="required" value={required} onChange={setRequired} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px]">
          <Field label="Email" required={required}>
            <Input placeholder="Enter email..." />
          </Field>
        </div>
      </div>
    </>
  );
}

export function FieldOrientationDemo() {
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('horizontal');
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="orientation">
          <SegmentedControl<'vertical' | 'horizontal'>
            value={orientation}
            onChange={setOrientation}
            aria-label="orientation"
            size="xs"
          >
            <SegmentedControl.Option value="vertical">vertical</SegmentedControl.Option>
            <SegmentedControl.Option value="horizontal">horizontal</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[480px] flex flex-col gap-4">
          <Field label="First name" orientation={orientation}>
            <Input placeholder="Jane" />
          </Field>
          <Field label="Last name" orientation={orientation}>
            <Input placeholder="Doe" />
          </Field>
        </div>
      </div>
    </>
  );
}

export function FieldWithTextareaDemo() {
  return (
    <div className="w-[320px]">
      <Field label="Bio" description="Write a short bio for your profile.">
        <Textarea placeholder="Tell us about yourself..." rows={3} />
      </Field>
    </div>
  );
}

export function FieldWithSelectDemo() {
  const [role, setRole] = useState('');
  return (
    <div className="w-[320px]">
      <Field label="Role" description="Select your primary role.">
        {(fieldProps) => (
          <Select
            id={fieldProps.id}
            placeholder="Select a role..."
            value={role}
            onChange={(opt) => setRole(opt.value)}
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        )}
      </Field>
    </div>
  );
}

export function FieldWithSliderDemo() {
  const [price, setPrice] = useState<number[]>([200, 800]);
  return (
    <div className="w-[400px]">
      <Field label="Price Range" description={`Set your budget range ($${price[0].toLocaleString()} – ${price[1].toLocaleString()}).`}>
        <Slider
          range
          value={price}
          onChange={setPrice}
          min={0}
          max={1000}
          step={10}
          prefixUnit="$"
        />
      </Field>
    </div>
  );
}

export function FieldFieldsetDemo() {
  return (
    <div className="w-[400px]">
      <div className="mb-3">
        <h3 className="text-base font-semibold">Address Information</h3>
        <p className="text-sm text-secondary mt-1">We need your address to deliver your order.</p>
      </div>
      <div className="flex flex-col gap-4">
        <Field label="Street Address">
          <Input placeholder="123 Main St" />
        </Field>
        <div className="flex gap-3">
          <Field label="City" className="flex-1">
            <Input placeholder="New York" />
          </Field>
          <Field label="Postal Code" className="flex-1">
            <Input placeholder="90502" />
          </Field>
        </div>
      </div>
    </div>
  );
}

export function FieldWithCheckboxGroupDemo() {
  return (
    <div className="w-[320px]">
      <Field label="Notifications" description="Choose which notifications you'd like to receive.">
        {() => (
          <div className="flex flex-col gap-3 mt-1">
            <Checkbox label="Email notifications" />
            <Checkbox label="Push notifications" />
            <Checkbox label="SMS notifications" />
          </div>
        )}
      </Field>
    </div>
  );
}

export function FieldWithRadioGroupDemo() {
  const [plan, setPlan] = useState('free');
  return (
    <div className="w-[320px]">
      <Field label="Subscription plan" description="Select your preferred plan.">
        {(fieldProps) => (
          <RadioGroup
            aria-label="Subscription plan"
            value={plan}
            onChange={setPlan}
            direction="col"
          >
            <RadioGroup.Item value="free">Free</RadioGroup.Item>
            <RadioGroup.Item value="pro">Pro — $9/mo</RadioGroup.Item>
            <RadioGroup.Item value="enterprise">Enterprise — $29/mo</RadioGroup.Item>
          </RadioGroup>
        )}
      </Field>
    </div>
  );
}

export function FieldWithSwitchDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="self-stretch mx-auto !max-w-[480px]">
      <Field label="Marketing emails" orientation="horizontal" className="items-center justify-between [--field-label-horizontal-min-width:auto] [--field-label-horizontal-offset:0px]">
        {(fieldProps) => (
          <Switch
            id={fieldProps.id}
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        )}
      </Field>
    </div>
  );
}

export function FieldGroupDemo() {
  return (
    <div className="w-[400px] divide-y divide-alpha/15">
      <div className="pb-6">
        <Field
          label="Responses"
          description="Get notified when ChatGPT responds to requests that take time, like research or image generation."
        >
          {() => (
            <div className="flex flex-col gap-3 mt-1">
              <Checkbox label="Push notifications" defaultChecked />
            </div>
          )}
        </Field>
      </div>
      <div className="py-6">
        <Field
          label="Tasks"
          description="Get notified when tasks you've created have updates."
        >
          {() => (
            <div className="flex flex-col gap-3 mt-1">
              <Checkbox label="Push notifications" />
              <Checkbox label="Email notifications" />
            </div>
          )}
        </Field>
      </div>
    </div>
  );
}

export function FieldValidationDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('bad-email');
  const [submitted, setSubmitted] = useState(true);

  const nameError = submitted && !name ? 'Name is required' : undefined;
  const emailError = submitted && !email.includes('@') ? 'Please enter a valid email address' : undefined;

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="show errors" value={submitted} onChange={setSubmitted} />
      </div>
      <div data-demo-stage className="py-10">
        <div className="w-[320px] flex flex-col gap-4">
          <Field label="Name" required errorMessage={nameError}>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
          </Field>
          <Field label="Email" required errorMessage={emailError}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </Field>
        </div>
      </div>
    </>
  );
}

export function FieldFormExampleDemo() {
  const [pill, setPill] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>

      <div data-demo-stage>
        <div className="flex flex-col gap-8 w-full !max-w-[460px]">
          {/* ─── Payment Method ─── */}
          <fieldset className="flex flex-col gap-5">
            <div className="mb-1">
              <h3 className="text-base font-semibold">Payment Method</h3>
              <p className="text-sm text-secondary mt-0.5">All transactions are secure and encrypted</p>
            </div>

            <Field label="Name on Card">
              <Input placeholder="Evil Rabbit" pill={pill} />
            </Field>

            <Field label="Card Number">
              <Input placeholder="1234 5678 9012 3456" pill={pill} />
            </Field>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Month">
                {(fieldProps) => (
                  <Select
                    id={fieldProps.id}
                    placeholder="MM"
                    pill={pill}
                    value={month}
                    onChange={(opt) => setMonth(opt.value)}
                    options={Array.from({ length: 12 }, (_, i) => {
                      const v = String(i + 1).padStart(2, '0');
                      return { label: v, value: v };
                    })}
                  />
                )}
              </Field>
              <Field label="Year">
                {(fieldProps) => (
                  <Select
                    id={fieldProps.id}
                    placeholder="YYYY"
                    pill={pill}
                    value={year}
                    onChange={(opt) => setYear(opt.value)}
                    options={Array.from({ length: 10 }, (_, i) => {
                      const v = String(2025 + i);
                      return { label: v, value: v };
                    })}
                  />
                )}
              </Field>
              <Field label="CVV">
                <Input placeholder="123" pill={pill} />
              </Field>
            </div>
          </fieldset>

          <hr className="border-default" />

          {/* ─── Billing Address ─── */}
          <fieldset className="flex flex-col gap-5">
            <div className="mb-1">
              <h3 className="text-base font-semibold">Billing Address</h3>
              <p className="text-sm text-secondary mt-0.5">The billing address associated with your payment method</p>
            </div>

            <Checkbox label="Same as shipping address" defaultChecked />

            <Field label="Comments">
              <Textarea placeholder="Add any additional comments" rows={3} />
            </Field>
          </fieldset>

          <div className="flex gap-2">
            <Button color="primary" pill={pill}>Submit</Button>
            <Button color="secondary" variant="outline" pill={pill}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
}
