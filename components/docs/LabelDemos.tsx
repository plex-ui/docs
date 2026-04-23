'use client';

import { useState } from 'react';
import { Label } from '@plexui/ui/components/Label';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { PaymentMethodForm } from './_shared/PaymentMethodForm';

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
   Label in Field — reuse the shared Payment Method form body
   (same composition shown inside a Card on /docs/components/card).
   Here it's rendered without the Card wrapper to highlight Field.
   ============================================================ */

export function LabelInFieldDemo() {
  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <PaymentMethodForm />
    </div>
  );
}
