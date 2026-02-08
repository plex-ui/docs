'use client';

import React, { useState } from 'react';
import { Alert } from '@plexui/ui/components/Alert';
import { TextLink } from '@plexui/ui/components/TextLink';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';

const COLOR_OPTIONS = [
  'primary',
  'success',
  'danger',
  'warning',
  'caution',
  'info',
  'discovery',
] as const;

const VARIANT_OPTIONS = ['solid', 'soft', 'outline'] as const;

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
  borderRadius: 6,
  background: 'var(--docs-surface-elevated)',
};

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

function RowMatrix({
  rowLabels,
  renderRow,
}: {
  rowLabels: Readonly<string[]>;
  renderRow: (rowIndex: number) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      {rowLabels.map((row, ri) => (
        <div key={ri} className="flex items-center">
          <div
            className="text-right text-sm mr-8 min-w-[4rem]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {row}
          </div>
          <div className="flex-1">{renderRow(ri)}</div>
        </div>
      ))}
    </div>
  );
}

export function AlertColorsDemo() {
  const [variant, setVariant] = useState<(typeof VARIANT_OPTIONS)[number]>('outline');
  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="variant">
          <SegmentedControl<(typeof VARIANT_OPTIONS)[number]>
            value={variant}
            onChange={setVariant}
            aria-label="variant"
            size="xs"
          >
            {VARIANT_OPTIONS.map((v) => (
              <SegmentedControl.Option key={v} value={v}>
                {v}
              </SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div data-demo-stage className="flex-1 w-full py-12 flex items-center justify-center">
        <div className="w-fit min-w-full max-w-[500px]">
          <RowMatrix
            rowLabels={[...COLOR_OPTIONS]}
            renderRow={(row) => (
              <Alert
                color={COLOR_OPTIONS[row]}
                variant={variant}
                title="Scheduled maintenance on Saturday, 2-4 AM PT"
                description={
                  <>
                    Track status updates on{' '}
                    <TextLink color="currentcolor" href="#">
                      status page
                    </TextLink>
                  </>
                }
              />
            )}
          />
        </div>
      </div>
    </>
  );
}

export function AlertDismissDemo() {
  return (
    <div data-demo-stage className="flex-1 w-full py-12 flex items-center justify-center">
      <Alert
        title="Thank you!"
        description="Your application has been received. We will review your application and respond within the next 48 hours."
        onDismiss={() => { }}
      />
    </div>
  );
}
