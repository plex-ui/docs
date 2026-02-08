'use client';

import React from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Select } from '@plexui/ui/components/Select';
import { SelectControl } from '@plexui/ui/components/SelectControl';
import { Search, CalendarAlt } from '@plexui/ui/components/Icon';

const SIZE_OPTIONS = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
type ControlSize = (typeof SIZE_OPTIONS)[number];

const SIZE_HEIGHTS: Record<ControlSize, number> = {
  '3xs': 22,
  '2xs': 24,
  'xs': 26,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48,
};

// shadcn/ui only covers these approximate sizes
const SHADCN_SIZES = new Set<ControlSize>(['sm', 'md', 'lg']);

const selectOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export function ComparisonButtonDemo() {
  return (
    <div className="flex flex-col w-full py-4">
      {SIZE_OPTIONS.map((size) => {
        const isShadcn = SHADCN_SIZES.has(size);
        return (
          <div
            key={size}
            className="flex items-center gap-4 px-4 py-2.5 border-b border-alpha/5 last:border-b-0"
          >
            <div className="w-20 flex-shrink-0 text-right flex flex-col">
              <span className="text-xs font-mono font-medium" style={{ color: 'var(--color-text-primary)' }}>{size}</span>
              <span className="text-[10px] font-mono text-tertiary">{SIZE_HEIGHTS[size]}px</span>
            </div>
            <div className="flex-1 flex items-center">
              <Button color="primary" size={size}>
                Button
              </Button>
            </div>
            <div className="w-24 flex-shrink-0 flex justify-end">
              {isShadcn ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-alpha/5 text-tertiary">shadcn</span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--color-text-primary-solid)]" style={{ background: 'var(--color-bg-primary-solid)' }}>plex only</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ComparisonAllControlsDemo() {
  return (
    <div className="flex flex-col w-full" data-demo-stage>
      {/* Header */}
      <div
        className="grid items-center gap-3 px-4 py-2 border-b border-fd-border text-[10px] font-mono text-tertiary uppercase tracking-wider"
        style={{
          gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 80px',
          background: 'var(--docs-surface-elevated)',
        }}
      >
        <div className="text-right">Size</div>
        <div>Button</div>
        <div>Input</div>
        <div>Select</div>
        <div>SelectControl</div>
        <div>Segmented</div>
        <div className="text-right">Coverage</div>
      </div>

      {/* Rows */}
      {SIZE_OPTIONS.map((size) => {
        const isShadcn = SHADCN_SIZES.has(size);
        return (
          <div
            key={size}
            className="grid items-center gap-3 px-4 py-3 border-b border-alpha/5 last:border-b-0"
            style={{
              gridTemplateColumns: '80px 1fr 1fr 1fr 1fr 1fr 80px',
            }}
          >
            <div className="text-right flex flex-col">
              <span className="text-xs font-mono font-medium">{size}</span>
              <span className="text-[10px] font-mono text-tertiary">{SIZE_HEIGHTS[size]}px</span>
            </div>
            <div>
              <Button color="primary" size={size}>Action</Button>
            </div>
            <div>
              <Input placeholder="Text..." size={size} className="max-w-[140px]" />
            </div>
            <div>
              <Select
                value="1"
                options={selectOptions}
                onChange={() => {}}
                size={size}
                block={false}
              />
            </div>
            <div>
              <SelectControl size={size} StartIcon={CalendarAlt}>
                Pick...
              </SelectControl>
            </div>
            <div>
              <SegmentedControl value="a" onChange={() => {}} aria-label="Tabs" size={size}>
                <SegmentedControl.Option value="a">A</SegmentedControl.Option>
                <SegmentedControl.Option value="b">B</SegmentedControl.Option>
              </SegmentedControl>
            </div>
            <div className="flex justify-end">
              {isShadcn ? (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-alpha/5 text-tertiary">common</span>
              ) : (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--color-text-primary-solid)]" style={{ background: 'var(--color-bg-primary-solid)' }}>plex</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ComparisonDensityDemo() {
  return (
    <div className="flex flex-col w-full gap-0">
      {/* Compact */}
      <div className="flex flex-col border-b border-fd-border">
        <div
          className="px-4 py-2 text-[10px] font-mono text-tertiary uppercase tracking-wider border-b border-alpha/5"
          style={{ background: 'var(--docs-surface-elevated)' }}
        >
          Compact — data-dense dashboard (xs / 26px)
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Input placeholder="Search..." size="xs" startAdornment={<Search className="fill-tertiary" />} className="flex-1 max-w-[200px]" />
            <Select value="1" options={selectOptions} onChange={() => {}} size="xs" block={false} />
            <SegmentedControl value="all" onChange={() => {}} aria-label="Filter" size="xs">
              <SegmentedControl.Option value="all">All</SegmentedControl.Option>
              <SegmentedControl.Option value="active">Active</SegmentedControl.Option>
            </SegmentedControl>
            <Button color="primary" size="xs">Apply</Button>
          </div>
        </div>
      </div>

      {/* Standard */}
      <div className="flex flex-col border-b border-fd-border">
        <div
          className="px-4 py-2 text-[10px] font-mono text-tertiary uppercase tracking-wider border-b border-alpha/5"
          style={{ background: 'var(--docs-surface-elevated)' }}
        >
          Standard — general application (md / 32px)
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Input placeholder="Search..." size="md" startAdornment={<Search className="fill-tertiary" />} className="flex-1 max-w-[240px]" />
            <Select value="1" options={selectOptions} onChange={() => {}} size="md" block={false} />
            <SegmentedControl value="all" onChange={() => {}} aria-label="Filter" size="md">
              <SegmentedControl.Option value="all">All</SegmentedControl.Option>
              <SegmentedControl.Option value="active">Active</SegmentedControl.Option>
            </SegmentedControl>
            <Button color="primary" size="md">Apply</Button>
          </div>
        </div>
      </div>

      {/* Spacious */}
      <div className="flex flex-col">
        <div
          className="px-4 py-2 text-[10px] font-mono text-tertiary uppercase tracking-wider border-b border-alpha/5"
          style={{ background: 'var(--docs-surface-elevated)' }}
        >
          Spacious — marketing / mobile (xl / 40px)
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <Input placeholder="Your email" size="xl" className="flex-1 max-w-[280px]" />
            <Button color="primary" size="xl">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
