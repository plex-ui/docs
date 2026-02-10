'use client';

import { SidebarItem } from 'fumadocs-ui/components/sidebar/base';
import type { FC } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { Badge } from '@plexui/ui/components/Badge';
import { SidebarMenuBadge } from '@plexui/ui/components/Sidebar';
import { NEW_COMPONENT_SLUGS } from '@/lib/docs-new-badges';

/* Minimal base — all visual states are handled by globals.css sidebar rules */
const SIDEBAR_ITEM_BASE =
  'relative flex flex-row items-center gap-2 text-start wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0';

function slugFromUrl(url: string): string {
  return url.replace(/^\/docs\/components\//, '').replace(/\/$/, '');
}

export const SidebarItemWithBadge: FC<{ item: PageTree.Item }> = ({ item }) => {
  const slug = slugFromUrl(item.url);
  const isNew = (NEW_COMPONENT_SLUGS as readonly string[]).includes(slug);

  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      icon={item.icon}
      className={SIDEBAR_ITEM_BASE}
    >
      {item.name}
      {isNew && (
        <SidebarMenuBadge className="ps-1.5">
          <Badge size="sm" color="info">
            New
          </Badge>
        </SidebarMenuBadge>
      )}
    </SidebarItem>
  );
};
