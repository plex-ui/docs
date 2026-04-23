'use client';

/**
 * Shared Payment Method form body — composed from Plex primitives only,
 * no Card wrapper. Consumed by:
 *   - CardPaymentMethodDemo (wraps in <Card>)
 *   - LabelInFieldDemo (uses as-is, no surface)
 *
 * Spacing values come from the shadcn-measured reference in decision 0004.
 */

import { useState } from 'react';
import { Card } from '@plexui/ui/components/Card';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Field } from '@plexui/ui/components/Field';
import { Input } from '@plexui/ui/components/Input';
import { Textarea } from '@plexui/ui/components/Textarea';
import { Button } from '@plexui/ui/components/Button';
import { Select } from '@plexui/ui/components/Select';
import { Separator } from '@plexui/ui/components/Separator';

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const value = String(i + 1).padStart(2, '0');
  return { label: value, value };
});

const YEAR_OPTIONS = Array.from({ length: 6 }, (_, i) => {
  const value = String(2024 + i);
  return { label: value, value };
});

export function PaymentMethodForm() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Card.Header>
        <Card.Title>Payment Method</Card.Title>
        <Card.Description>
          All transactions are secure and encrypted
        </Card.Description>
      </Card.Header>

      <Field label="Name on Card">
        <Input placeholder="Aisha Cooper" />
      </Field>

      <Field label="Card Number" description="Enter your 16-digit card number">
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
            placeholder="MM"
            onChange={(params) => setMonth(params.value)}
          />
        </Field>
        <Field label="Year">
          <Select
            value={year}
            options={YEAR_OPTIONS}
            multiple={false}
            pill={false}
            placeholder="YYYY"
            onChange={(params) => setYear(params.value)}
          />
        </Field>
        <Field label="CVV">
          <Input placeholder="123" inputMode="numeric" />
        </Field>
      </div>

      <Separator />

      <Card.Header>
        <Card.Title>Billing Address</Card.Title>
        <Card.Description>
          The billing address associated with your payment method
        </Card.Description>
      </Card.Header>

      <Checkbox
        checked={sameAsShipping}
        onCheckedChange={setSameAsShipping}
        label="Same as shipping address"
      />

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
    </div>
  );
}
