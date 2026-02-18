import type { MetadataRoute } from 'next';
import { source, blog } from '@/lib/source';

const LAST_UPDATED = '2026-02-18';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://plexui.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/bridge`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/compare/shadcn-ui`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/compare/untitled-ui`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const docsPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogIndex: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = blog.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogIndex, ...blogPages, ...docsPages];
}
