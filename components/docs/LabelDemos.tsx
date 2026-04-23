'use client';

import { useState } from 'react';
import { Label } from '@plexui/ui/components/Label';
import { Input } from '@plexui/ui/components/Input';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Switch } from '@plexui/ui/components/Switch';

/* ============================================================
   Overview — label paired with a checkbox (shadcn parity usage)
   ============================================================ */

export function LabelOverviewDemo() {
  const [accepted, setAccepted] = useState(true);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Checkbox
        id="label-demo-newsletter"
        checked={accepted}
        onCheckedChange={setAccepted}
      />
      <Label htmlFor="label-demo-newsletter">
        Send me monthly release notes
      </Label>
    </div>
  );
}

/* ============================================================
   Standalone — label above an Input outside Field
   ============================================================ */

export function LabelInputDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        maxWidth: 280,
      }}
    >
      <Label htmlFor="label-demo-workspace">Workspace name</Label>
      <Input id="label-demo-workspace" placeholder="acme-platform" />
    </div>
  );
}

/* ============================================================
   Required — uses `required` prop to render a red star
   ============================================================ */

export function LabelRequiredDemo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        maxWidth: 280,
      }}
    >
      <Label htmlFor="label-demo-email" required>
        Email address
      </Label>
      <Input
        id="label-demo-email"
        type="email"
        placeholder="aisha@plexui.dev"
      />
    </div>
  );
}

/* ============================================================
   Inline with Switch — compact preference row
   ============================================================ */

export function LabelSwitchDemo() {
  const [on, setOn] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        maxWidth: 360,
      }}
    >
      <Label htmlFor="label-demo-notifs">Email notifications</Label>
      <Switch
        id="label-demo-notifs"
        checked={on}
        onCheckedChange={setOn}
      />
    </div>
  );
}
