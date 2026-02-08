'use client';

import { useEffect, useState, type ReactNode } from 'react';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { TOCItemType } from 'fumadocs-core/toc';

/**
 * Wraps DocsPage and enables tableOfContentPopover only after mount.
 * Avoids Radix useId() hydration mismatch (different IDs on server vs client).
 */
export function DocsPageWithMobileTOC({
  toc,
  showRightToc,
  full,
  className,
  footer,
  children,
}: {
  toc: TOCItemType[];
  showRightToc: boolean;
  full?: boolean;
  className?: string;
  footer?: { enabled: boolean };
  children: ReactNode;
}) {
  const [popoverEnabled, setPopoverEnabled] = useState(false);
  useEffect(() => {
    setPopoverEnabled(true);
  }, []);

  return (
    <DocsPage
      toc={showRightToc ? toc : []}
      tableOfContent={{ enabled: showRightToc }}
      tableOfContentPopover={{ enabled: popoverEnabled && showRightToc }}
      full={full}
      className={className}
      footer={footer ?? { enabled: false }}
    >
      {children}
    </DocsPage>
  );
}

export { DocsBody, DocsDescription, DocsTitle };
