import type { TOCItemType } from 'fumadocs-core/toc';

const LEFT_SIDEBAR_SECTIONS = new Set([
  'overview',
  'foundations',
  'hooks',
  'concepts',
  'transitions',
  'components',
]);
const TOC_ALLOWED_SECTIONS = new Set([
  'overview',
  'foundations',
  'concepts',
  'components',
  'hooks',
  'transitions',
]);
const TOC_ITEM_THRESHOLD = 1;

function isNonEmptySection(section: string | null | undefined): section is string {
  return typeof section === 'string' && section.length > 0;
}

export function getSectionFromSlug(slug?: string[]): string | null {
  return slug?.[0] ?? null;
}

export function shouldShowLeftSidebar(section: string | null | undefined): boolean {
  if (!isNonEmptySection(section)) return false;
  return LEFT_SIDEBAR_SECTIONS.has(section);
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
