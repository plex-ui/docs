import { source, componentsSource, iconsSource } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Three separate fumadocs sources (post-2026-04-26 URL split — see
// .memory/decisions/0013-component-and-icon-pages-at-top-level.md)
// each get their own search index. The route merges results from
// all three so a single user query covers /docs/*, /components/*,
// and /icons/* in one response.
const docsApi = createFromSource(source);
const componentsApi = createFromSource(componentsSource);
const iconsApi = createFromSource(iconsSource);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') ?? '';
  const [docs, components, icons] = await Promise.all([
    docsApi.search(query),
    componentsApi.search(query),
    iconsApi.search(query),
  ]);
  return Response.json([...docs, ...components, ...icons]);
}
