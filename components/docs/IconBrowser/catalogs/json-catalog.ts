import type { CatalogIcon, IconCatalog } from '../types';

type JsonCatalogRecord = { name: string; svg: string };

type JsonCatalogConfig = {
  /** Path under `/public/icon-libraries/` (no leading slash, no `.json`). */
  fileSlug: string;
  /** IconCatalog identifier — also the `library` prop value. */
  id: string;
  /** Human-readable name shown in the dialog header. */
  label: string;
  /** Builds the `Copy import` snippet for a single icon name. */
  buildImport: (name: string) => string;
  /** Builds the `Copy JSX` snippet (one-liner usage). */
  buildJsx: (name: string) => string;
};

/**
 * Generic loader for JSON catalogs produced by
 * `scripts/build-icon-catalogs.mjs`. Each catalog is fetched on demand
 * and cached in module scope so subsequent IconBrowser mounts reuse it.
 */
export function createJsonCatalogLoader(
  config: JsonCatalogConfig
): () => Promise<IconCatalog> {
  let cached: IconCatalog | null = null;
  return async () => {
    if (cached) return cached;

    const response = await fetch(`/icon-libraries/${config.fileSlug}.json`);
    if (!response.ok) {
      throw new Error(
        `Failed to load icon catalog ${config.id} (${response.status})`
      );
    }
    const records = (await response.json()) as JsonCatalogRecord[];

    const icons: CatalogIcon[] = records
      .map((record) => ({ name: record.name, svg: record.svg }))
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
