'use client';

import { useEffect, useRef, useState } from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import s from './ComponentSource.module.css';

export function ComponentSource({
  code,
  language = 'tsx',
  defaultExpanded = false,
  collapsedHeight = 140,
}: {
  code: string;
  language?: string;
  defaultExpanded?: boolean;
  collapsedHeight?: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [needsCollapse, setNeedsCollapse] = useState<boolean | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      const contentHeight = el.scrollHeight;
      setNeedsCollapse(contentHeight > collapsedHeight + 8);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [collapsedHeight, code]);

  const shouldCollapse = needsCollapse === true && !isExpanded;
  const containerStyle = shouldCollapse
    ? { maxHeight: collapsedHeight }
    : undefined;

  return (
    <div
      ref={contentRef}
      className={s.SourceContainer}
      data-collapsed={shouldCollapse ? '' : undefined}
      style={containerStyle}
    >
      <DynamicCodeBlock
        lang={language}
        code={code}
        codeblock={{ allowCopy: isExpanded }}
      />

      {shouldCollapse && (
        <>
          <div className={s.GradientOverlay} aria-hidden />
          <div className={s.ExpandButtonContainer}>
            <button
              type="button"
              className={s.ExpandButton}
              onClick={() => setIsExpanded(true)}
            >
              Expand
            </button>
          </div>
        </>
      )}
    </div>
  );
}
