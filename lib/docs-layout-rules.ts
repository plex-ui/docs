import type { TOCItemType } from 'fumadocs-core/toc';

// On the new flat docs structure every page lives directly under /docs/*
// (or /docs/components/*) — so we always show the left sidebar on docs.
// Returning `null` from `getSectionFromSlug` (i.e. the /docs index) still
// resolves to "show sidebar" because /docs is now the Introduction page.
const LEFT_SIDEBAR_SECTIONS: Set<string> | null = null;
const TOC_ALLOWED_SECTIONS = new Set([
  'foundations',
  'concepts',
  'components',
  'hooks',
  'transitions',
  'installation',
  'skills',
  'ai-setup',
  'mcp',
  'registry',
  'changelog',
]);
const TOC_ITEM_THRESHOLD = 1;

function isNonEmptySection(section: string | null | undefined): section is string {
  return typeof section === 'string' && section.length > 0;
}

export function getSectionFromSlug(slug?: string[]): string | null {
  return slug?.[0] ?? null;
}

export function shouldShowLeftSidebar(_section: string | null | undefined): boolean {
  // Always-on sidebar after the shadcn-style flat-tree migration.
  return LEFT_SIDEBAR_SECTIONS === null
    ? true
    : isNonEmptySection(_section) && LEFT_SIDEBAR_SECTIONS.has(_section);
}

export function shouldShowRightToc(
  section: string | null | undefined,
  toc: TOCItemType[] | undefined
): boolean {
  if (!isNonEmptySection(section)) return false;
  if (!TOC_ALLOWED_SECTIONS.has(section)) return false;
  return (toc?.length ?? 0) >= TOC_ITEM_THRESHOLD;
}

export function shouldShowPageNav(section: string | null | undefined): boolean {
  return isNonEmptySection(section);
}
