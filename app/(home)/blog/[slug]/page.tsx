import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { ArrowLeft } from 'lucide-react';

function parseDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(parseDate(value));
}

export function generateStaticParams() {
  return blog
    .getPages()
    .map((post) => ({ slug: post.slugs.at(-1) }))
    .filter((param): param is { slug: string } => Boolean(param.slug));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: `${page.data.title} — Plex UI Blog`,
    description: page.data.description,
    alternates: {
      canonical: `https://plexui.com${page.url}`,
    },
    openGraph: {
      title: `${page.data.title} — Plex UI Blog`,
      description: page.data.description,
      url: `https://plexui.com${page.url}`,
      type: 'article',
    },
    twitter: {
      title: `${page.data.title} — Plex UI Blog`,
      description: page.data.description,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;
  const pageUrl = `https://plexui.com${page.url}`;
  const datePublished = parseDate(page.data.date).toISOString();
  const dateModified =
    (page.data as { lastModified?: Date }).lastModified?.toISOString() ?? datePublished;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.data.title,
    description: page.data.description,
    url: pageUrl,
    datePublished,
    dateModified,
    author: { '@type': 'Person', name: page.data.author },
    publisher: { '@type': 'Organization', name: 'Plex UI', url: 'https://plexui.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  };

  return (
    <main className="flex flex-1 flex-col bg-fd-background px-6 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground">
          <ArrowLeft className="size-3.5" />
          Blog
        </Link>

        <header className="mt-8 pb-8">
          <time dateTime={parseDate(page.data.date).toISOString()} className="text-sm text-fd-muted-foreground">
            {formatDate(page.data.date)}
          </time>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-fd-foreground md:text-4xl">{page.data.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-fd-muted-foreground">{page.data.description}</p>
        </header>

        <div className="prose prose-neutral max-w-none text-fd-foreground dark:prose-invert prose-headings:tracking-tight prose-a:text-fd-foreground hover:prose-a:text-fd-foreground/80">
          <MDX components={getMDXComponents()} />
        </div>
      </div>
    </main>
  );
}
