'use client';

import { useState, type ReactNode } from 'react';
import { Plus, SettingsSlider, User, UserLock, Workspace } from '@plexui/ui/components/Icon';
import { Select } from '@plexui/ui/components/Select';
import { Popover } from '@plexui/ui/components/Popover';
import { Switch } from '@plexui/ui/components/Switch';
import { Button } from '@plexui/ui/components/Button';

const fruitsOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Watermelon', value: 'watermelon' },
];

const items = [
  { label: 'List item 1', value: '1' },
  { label: 'List item 2', value: '2' },
  { label: 'List item 3', value: '3', disabled: true },
  { label: 'List item 4', value: '4' },
  { label: 'List item 5', value: '5' },
  { label: 'List item 6', value: '6' },
  { label: 'List item 7', value: '7' },
  { label: 'List item 8', value: '8' },
];

const groupedItems = [
  {
    label: 'Plans',
    options: [
      {
        label: 'Enterprise Plus',
        value: '1',
        tooltip: {
          content: 'Advanced features with priority support and SLA',
          maxWidth: 248,
        },
      },
      {
        label: 'Enterprise',
        value: '1o',
        tooltip: {
          content: 'Full-featured plan for large organizations',
          maxWidth: 248,
        },
      },
      { label: 'Professional Plus', value: '2' },
      { label: 'Professional', value: '3' },
      { label: 'Basic Plus', value: '4' },
      { label: 'Basic', value: '5' },
      { label: 'Starter', value: '6' },
      { label: 'Free', value: '7' },
      { label: 'Team Advanced', value: '4a' },
      { label: 'Team Standard', value: '4b' },
      { label: 'Team Basic', value: '4c' },
      { label: 'Business Premium', value: '4d' },
      { label: 'Business Standard', value: '4e' },
      { label: 'Business Lite', value: '4f' },
      { label: 'Individual Pro', value: '4g' },
      { label: 'Individual', value: '4h' },
      { label: 'Premium Legacy', value: '4omega' },
      { label: 'Standard Legacy', value: '4ultra' },
    ],
    optionsLimit: {
      limit: 7,
      label: 'Show all',
    },
  },
  {
    label: 'Custom Deployments',
    options: [
      { label: 'Production US-East (v2.4.1)', value: 'ft1' },
      { label: 'Production EU-West (v2.4.0)', value: 'ft2' },
      { label: 'Staging US-West (v2.5.0-rc1)', value: 'ft3' },
      { label: 'Development (latest)', value: 'ft4' },
      { label: 'QA Environment (v2.4.1)', value: 'ft5' },
    ],
    optionsLimit: {
      limit: 100,
      label: 'Show all',
    },
  },
];

