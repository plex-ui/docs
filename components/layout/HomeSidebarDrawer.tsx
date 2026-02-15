'use client';

import {
  SidebarDrawerOverlay,
  SidebarDrawerContent,
} from 'fumadocs-ui/components/sidebar/base';
import { SidebarNav } from './SidebarNav';
import type { DocsSectionNavItem } from '@/lib/docs-navigation';

/**
 * Fumadocs sidebar drawer for non-docs pages (home, etc.).
 * Renders the same drawer style as the docs sidebar, but with only
 * section nav links + CTA — no sidebar tree.
 */
export function HomeSidebarDrawer({ sections }: { sections: DocsSectionNavItem[] }) {
  return (
    <>
      <SidebarDrawerOverlay className="fixed z-40 inset-0 backdrop-blur-xs data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out" />
      <SidebarDrawerContent className="fixed text-[0.9375rem] flex flex-col shadow-lg border-s end-0 inset-y-0 w-[85%] max-w-[380px] z-40 bg-fd-background data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out">
        <div className="flex flex-col gap-3 p-4 pb-2">
          <SidebarNav sections={sections} />
        </div>
      </SidebarDrawerContent>
    </>
  );
}
