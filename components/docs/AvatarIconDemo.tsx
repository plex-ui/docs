'use client';

import type { SVGProps } from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@plexui/ui/components/Avatar';
import { Robot } from '@plexui/ui/components/Icon';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { SliderValueControl } from './SliderValueControl';

const IconRobot = Robot as React.ComponentType<SVGProps<SVGSVGElement>>;
const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'danger', 'info', 'discovery'] as const;
const VARIANT_OPTIONS = ['soft', 'solid'] as const;
const ROUNDNESS_OPTIONS = [
  'rounded-full',
  'rounded-xl',
  'rounded-lg',
  'rounded-md',
  'rounded-sm',
  'rounded-none',
] as const;

const controlsTableStyle: React.CSSProperties = {
  background: 'var(--docs-surface-elevated)',
  margin: '24px -24px -24px -24px',
  width: 'calc(100% + 48px)',
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

function DemoControlRow({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div>{children}</div>
    </div>
  );
}

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function AvatarSizingDemo() {
  const mounted = useMounted();
  const [size, setSize] = useState(48);

  if (!mounted) {
    return <div style={{ width: 280, height: 140 }} />;
  }

  return (
    <>
      <div
        style={{
          minHeight: 96,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar name="David" size={size} />
      </div>
      <div style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SliderValueControl
            ariaLabel="size"
            min={14}
            max={80}
            step={2}
            value={size}
            onChange={setSize}
            width="min(42vw, 340px)"
          />
        </DemoControlRow>
      </div>
    </>
  );
}

export function AvatarIconDemo() {
  return <Avatar Icon={IconRobot} size={48} />;
}

export function AvatarHeroStorybookDemo() {
  return (
    <>
      <Avatar
        name="Tyler"
        imageUrl="https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552"
        size={48}
      />
      <Avatar name="Will" size={48} />
      <Avatar name="Tech support" Icon={IconRobot} size={48} color="primary" variant="solid" />
    </>
  );
}

export const AvatarHeroContent = AvatarHeroStorybookDemo;

export function AvatarInteractiveDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Will" size={48} onClick={() => {}} />
      <Avatar
        imageUrl="https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552"
        name="Tyler"
        size={48}
        onClick={() => {}}
      />
      <Avatar name="Tech support" Icon={IconRobot} size={48} color="info" onClick={() => {}} />
    </div>
  );
}

export function AvatarColorsDemo() {
  const variantLabelColumnWidth = 88;
  const colorColumnWidth = 104;

  return (
    <div className="pt-1 pb-6 px-8 w-fit min-w-full">
      <div
        className="grid gap-4 items-center justify-center"
        style={{
          gridTemplateColumns: `${variantLabelColumnWidth}px repeat(${COLOR_OPTIONS.length}, ${colorColumnWidth}px)`,
        }}
      >
        <div />
        {COLOR_OPTIONS.map((color) => (
          <div
            key={color}
            className="text-center text-sm mb-1"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {color}
          </div>
        ))}

        {VARIANT_OPTIONS.map((variant) => (
          <Fragment key={variant}>
            <div
              className="text-right text-sm mr-3"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {variant}
            </div>
            {COLOR_OPTIONS.map((color, idx) => (
              <div key={`${variant}-${color}`} className="text-center">
                <Avatar
                  name={String.fromCharCode(97 + idx)}
                  color={color}
                  variant={variant}
                  size={48}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function AvatarRoundnessDemo() {
  const [rounded, setRounded] = useState<(typeof ROUNDNESS_OPTIONS)[number]>('rounded-lg');
  return (
    <>
      <Avatar name="Acme, co." color="primary" variant="solid" size={48} className={rounded} />
      <div style={controlsTableStyle}>
        <DemoControlRow name="roundness">
          <SegmentedControl<(typeof ROUNDNESS_OPTIONS)[number]>
            value={rounded}
            onChange={setRounded}
            aria-label="roundness"
            size="xs"
          >
            {ROUNDNESS_OPTIONS.map((r) => (
              <SegmentedControl.Option key={r} value={r}>
                {r.replace('rounded-', '')}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
    </>
  );
}
