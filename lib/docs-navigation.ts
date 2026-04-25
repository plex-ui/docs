import type * as PageTree from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

export interface DocsSectionNavItem {
  slug: string;
  label: string;
  href: string;
  matchSlugs?: string[];
}

const DOCS_SECTION_SLUGS = [
  'foundations',
  'concepts',
  'hooks',
  'transitions',
  'installation',
  'skills',
  'ai-setup',
  'mcp',
  'registry',
  'changelog',
] as const;

const NAV_ORDER = ['docs', 'components'] as const;

interface SectionFolder {
  slug: string;
  folder: PageTree.Folder;
  firstUrl: string;
}

function isFolder(node: PageTree.Node): node is PageTree.Folder {
  return node.type === 'folder';
}

function cloneNode(node: PageTree.Node): PageTree.Node {
  if (node.type === 'folder') {
    return {
      ...node,
      index: node.index ? { ...node.index } : undefined,
      children: node.children.map(cloneNode),
    };
  }

  if (node.type === 'page') {
    return { ...node };
  }

  return { ...node };
}

function cloneRoot(root: PageTree.Root): PageTree.Root {
  return {
    ...root,
    children: root.children.map(cloneNode),
    fallback: root.fallback ? cloneRoot(root.fallback) : undefined,
  };
}

function toLabel(value: ReactNode, fallback: string): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return fallback;
}

function sectionSlugFromUrl(url: string): string | null {
  if (!url.startsWith('/')) return null;

  const parts = url.split('/').filter(Boolean);
  const docsIndex = parts.indexOf('docs');
  if (docsIndex === -1) return null;

  return parts[docsIndex + 1] ?? null;
}

function firstPageUrl(nodes: PageTree.Node[]): string | null {
  for (const node of nodes) {
    if (node.type === 'page') return node.url;
    if (node.type === 'folder') {
      if (node.index) return node.index.url;
      const nested = firstPageUrl(node.children);
      if (nested) return nested;
    }
  }

  return null;
}

function flattenFolderPages(folder: PageTree.Folder): PageTree.Item[] {
  const output: PageTree.Item[] = [];
  const seen = new Set<string>();

  const addItem = (item: PageTree.Item) => {
    if (seen.has(item.url)) return;
    seen.add(item.url);
    output.push({ ...item });
  };

  const walk = (nodes: PageTree.Node[]) => {
    for (const node of nodes) {
      if (node.type === 'page') addItem(node);
      if (node.type === 'folder') {
        if (node.index) addItem(node.index);
        walk(node.children);
      }
    }
  };

  if (folder.index) addItem(folder.index);
  walk(folder.children);

  return output;
}

function getSectionFolders(root: PageTree.Root): SectionFolder[] {
  const folders: SectionFolder[] = [];

  for (const node of root.children) {
    if (!isFolder(node)) continue;

    const firstUrl = node.index?.url ?? firstPageUrl(node.children);
    const slug = firstUrl ? sectionSlugFromUrl(firstUrl) : null;
    if (!slug || !firstUrl) continue;

    folders.push({ slug, folder: node, firstUrl });
  }

  return folders;
}

