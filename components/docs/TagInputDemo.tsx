'use client';

import React, { useState } from 'react';
import { TagInput, type Tag } from '@plexui/ui/components/TagInput';
import { Button } from '@plexui/ui/components/Button';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { SelectControl } from '@plexui/ui/components/SelectControl';
import { Menu } from '@plexui/ui/components/Menu';
import { Field } from '@plexui/ui/components/Field';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <Switch checked={value} onCheckedChange={onChange} aria-label={name} />
    </div>
  );
}

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div>{children}</div>
    </div>
  );
}

const MIN_ROWS_OPTIONS = ['auto', 'min 2', 'min 3'] as const;
const MIN_ROWS_TO_NUMBER: Record<(typeof MIN_ROWS_OPTIONS)[number], number> = {
  auto: 1,
  'min 2': 2,
  'min 3': 3,
};
const SIZE_OPTIONS = ['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

export function TagInputBaseDemo() {
  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 350 }}>
        <TagInput
          placeholder="Add a tag..."
          rows={3}
        />
      </div>
    </div>
  );
}

export function TagInputBaseDemoWithControls() {
  const [minRows, setMinRows] = useState<(typeof MIN_ROWS_OPTIONS)[number]>('auto');
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('xl');
  const [pill, setPill] = useState(false);
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
        <DemoControlRow name="minRows">
          <SegmentedControl<(typeof MIN_ROWS_OPTIONS)[number]>
            value={minRows}
            onChange={setMinRows}
            aria-label="minRows"
            size="xs"
          >
            {MIN_ROWS_OPTIONS.map((r) => (
              <SegmentedControl.Option key={r} value={r}>
                {r}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
      <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
        <div style={{ width: 480 }}>
          <TagInput
            placeholder="Add a tag..."
            size={size}
            rows={MIN_ROWS_TO_NUMBER[minRows]}
            pill={pill}
          />
        </div>
      </div>
    </>
  );
}

const SUGGESTIONS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js',
  'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'AWS',
];

export function TagInputSuggestionsDemo() {
  const [tags, setTags] = useState<Tag[]>([
    { value: 'React', valid: true },
    { value: 'TypeScript', valid: true },
  ]);

  const selectedValues = new Set(tags.map((t) => t.value));
  const available = SUGGESTIONS.filter((s) => !selectedValues.has(s));

  const addSuggestion = (value: string) => {
    if (selectedValues.has(value)) return;
    setTags((prev) => [...prev, { value, valid: true }]);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <TagInput
        value={tags}
        onChange={setTags}
        placeholder="Add a skill..."
      />
      {available.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {available.map((suggestion) => (
            <Button key={suggestion} size="xs" color="secondary" variant="soft" pill={false} onClick={() => addSuggestion(suggestion)}>
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

const FIELD_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'name', label: 'Name' },
  { value: 'role', label: 'Role' },
  { value: 'team', label: 'Team' },
  { value: 'country', label: 'Country' },
] as const;

export function TagInputInlineFilterRowDemo() {
  const [field, setField] = useState<string>('email');
  const [tags, setTags] = useState<Tag[]>([
    { value: 'ada@plexui.com', valid: true },
    { value: 'grace@plexui.com', valid: true },
  ]);
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>('md');
  const [pill, setPill] = useState(false);
  const fieldLabel = FIELD_OPTIONS.find((o) => o.value === field)?.label ?? '';

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
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
      <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
        <div className="flex w-full max-w-2xl items-start gap-2">
          <Field label="Where" className="w-[160px] shrink-0">
            <Menu>
              <Menu.Trigger>
                <SelectControl size={size} pill={pill} selected={!!field} className="w-full">
                  {fieldLabel}
                </SelectControl>
              </Menu.Trigger>
              <Menu.Content
                minWidth={160}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {FIELD_OPTIONS.map((o) => (
                  <Menu.CheckboxItem
                    key={o.value}
                    checked={field === o.value}
                    onCheckedChange={() => setField(o.value)}
                    indicatorVariant="ghost"
                  >
                    {o.label}
                  </Menu.CheckboxItem>
                ))}
              </Menu.Content>
            </Menu>
          </Field>
          <Field label="Is in" className="flex-1">
            <TagInput
              size={size}
              pill={pill}
              value={tags}
              onChange={setTags}
              placeholder="Add value, press Enter…"
            />
          </Field>
        </div>
      </div>
    </>
  );
}
