import type * as PageTree from 'fumadocs-core/page-tree';
import type { ReactNode } from 'react';

export interface DocsSectionNavItem {
  slug: string;
  label: string;
  href: string;
  matchSlugs?: string[];
}

const DOCS_SECTION_SLUGS = [
  'overview',
  'foundations',
  'concepts',
  'hooks',
  'transitions',
] as const;

const DOCS_SIDEBAR_GROUPS: Array<{
  name: string;
  slugs: (typeof DOCS_SECTION_SLUGS)[number][];
}> = [
  { name: 'Overview', slugs: ['overview'] },
  { name: 'Foundations', slugs: ['foundations'] },
  { name: 'Guides', slugs: ['concepts', 'hooks'] },
  { name: 'Transitions', slugs: ['transitions'] },
];

const NAV_ORDER = ['docs', 'components'] as const;

const SIDEBAR_MODE: Record<
  (typeof DOCS_SECTION_SLUGS)[number],
  'all' | 'indexOnly'
> = {
  overview: 'all',
  foundations: 'all',
  concepts: 'indexOnly',
  hooks: 'indexOnly',
  transitions: 'all',
};

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

function docsSectionOrder(slug: string): number {
  const index = DOCS_SECTION_SLUGS.indexOf(
    slug as (typeof DOCS_SECTION_SLUGS)[number]
  );
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function getDocsSectionPages(entry: SectionFolder): PageTree.Item[] {
  const pages = flattenFolderPages(entry.folder);
  const mode = SIDEBAR_MODE[entry.slug as (typeof DOCS_SECTION_SLUGS)[number]];

  if (mode === 'indexOnly') {
    if (entry.folder.index) {
      const indexItem = pages.find((item) => item.url === entry.folder.index!.url);
      if (indexItem) return [{ ...indexItem }];
    }

    return pages[0] ? [{ ...pages[0] }] : [];
  }

  return pages.map((item) => ({ ...item }));
}

function buildDocsFolder(
  docsSections: SectionFolder[]
): { node: PageTree.Folder; href: string } | null {
  if (docsSections.length === 0) return null;

  const ordered = [...docsSections].sort((a, b) => {
    const orderA = docsSectionOrder(a.slug);
    const orderB = docsSectionOrder(b.slug);

    if (orderA !== orderB) return orderA - orderB;
    return a.slug.localeCompare(b.slug);
  });

  const bySlug = new Map(ordered.map((entry) => [entry.slug, entry]));
  const children: PageTree.Node[] = [];
  let href = '/docs/overview';

  for (const group of DOCS_SIDEBAR_GROUPS) {
    const pages: PageTree.Item[] = [];

    for (const slug of group.slugs) {
      const entry = bySlug.get(slug);
      if (!entry) continue;
      pages.push(...getDocsSectionPages(entry));
    }

    if (pages.length === 0) continue;
    children.push({
      type: 'separator',
      name: group.name,
    });

    for (const page of pages) {
      children.push({ ...page });
    }

    if (group.slugs.includes('overview')) {
      href = pages[0].url;
    }
  }

  const overviewEntry = ordered.find((entry) => entry.slug === 'overview');
  const indexItem = overviewEntry?.folder.index
    ? { ...overviewEntry.folder.index }
    : undefined;

  return {
    node: {
      type: 'folder',
      name: 'Docs',
      root: true,
      defaultOpen: true,
      collapsible: false,
      index: indexItem,
      children,
    },
    href,
  };
}

function buildComponentsFolder(
  entry: SectionFolder
): { node: PageTree.Folder; href: string } | null {
  const pages = flattenFolderPages(entry.folder);
  if (pages.length === 0) return null;

  const preferred = entry.folder.index
    ? pages.find((item) => item.url === entry.folder.index!.url) ?? pages[0]
    : pages[0];

  if (!preferred) return null;

  return {
    node: {
      ...entry.folder,
      root: true,
      defaultOpen: true,
      children: pages.map((item) => ({ ...item })),
    },
    href: preferred.url,
  };
}

function processRoot(root: PageTree.Root) {
  const sections: DocsSectionNavItem[] = [];
  const otherChildren: PageTree.Node[] = [];
  const sectionFolders = getSectionFolders(root);

  const docsSections = sectionFolders.filter((entry) =>
    DOCS_SECTION_SLUGS.includes(entry.slug as (typeof DOCS_SECTION_SLUGS)[number])
  );
  const componentsSection = sectionFolders.find((entry) => entry.slug === 'components');

  for (const node of root.children) {
    if (node.type === 'page' && node.url === '/docs') continue;
    if (node.type === 'folder') {
      const firstUrl = node.index?.url ?? firstPageUrl(node.children);
      const slug = firstUrl ? sectionSlugFromUrl(firstUrl) : null;
      if (slug && (DOCS_SECTION_SLUGS.includes(
        slug as (typeof DOCS_SECTION_SLUGS)[number]
      ) || slug === 'components')) {
        continue;
      }
    }
    otherChildren.push(node);
  }

  const nextChildren: PageTree.Node[] = [];

  const docsFolder = buildDocsFolder(docsSections);
  if (docsFolder) {
    nextChildren.push(docsFolder.node);
    sections.push({
      slug: 'docs',
      label: 'Docs',
      href: docsFolder.href,
      matchSlugs: [...DOCS_SECTION_SLUGS],
    });
  }

  if (componentsSection) {
    const componentsFolder = buildComponentsFolder(componentsSection);
    if (componentsFolder) {
      nextChildren.push(componentsFolder.node);
      sections.push({
        slug: 'components',
        label: toLabel(componentsSection.folder.name, 'Components'),
        href: componentsFolder.href,
        matchSlugs: ['components'],
      });
    }
  }

  root.children = [...nextChildren, ...otherChildren];

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
