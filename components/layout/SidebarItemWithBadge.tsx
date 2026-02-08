'use client';

import { SidebarItem, useFolderDepth } from 'fumadocs-ui/components/sidebar/base';
import { cn } from 'fumadocs-ui/utils/cn';
import type { FC } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { Badge } from '@plexui/ui/components/Badge';
import { SidebarMenuBadge } from '@plexui/ui/components/Sidebar';
import { NEW_COMPONENT_SLUGS } from '@/lib/docs-new-badges';

const SIDEBAR_ITEM_BASE =
  'relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere [&_svg]:size-4 [&_svg]:shrink-0';
const SIDEBAR_ITEM_LINK =
  'transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none data-[active=true]:bg-fd-primary/10 data-[active=true]:text-fd-primary data-[active=true]:hover:transition-colors';
const SIDEBAR_ITEM_HIGHLIGHT =
  "data-[active=true]:before:content-[''] data-[active=true]:before:bg-fd-primary data-[active=true]:before:absolute data-[active=true]:before:w-px data-[active=true]:before:inset-y-2.5 data-[active=true]:before:start-2.5";

function getItemOffset(depth: number): string {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

function slugFromUrl(url: string): string {
  return url.replace(/^\/docs\/components\//, '').replace(/\/$/, '');
}

export const SidebarItemWithBadge: FC<{ item: PageTree.Item }> = ({ item }) => {
  const depth = useFolderDepth();
  const slug = slugFromUrl(item.url);
  const isNew = (NEW_COMPONENT_SLUGS as readonly string[]).includes(slug);

  return (
    <SidebarItem
      href={item.url}
      external={item.external}
      icon={item.icon}
      className={cn(
        SIDEBAR_ITEM_BASE,
        SIDEBAR_ITEM_LINK,
        depth >= 1 && SIDEBAR_ITEM_HIGHLIGHT
      )}
      style={{ paddingInlineStart: getItemOffset(depth) }}
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
