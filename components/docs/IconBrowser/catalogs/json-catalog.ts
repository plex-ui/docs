import type {
  CatalogIcon,
  IconBuildOptions,
  IconCatalog,
} from '../types';

type JsonCatalogRecord = { name: string; svg: string; tags?: string[] };

type JsonCatalogConfig = {
  /** Path under `/public/icon-libraries/` (no leading slash, no `.json`). */
  fileSlug: string;
  /** IconCatalog identifier — also the `library` prop value. */
  id: string;
  /** Human-readable name shown in the dialog header. */
  label: string;
  /** Builds the `Copy import` snippet for a single icon name. */
  buildImport: (name: string, opts?: IconBuildOptions) => string;
  /** Builds the `Copy JSX` snippet (one-liner usage). */
  buildJsx: (name: string, opts?: IconBuildOptions) => string;
  /** Optional sibling JSON to merge in by name as the outlined-stroke
   *  variant. When set, each icon that exists in both files gets an
   *  `outlinedSvg` companion and the detail panel exposes the toggle. */
  outlinedFileSlug?: string;
};

/**
 * Generic loader for JSON catalogs produced by
 * `scripts/build-icon-catalogs.mjs`. Each catalog is fetched on demand
 * and cached in module scope so subsequent IconBrowser mounts reuse it.
 *
 * If `outlinedFileSlug` is set, fetches that companion in parallel and
 * merges its `svg` onto each matching icon as `outlinedSvg`. Missing
 * entries on the outlined side are tolerated — only icons that exist in
 * both catalogs get the toggle (mirrors the Lucide loader's behaviour).
 */
export function createJsonCatalogLoader(
  config: JsonCatalogConfig
): () => Promise<IconCatalog> {
  let cached: IconCatalog | null = null;
  return async () => {
    if (cached) return cached;

    const requests = [fetch(`/icon-libraries/${config.fileSlug}.json`)];
    if (config.outlinedFileSlug) {
      requests.push(fetch(`/icon-libraries/${config.outlinedFileSlug}.json`));
    }
    const [primaryRes, outlinedRes] = await Promise.all(requests);

    if (!primaryRes.ok) {
      throw new Error(
        `Failed to load icon catalog ${config.id} (${primaryRes.status})`
      );
    }
    const records = (await primaryRes.json()) as JsonCatalogRecord[];

    let outlinedByName: Map<string, string> | null = null;
    if (config.outlinedFileSlug) {
      if (!outlinedRes || !outlinedRes.ok) {
        throw new Error(
          `Failed to load outlined catalog for ${config.id} (${outlinedRes?.status ?? 'no response'})`
        );
      }
      const outlinedRecords = (await outlinedRes.json()) as JsonCatalogRecord[];
      outlinedByName = new Map(outlinedRecords.map((r) => [r.name, r.svg]));
    }

    const icons: CatalogIcon[] = records
      .map((record) => {
        const outlinedSvg = outlinedByName?.get(record.name);
        return {
          name: record.name,
          svg: record.svg,
          ...(record.tags && record.tags.length > 0
            ? { tags: record.tags }
            : {}),
          ...(outlinedSvg ? { outlinedSvg } : {}),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    cached = {
      id: config.id,
      label: config.label,
      buildImport: config.buildImport,
      buildJsx: config.buildJsx,
      icons,
    };
    return cached;
  };
}
