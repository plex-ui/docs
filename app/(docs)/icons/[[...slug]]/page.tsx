import { iconsSource } from '@/lib/source';
import type { TOCItemType } from 'fumadocs-core/toc';
import { notFound } from 'next/navigation';
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
  shouldShowLeftSidebar,
  shouldShowPageNav,
  shouldShowRightToc,
} from '@/lib/docs-layout-rules';

const SECTION = 'icons';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = iconsSource.getPage(params.slug);
  if (!page) notFound();

  const sourceToc = page.data.toc ?? [];
  const tocItems: TOCItemType[] | undefined = shouldShowRightToc(SECTION, sourceToc)
    ? sourceToc
    : undefined;

  const showLeftSidebar = shouldShowLeftSidebar(SECTION);
  const showRightToc = Boolean(tocItems && tocItems.length > 0);
  const showPageNav = shouldShowPageNav(SECTION);
  const pageClassName = [
    'plex-docs-page',
    showLeftSidebar ? '' : 'plex-docs-page--no-left-sidebar',
    showRightToc ? '' : 'plex-docs-page--no-right-sidebar',
  ]
    .filter(Boolean)
    .join(' ');

  const MDX = page.data.body;
  const pageUrl = `https://plexui.com${page.url}`;
  const dateModified = (page.data as { lastModified?: Date }).lastModified?.toISOString();

  const toc = showRightToc ? (tocItems ?? []) : [];

  const techArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    url: pageUrl,
    ...(dateModified && { dateModified }),
    publisher: { '@type': 'Organization', name: 'Plex UI', url: 'https://plexui.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  // BreadcrumbList: `Plex UI › Icons › <icon set>` in SERP results.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Plex UI', item: 'https://plexui.com' },
      { '@type': 'ListItem', position: 2, name: 'Icons', item: 'https://plexui.com/icons' },
      { '@type': 'ListItem', position: 3, name: page.data.title, item: pageUrl },
    ],
  };

  return (
    <DocsPageWithMobileTOC
      toc={toc}
      showRightToc={showRightToc}
      full={page.data.full}
      className={pageClassName}
      footer={{ enabled: false }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
  return iconsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<import('next').Metadata> {
  const params = await props.params;
  const page = iconsSource.getPage(params.slug);
  if (!page) notFound();

  const slug = params.slug;
  const canonicalPath = slug ? `/icons/${slug.join('/')}` : '/icons';
  const fullUrl = `https://plexui.com${canonicalPath}`;
  // OG titles bypass the layout's `%s — Plex UI` template, so brand
  // the title manually for shared links.
  const brandedTitle = `${page.data.title} — Plex UI`;
  const ogImageUrl = `https://plexui.com/api/og?type=icons${slug ? `&slug=${slug.join('/')}` : ''}`;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: fullUrl },
    openGraph: {
      title: brandedTitle,
      description: page.data.description,
      url: fullUrl,
      siteName: 'Plex UI',
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ui_plex',
      title: brandedTitle,
      description: page.data.description,
      images: [ogImageUrl],
    },
  };
}
