'use client';

import { useState } from 'react';
import { Checkbox } from '@plexui/ui/components/Checkbox';

export function CheckboxIndeterminateDemo() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={() =>
        setChecked((c) => (c === 'indeterminate' ? true : c ? false : 'indeterminate'))
      }
      label="Indeterminate"
    />
  );
}
