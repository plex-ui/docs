import type { CatalogIcon, IconCatalog } from '../types';

type LucideIconRecord = { name: string; svg: string };

let cached: IconCatalog | null = null;

/**
 * Loads the lucide-stroke catalog from the prebuilt JSON file in
 * `public/icon-libraries/lucide-stroke.json`. The file ships as a static
 * asset (~1MB) so the docs route doesn't have to bundle 1.9k React icon
 * components — Turbopack chokes on `import * as Lucide from 'lucide-react'`
 * which would otherwise touch every icon module.
 *
 * Regenerate the JSON with `npm run build:icon-catalogs` after upgrading
 * lucide-static.
 */
export async function loadLucideStrokeCatalog(): Promise<IconCatalog> {
  if (cached) return cached;

  const response = await fetch('/icon-libraries/lucide-stroke.json');
  if (!response.ok) {
    throw new Error(`Failed to load lucide-stroke catalog (${response.status})`);
  }
  const records = (await response.json()) as LucideIconRecord[];

  const icons: CatalogIcon[] = records
    .map((record) => ({ name: record.name, svg: record.svg }))
    .sort((a, b) => a.name.localeCompare(b.name));

  cached = {
    id: 'lucide-stroke',
    label: 'Lucide',
    buildImport: (name) => `import { ${name} } from 'lucide-react';`,
    buildJsx: (name) => `<${name} />`,
    icons,
  };

  return cached;
}