function navOrder(slug: string): number {
  const index = NAV_ORDER.indexOf(slug as (typeof NAV_ORDER)[number]);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

/**
 * The ordered list of "Sections" entries shown at the top of the sidebar,
 * mirroring shadcn/ui's two-group layout. URLs are hardcoded so the list
 * stays stable regardless of how Fumadocs flattens `meta.json`-rooted
 * folders inside `source.pageTree`.
 */
const SECTIONS_ORDER: Array<{ label: string; url: string }> = [
  { label: 'Introduction', url: '/docs' },
  { label: 'Components', url: '/docs/components' },
  { label: 'Icons', url: '/docs/icons' },
  { label: 'Installation', url: '/docs/installation' },
  { label: 'Foundations', url: '/docs/foundations' },
  { label: 'Concepts', url: '/docs/concepts' },
  { label: 'Skills', url: '/docs/skills' },
  { label: 'AI Setup', url: '/docs/ai-setup' },
  { label: 'MCP Server', url: '/docs/mcp' },
  { label: 'Registry', url: '/docs/registry' },
  { label: 'Hooks', url: '/docs/hooks' },
  { label: 'Transitions', url: '/docs/transitions' },
  { label: 'Changelog', url: '/docs/changelog' },
];

function buildSectionsList(): PageTree.Item[] {
  return SECTIONS_ORDER.map((entry) => ({
    type: 'page',
    name: entry.label,
    url: entry.url,
  }));
}

const COMPONENTS_INDEX_URL = '/docs/components';
const ICONS_INDEX_URL = '/docs/icons';

function buildComponentsList(componentsSection: SectionFolder): PageTree.Item[] {
  // Hardcoded URL filter — fumadocs marks the folder as `root: true` in
  // meta.json and the resulting `folder.index` is not always set, so
  // comparing against `folder.index?.url` lets the index slip through.
  const all = flattenFolderPages(componentsSection.folder).filter(
    (page) => page.url !== COMPONENTS_INDEX_URL
  );
  return all.sort((a, b) =>
    toLabel(a.name, '').localeCompare(toLabel(b.name, ''))
  );
}

function buildIconsList(iconsSection: SectionFolder): PageTree.Item[] {
  // Mirrors `buildComponentsList` — expose the 6 library pages as a
  // separate sidebar group under their own "Icons" separator. The
  // grid index (/docs/icons) is intentionally dropped here: it already
  // appears under "Sections" as the entry-point link, and listing it
  // twice would create a duplicate row in the sidebar.
  //
  // Order is preserved from `content/docs/icons/meta.json` (Plex first
  // as the brand-bundled set, then external libraries) — unlike
  // components, alphabetic order here would bury Plex below Hugeicons.
  return flattenFolderPages(iconsSection.folder).filter(
    (page) => page.url !== ICONS_INDEX_URL
  );
}

/**
 * Reshapes the docs page tree into a flat shadcn/ui-style sidebar:
 *
 *   ─ Sections ─
 *   • Introduction
 *   • Components
 *   • Icons
 *   • Installation
 *   • …
 *
 *   ─ Icons ─
 *   • Plex Icons
 *   • Lucide
 *   • Hugeicons
 *   • Phosphor
 *   • Remix Icon
 *   • Tabler
 *
 *   ─ Components ─
 *   • Accordion
 *   • Alert
 *   • …
 *
 * The original folder hierarchy stays in `content/docs/` for routing —
 * we just flatten it for sidebar display. Icons get the same parallel-
 * group treatment as Components so PageNav (`useFooterItems`) finds
 * them in the tree without any per-section overrides.
 */
function processRoot(root: PageTree.Root) {
  const sectionFolders = getSectionFolders(root);
  const componentsSection = sectionFolders.find((entry) => entry.slug === 'components');
  const iconsSection = sectionFolders.find((entry) => entry.slug === 'icons');

  const sectionsList = buildSectionsList();
  const iconsList = iconsSection ? buildIconsList(iconsSection) : [];
  const componentsList = componentsSection ? buildComponentsList(componentsSection) : [];

  const nextChildren: PageTree.Node[] = [];

  if (sectionsList.length > 0) {
    nextChildren.push({ type: 'separator', name: 'Sections' });
    nextChildren.push(...sectionsList);
  }

  if (iconsList.length > 0) {
    nextChildren.push({ type: 'separator', name: 'Icons' });
    nextChildren.push(...iconsList);
  }

  if (componentsList.length > 0) {
    nextChildren.push({ type: 'separator', name: 'Components' });
    nextChildren.push(...componentsList);
  }

  root.children = nextChildren;

  // Sections array drives the top-nav ("Components" label + active state).
  // The `Docs` entry's matchSlugs covers everything except components/icons
  // so the top-nav `Docs` link stays inactive on /docs/components and /docs/icons.
  const sections: DocsSectionNavItem[] = [];

  const docsHref = '/docs';

  sections.push({
    slug: 'docs',
    label: 'Docs',
    href: docsHref,
    matchSlugs: [...DOCS_SECTION_SLUGS],
  });

  if (componentsSection) {
    sections.push({
      slug: 'components',
      label: toLabel(componentsSection.folder.name, 'Components'),
      href: componentsSection.folder.index?.url ?? componentsSection.firstUrl,
      matchSlugs: ['components'],
    });
  }

  return sections.sort((a, b) => {
    const orderA = navOrder(a.slug);
    const orderB = navOrder(b.slug);

    if (orderA !== orderB) return orderA - orderB;
    return a.label.localeCompare(b.label);
  });
}

export function buildDocsTreeNavigation(tree: PageTree.Root): {
  tree: PageTree.Root;
  sections: DocsSectionNavItem[];
} {
  const cloned = cloneRoot(tree);
  const sections = processRoot(cloned);

  if (cloned.fallback) processRoot(cloned.fallback);

  return {
    tree: cloned,
    sections,
  };
}
