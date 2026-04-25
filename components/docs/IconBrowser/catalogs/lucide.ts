import type { CatalogIcon, IconCatalog } from '../types';

type JsonRecord = { name: string; svg: string; tags?: string[] };

/**
 * Loader for the unified Lucide catalog.
 *
 * Fetches two static JSONs in parallel:
 *   - `/icon-libraries/lucide.json`           — the canonical stroke set
 *   - `/icon-libraries/lucide-outlined.json`  — same icons converted to
 *                                                filled-outline geometry
 *
 * Merges them by name so each `CatalogIcon` carries both its stroke
 * `svg` and an `outlinedSvg` companion. The detail panel uses the toggle
 * to switch between the two without a tab change.
 *
 * Cached at module scope — subsequent IconBrowser mounts share the same
 * resolved catalog instance.
 */
let cached: IconCatalog | null = null;

export async function loadLucideCatalog(): Promise<IconCatalog> {
  if (cached) return cached;

  const [strokeRes, outlinedRes] = await Promise.all([
    fetch('/icon-libraries/lucide.json'),
    fetch('/icon-libraries/lucide-outlined.json'),
  ]);
  if (!strokeRes.ok) {
    throw new Error(
      `Failed to load Lucide stroke catalog (${strokeRes.status})`
    );
  }
  if (!outlinedRes.ok) {
    throw new Error(
      `Failed to load Lucide outlined catalog (${outlinedRes.status})`
    );
  }

  const stroke = (await strokeRes.json()) as JsonRecord[];
  const outlined = (await outlinedRes.json()) as JsonRecord[];

  const outlinedByName = new Map(outlined.map((r) => [r.name, r.svg]));

  const icons: CatalogIcon[] = stroke
    .map((record) => {
      const outlinedSvg = outlinedByName.get(record.name);
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
    id: 'lucide',
    label: 'Lucide',
    buildImport: (name, opts) =>
      opts?.outlined
        ? `import { ${name} } from '@plexui/icons-lucide-outlined';`
        : `import { ${name} } from 'lucide-react';`,
    buildJsx: (name, opts) => {
      // Outlined icons are filled — strokeWidth doesn't apply.
      if (opts?.outlined) return `<${name} />`;
      // Default stroke-width 2 → keep the snippet bare for cleanliness.
      if (opts?.strokeWidth !== undefined && opts.strokeWidth !== 2) {
        return `<${name} strokeWidth={${opts.strokeWidth}} />`;
      }
      return `<${name} />`;
    },
    icons,
  };
  return cached;
}
