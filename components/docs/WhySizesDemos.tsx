'use client';

import React from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { Search, ArrowRight } from '@plexui/ui/components/Icon';

const SIZES = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

const HEIGHTS: Record<string, number> = {
  '3xs': 22, '2xs': 24, 'xs': 26, 'sm': 28, 'md': 32,
  'lg': 36, 'xl': 40, '2xl': 44, '3xl': 48,
};

export function AllSizesDemo() {
  return (
    <div className="flex flex-col gap-2 py-4 items-start px-4">
      {SIZES.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="text-xs font-mono text-tertiary w-16 text-right">
            {size} <span className="text-quaternary">({HEIGHTS[size]}px)</span>
          </span>
          <Button color="primary" size={size}>Button</Button>
        </div>
      ))}
    </div>
  );
}

export function CompactZoneDemo() {
  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Input
        placeholder="Filter..."
        size="xs"
        startAdornment={<Search className="fill-tertiary" />}
        className="max-w-[200px]"
      />
      <Button color="primary" size="xs">Apply</Button>
      <Button variant="ghost" size="xs">Reset</Button>
    </div>
  );
}

export function StandardZoneDemo() {
  return (
    <div className="flex items-center gap-2 px-4 py-4">
      <Input
        placeholder="Search..."
        size="md"
        startAdornment={<Search className="fill-tertiary" />}
        className="max-w-[240px]"
      />
      <Button color="primary" size="md">Search</Button>
    </div>
  );
}

export function SpaciousZoneDemo() {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <Input placeholder="Enter your email" size="xl" pill className="max-w-[280px]" />
      <Button color="primary" size="xl" pill>
        Get started <ArrowRight />
      </Button>
    </div>
  );
}
