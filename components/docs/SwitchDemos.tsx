'use client';

import { useState } from 'react';
import { Switch } from '@plexui/ui/components/Switch';

export function SwitchControlledDemo() {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
}
