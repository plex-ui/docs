'use client';

import { useState } from 'react';
import { Label } from '@plexui/ui/components/Label';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Field } from '@plexui/ui/components/Field';
import { Input } from '@plexui/ui/components/Input';
import { Textarea } from '@plexui/ui/components/Textarea';
import { Button } from '@plexui/ui/components/Button';
import { Select } from '@plexui/ui/components/Select';
import { Separator } from '@plexui/ui/components/Separator';

/* ============================================================
   Overview — shadcn's primary Label demo (Checkbox + Label)
   ============================================================ */

export function LabelOverviewDemo() {
  const [accepted, setAccepted] = useState(true);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Checkbox
        id="label-demo-terms"
        checked={accepted}
        onCheckedChange={setAccepted}
      />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </div>
  );
}

/* ============================================================
   Label in Field — full Payment Method form, spacing mirrors
   shadcn's Field demo exactly:
   - outer form gap: 16px
   - section legend → description: margin-bottom 6px on the legend,
     margin-top -6px on the description, net visual gap = 0
   - 3-column grid gap: 16px
   ============================================================ */

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const value = String(i + 1).padStart(2, '0');
  return { label: value, value };
});

const YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) => {
  const value = String(2024 + i);
  return { label: value, value };
});

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  marginBottom: 6,
};

const sectionDescriptionStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.5,
  color: 'var(--color-text-tertiary)',
  marginTop: -6,
};

export function LabelInFieldDemo() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [month, setMonth] = useState('02');
  const [year, setYear] = useState('2026');

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
        maxWidth: 420,
      }}
    >
      <div>
        <div style={sectionTitleStyle}>Payment Method</div>
        <div style={sectionDescriptionStyle}>
          All transactions are secure and encrypted
        </div>
      </div>

      <Field label="Name on Card">
        <Input placeholder="Evil Rabbit" />
      </Field>

      <Field
        label="Card Number"
        description="Enter your 16-digit card number"
      >
        <Input placeholder="1234 5678 9012 3456" inputMode="numeric" />
      </Field>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}
      >
        <Field label="Month">
          <Select
            value={month}
            options={MONTH_OPTIONS}
            multiple={false}
            pill={false}
            onChange={(params) => setMonth(params.value)}
          />
        </Field>
        <Field label="Year">
          <Select
            value={year}
            options={YEAR_OPTIONS}
            multiple={false}
            pill={false}
            onChange={(params) => setYear(params.value)}
          />
        </Field>
        <Field label="CVV">
          <Input placeholder="123" inputMode="numeric" />
        </Field>
      </div>

      <Separator />

      <div>
        <div style={sectionTitleStyle}>Billing Address</div>
        <div style={sectionDescriptionStyle}>
          The billing address associated with your payment method
        </div>
      </div>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        <Checkbox
          checked={sameAsShipping}
          onCheckedChange={setSameAsShipping}
        />
        Same as shipping address
      </label>

      <Separator />

      <Field label="Comments">
        <Textarea placeholder="Add any additional comments" rows={3} />
      </Field>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button color="primary" variant="solid" pill={false}>
          Submit
        </Button>
        <Button color="secondary" variant="outline" pill={false}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
