import { source } from '@/lib/source';
import type { TOCItemType } from 'fumadocs-core/toc';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import { PageNav } from '@/components/docs/PageNav';
import { DocsViewportState } from '@/components/layout/DocsViewportState';
import {
  DocsPageWithMobileTOC,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from '@/components/docs/DocsPageWithMobileTOC';
import {
  getSectionFromSlug,
  shouldShowLeftSidebar,
  shouldShowPageNav,
  shouldShowRightToc,
} from '@/lib/docs-layout-rules';

function getCustomToc(slug?: string[]): TOCItemType[] {
  if (!slug || slug.length === 0) return [];

  if (slug[0] === 'foundations' && slug[1] === 'design-tokens') {
    return [
      { title: 'Text colors', url: '#text-colors', depth: 2 },
      { title: 'Semantic colors', url: '#semantic-colors', depth: 2 },
      { title: 'Fonts', url: '#fonts', depth: 2 },
      { title: 'Radius', url: '#radius', depth: 2 },
      { title: 'Shadows', url: '#shadows', depth: 2 },
      { title: 'Breakpoints', url: '#breakpoints', depth: 2 },
      { title: 'Motion', url: '#motion', depth: 2 },
    ];
  }

  if (slug[0] === 'foundations' && slug[1] === 'colors') {
    return [
      { title: 'Grayscale', url: '#grayscale', depth: 2 },
      { title: 'Alphas', url: '#alphas', depth: 2 },
      { title: 'Primary colors', url: '#primary-colors', depth: 2 },
    ];
  }

  return [];
}

function getSectionRedirect(slug?: string[]): string | null {
  if (!slug || slug.length === 0) {
    return '/docs/overview';
  }

  if (slug.length < 2) return null;

  const [section, ...rest] = slug;
  const leaf = rest.at(-1);
  if (!leaf) return null;

  if (section === 'hooks') {
    return `/docs/hooks#${leaf.replace(/-/g, '')}`;
  }

  if (section === 'concepts') {
    return `/docs/concepts#${leaf}`;
  }

  return null;
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const sectionRedirect = getSectionRedirect(params.slug);
  if (sectionRedirect) {
    redirect(sectionRedirect);
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const section = getSectionFromSlug(params.slug);
  const customToc = getCustomToc(params.slug);
  const sourceToc =
    customToc.length > 0 ? customToc : (page.data.toc ?? []);
  const tocItems: TOCItemType[] | undefined = shouldShowRightToc(section, sourceToc)
    ? sourceToc
    : undefined;

  const isComponentsIndex =
    params.slug?.length === 1 && params.slug[0] === 'components';
  const showLeftSidebar = isComponentsIndex ? false : shouldShowLeftSidebar(section);
  const showRightToc = !isComponentsIndex && Boolean(tocItems && tocItems.length > 0);
  const showPageNav = shouldShowPageNav(section);
  const pageClassName = [
    'plex-docs-page',
    showLeftSidebar ? '' : 'plex-docs-page--no-left-sidebar',
    showRightToc ? '' : 'plex-docs-page--no-right-sidebar',
  ]
    .filter(Boolean)
    .join(' ');

  const MDX = page.data.body;

  const toc = showRightToc ? (tocItems ?? []) : [];

  return (
    <DocsPageWithMobileTOC
      toc={toc}
      showRightToc={showRightToc}
      full={page.data.full}
      className={pageClassName}
      footer={{ enabled: false }}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-docs-left-sidebar','${showLeftSidebar ? 'on' : 'off'}');document.documentElement.setAttribute('data-docs-right-sidebar','${showRightToc ? 'on' : 'off'}');`,
        }}
      />
      <DocsViewportState
        showLeftSidebar={showLeftSidebar}
        showRightSidebar={showRightToc}
      />
      <div className="plex-docs-title-row">
        <DocsTitle className="plex-docs-title">{page.data.title}</DocsTitle>
        {showPageNav && <PageNav compact className="plex-docs-nav plex-docs-nav-top" />}
      </div>
      <DocsDescription className="plex-docs-description">
        {page.data.description}
      </DocsDescription>
      <DocsBody className="plex-docs-body">
        <MDX components={getMDXComponents()} />
      </DocsBody>
      {showPageNav && <PageNav className="plex-docs-nav plex-docs-nav-bottom" />}
    </DocsPageWithMobileTOC>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
