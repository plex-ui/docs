'use client';

import React, { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Eye, Code, InfoCircle } from '@plexui/ui/components/Icon';
import s from './ComponentPreview.module.css';

type Mode = 'preview' | 'code' | 'details';

export function ComponentPreview({
  children,
  code,
  details,
  language = 'tsx',
  className,
  previewMinHeight,
  resizable = false,
}: {
  children: ReactNode;
  code?: string;
  details?: ReactNode;
  language?: string;
  className?: string;
  previewMinHeight?: number | string;
  resizable?: boolean;
}) {
  const [mode, setMode] = useState<Mode>('preview');
  const hasCode = Boolean(code);
  const hasDetails = Boolean(details);
  const showTabs = hasCode || hasDetails;

  type ElementProps = Record<string, unknown>;
  const childArray = React.Children.toArray(children);
  const hasControls = childArray.some(
    (child) => React.isValidElement(child) && (child as React.ReactElement<ElementProps>).props['data-demo-controls'] !== undefined
  );
  const normalizedChildren = hasControls
    ? (() => {
        const controls: ReactNode[] = [];
        const stageChildren: ReactNode[] = [];

        for (const child of childArray) {
          if (
            React.isValidElement(child) &&
            (child as React.ReactElement<ElementProps>).props['data-demo-controls'] !== undefined
          ) {
            controls.push(child);
            continue;
          }

          stageChildren.push(child);
        }

        const hasExplicitStage = stageChildren.some(
          (child) =>
            React.isValidElement(child) && (child as React.ReactElement<ElementProps>).props['data-demo-stage'] !== undefined
        );

        return (
          <>
            {controls}
            {hasExplicitStage ? stageChildren : stageChildren.length > 0 ? <div data-demo-stage>{stageChildren}</div> : null}
          </>
        );
      })()
    : children;

  return (
    <div className={`${s.Wrapper} not-prose`}>
      {/* Tab bar — outside the bordered block */}
      {showTabs && (
        <div className={s.TabBar}>
          <SegmentedControl
            value={mode}
            onChange={(v) => setMode(v as Mode)}
            size="xs"
            pill
            aria-label="View mode"
          >
            <SegmentedControl.Option value="preview" icon={<Eye />} aria-label="Preview" />
            {hasCode && (
              <SegmentedControl.Option value="code" icon={<Code />} aria-label="Code" />
            )}
            {hasDetails && (
              <SegmentedControl.Option value="details" icon={<InfoCircle />} aria-label="Details" />
            )}
          </SegmentedControl>
        </div>
      )}

      {/* Content block */}
      <div className={s.PreviewBlock}>
        {mode === 'preview' ? (
          <PreviewPane
            className={className}
            previewMinHeight={previewMinHeight}
            resizable={resizable}
          >
            {normalizedChildren}
          </PreviewPane>
        ) : mode === 'code' ? (
          <div className={s.CodeBlockWrap}>
            <DynamicCodeBlock
              lang={language}
              code={code!}
              codeblock={{ allowCopy: true }}
            />
          </div>
        ) : (
          <div className={s.DetailsWrap}>
            <div className={s.DetailsContent}>{details}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Resizable preview pane                                            */
/* ------------------------------------------------------------------ */

function PreviewPane({
  children,
  className,
  previewMinHeight,
  resizable,
}: {
  children: ReactNode;
  className?: string;
  previewMinHeight?: number | string;
  resizable: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const dragging = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = Math.max(320, Math.min(rect.width, e.clientX - rect.left));
    setWidth(next);
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Reset width when container resizes (e.g. window resize)
  useEffect(() => {
    if (!resizable) return;
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth((prev) => {
        if (prev === null) return null;
        return Math.min(prev, el.clientWidth);
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [resizable]);

  return (
    <div className={s.PreviewContainer} data-preview-zone ref={containerRef}>
      <div
        className={`${s.PreviewContent} ${className ?? ''}`.trim()}
        style={{
          minHeight: previewMinHeight ?? 168,
          ...(resizable && width !== null ? { maxWidth: width } : {}),
        }}
        data-resizable={resizable || undefined}
      >
        <div className={s.PreviewInner}>{children}</div>
        {resizable && (
          <div
            className={s.ResizeHandle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div className={s.ResizeHandleGrip} />
          </div>
        )}
      </div>
    </div>
  );
}