const RoleOptionDescription = ({ children }: { children: ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">{children}</div>
);

type Role = {
  value: string;
  label: string;
  description: ReactNode;
};

const roles: Role[] = [
  {
    value: 'owner',
    label: 'Owner',
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: 'reader',
    label: 'Reader',
    description: (
      <RoleOptionDescription>
        Can make API requests that read or modify data
      </RoleOptionDescription>
    ),
  },
];

export function SelectBaseDemo() {
  const [fruit, setFruit] = useState<string>('');
  return (
    <div style={{ width: 200 }}>
      <Select
        placeholder="Select a fruit..."
        multiple={false}
        value={fruit}
        options={fruitsOptions}
        name="fruits"
        onChange={(params) => setFruit(params.value)}
      />
    </div>
  );
}

export function SelectCustomViewsDemo() {
  const [role, setRole] = useState<string>('reader');

  return (
    <div style={{ width: 200 }}>
      <Select
        value={role}
        options={roles}
        placeholder="Select role..."
        align="start"
        listMinWidth={260}
        variant="ghost"
        size="lg"
        onChange={({ value }) => setRole(value)}
        TriggerStartIcon={role === 'owner' ? UserLock : User}
        triggerClassName="font-semibold"
        optionClassName="font-semibold"
      />
    </div>
  );
}

export function SelectActionsDemo() {
  const [value, setValue] = useState<string>('');

  return (
    <div style={{ width: 150 }}>
      <Select
        variant="soft"
        value={value}
        block
        options={items}
        placeholder="Select..."
        align="start"
        listMinWidth={240}
        onChange={(v) => setValue(v.value)}
        triggerClassName="font-semibold"
        actions={[
          { id: 'create', label: 'Create project', Icon: Plus, onSelect: () => {} },
          { id: 'overview', label: 'Organization overview', Icon: Workspace, onSelect: () => {} },
        ]}
      />
    </div>
  );
}

export function SelectGroupedOptionsDemo() {
  const [value, setValue] = useState<string>('1');

  return (
    <div style={{ width: 200 }}>
      <Select
        variant="outline"
        value={value}
        side="bottom"
        size="lg"
        options={groupedItems}
        listMinWidth={300}
        searchPlaceholder="Select an option..."
        clearable
        onChange={(v) => setValue(v.value)}
      />
    </div>
  );
}

function MultiFruitTriggerView({
  values,
  selectedAll,
}: {
  values: { label: string }[];
  selectedAll: boolean;
}) {
  const displayValue = selectedAll
    ? 'All fruits'
    : values.length === 1
      ? values[0].label
      : `${values.length} fruits`;

  return <>{displayValue}</>;
}

export function SelectMultiSelectDemo() {
  const [fruits, setFruits] = useState<string[]>([]);

  return (
    <div style={{ width: 200 }}>
      <Select
        variant="soft"
        placeholder="Select fruits..."
        options={fruitsOptions}
        name="fruits"
        multiple
        clearable
        value={fruits}
        onChange={(values) => setFruits(values.map(({ value }) => value))}
        TriggerView={MultiFruitTriggerView}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column configuration demo (Popover + Switch)
// ---------------------------------------------------------------------------

const ALL_COLUMNS = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'created', label: 'Created at' },
  { id: 'lastLogin', label: 'Last login' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'phone', label: 'Phone' },
];

const DEFAULT_SHOWN_COLUMNS = ['name', 'email', 'role', 'status'];

export function SelectColumnConfigDemo() {
  const [shown, setShown] = useState<string[]>(DEFAULT_SHOWN_COLUMNS);

  const toggle = (id: string) => {
    setShown((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const shownColumns = ALL_COLUMNS.filter((c) => shown.includes(c.id));
  const hiddenColumns = ALL_COLUMNS.filter((c) => !shown.includes(c.id));

  return (
    <Popover>
      <Popover.Trigger>
        <Button color="secondary" variant="outline" size="sm">
          <SettingsSlider width={15} height={15} /> Columns
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth={240} side="bottom" align="start">
        <div className="py-1.5">
          {shownColumns.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs font-medium text-tertiary uppercase tracking-wide">
                Shown attributes
              </div>
              {shownColumns.map((col) => (
                <div
                  key={col.id}
                  className="flex items-center justify-between gap-4 px-3 py-1.5 cursor-pointer hover:bg-alpha/5"
                  onClick={() => toggle(col.id)}
                >
                  <span className="text-sm">{col.label}</span>
                  <Switch checked onCheckedChange={() => toggle(col.id)} />
                </div>
              ))}
            </div>
          )}
          {hiddenColumns.length > 0 && (
            <div className={shownColumns.length > 0 ? 'mt-1 border-t border-alpha/10 pt-1' : ''}>
              <div className="px-3 py-1.5 text-xs font-medium text-tertiary uppercase tracking-wide">
                Hidden attributes
              </div>
              {hiddenColumns.map((col) => (
                <div
                  key={col.id}
                  className="flex items-center justify-between gap-4 px-3 py-1.5 cursor-pointer hover:bg-alpha/5"
                  onClick={() => toggle(col.id)}
                >
                  <span className="text-sm text-tertiary">{col.label}</span>
                  <Switch checked={false} onCheckedChange={() => toggle(col.id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
}
