'use client';

import React, { useState } from 'react';
import { TagInput, type Tag } from '@plexui/ui/components/TagInput';
import { Button } from '@plexui/ui/components/Button';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';

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

const ROWS_OPTIONS = ['1', '2', '3'] as const;

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
  const [rows, setRows] = useState<(typeof ROWS_OPTIONS)[number]>('3');
  const [autoFocus, setAutoFocus] = useState(true);
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="rows">
          <SegmentedControl<(typeof ROWS_OPTIONS)[number]>
            value={rows}
            onChange={setRows}
            aria-label="rows"
            size="xs"
          >
            {ROWS_OPTIONS.map((r) => (
              <SegmentedControl.Option key={r} value={r}>
                {r}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlBoolean name="autoFocus" value={autoFocus} onChange={setAutoFocus} />
      </div>
      <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
        <div style={{ width: 350 }}>
          <TagInput
            placeholder="Add a tag..."
            rows={Number(rows)}
            autoFocus={autoFocus}
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
