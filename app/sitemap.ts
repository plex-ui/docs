import type { MetadataRoute } from 'next';
import { source, blog } from '@/lib/source';

const STATIC_UPDATED = '2026-02-18';

function toISODate(d: Date | string | undefined): string {
  if (!d) return STATIC_UPDATED;
  if (d instanceof Date) return d.toISOString().split('T')[0];
  return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plexui.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: STATIC_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: STATIC_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/bridge`, lastModified: STATIC_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/compare/shadcn-ui`, lastModified: STATIC_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/compare/untitled-ui`, lastModified: STATIC_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const docsPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: toISODate((page.data as { lastModified?: Date }).lastModified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: STATIC_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = blog.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: toISODate(
      (page.data as { lastModified?: Date }).lastModified ?? page.data.date,
    ),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogIndex, ...blogPages, ...docsPages];
}
