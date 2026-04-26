import * as PlexIcons from '@plexui/ui/components/Icon';
import type { CatalogIcon, IconCatalog, IconComponent } from '../types';

/**
 * Loader for the Plex Icons catalog.
 *
 * The icon set itself comes in via React-component imports from
 * `@plexui/ui/components/Icon` — every icon is already JSX, no SVG
 * string parsing needed.
 *
 * Tags and the filled-name allowlist both arrive as side-car JSON
 * files served from `/icon-libraries/`:
 *   - `plex-tags.json`         (rule-based PascalCase decomposition)
 *   - `plex-filled-names.json` (pixel-rendered classification)
 *
 * The set has two tabs in the docs UI: Outline + Filled. Filled
 * membership is NOT decided by the `Filled` suffix alone — Plex
 * naming is inconsistent (BookmarkSaved, CaptionCcOn, ChartXAxis,
 * CircleRadioSelected and others are visually filled without the
 * suffix), so we trust the rendered fill-ratio classifier output
 * (`scripts/classify-plex-filled.mjs`).
 *
 * Each variant has its own module-scope cache.
 */

type Variant = 'outline' | 'filled';

const cache: { outline: IconCatalog | null; filled: IconCatalog | null } = {
  outline: null,
  filled: null,
};

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(path);
    if (response.ok) return (await response.json()) as T;
  } catch {
    /* ignore — fall back to the default */
  }
  return fallback;
}

async function loadVariant(variant: Variant): Promise<IconCatalog> {
  if (cache[variant]) return cache[variant] as IconCatalog;

  // Side-car data — best-effort. If either JSON is missing the
  // catalog still loads (just without tags, or with the suffix-only
  // filled fallback) so the dev-server first-start isn't broken
  // before the build script runs.
  const [tagsByName, filledNames] = await Promise.all([
    fetchJson<Record<string, string[]>>('/icon-libraries/plex-tags.json', {}),
    fetchJson<string[]>('/icon-libraries/plex-filled-names.json', []),
  ]);
  const filledSet = new Set(filledNames);
  const isFilled = (name: string) =>
    filledSet.size > 0 ? filledSet.has(name) : /Filled$/.test(name);

  // Filter out backward-compat aliases. Every primary Plex icon ships
  // with `Component.displayName === "<exportName>"` (set inline in each
  // svg/<Name>.tsx file). Aliases in packages/ui/src/components/Icon/
  // aliases.ts re-export the SAME default function under a different
  // export key — so the alias's `displayName` still equals the
  // CANONICAL name, not the alias key. Keeping only entries where
  // `displayName === key` drops every alias automatically (no
  // hand-curated blacklist to keep in sync).
  const icons: CatalogIcon[] = Object.entries(PlexIcons)
    .filter(([key, value]) => {
      if (typeof value !== 'function') return false;
      if (!/^[A-Z]/.test(key)) return false;
      const displayName = (value as { displayName?: string }).displayName;
      // Allow components without a displayName (treated as canonical)
      // and only drop entries where displayName explicitly disagrees
      // with the export key — that's the alias signature.
      if (displayName && displayName !== key) return false;
      // Variant filter — visually-filled icons (suffix OR pixel-rendered
      // classification) go to the filled catalog, everything else to
      // the outline catalog.
      const filled = isFilled(key);
      return variant === 'filled' ? filled : !filled;
    })
    .map(([name, Component]) => {
      const tags = tagsByName[name];
      return {
        name,
        Component: Component as IconComponent,
        ...(tags && tags.length > 0 ? { tags } : {}),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const id = variant === 'filled' ? 'plex-filled' : 'plex';
  const label = variant === 'filled' ? 'Plex · Filled' : 'Plex Icons';
  const result: IconCatalog = {
    id,
    label,
    buildImport: (name) => `import { ${name} } from '@plexui/ui/components/Icon';`,
    buildJsx: (name) => `<${name} />`,
    icons,
  };
  cache[variant] = result;
  return result;
}

export const loadPlexCatalog = () => loadVariant('outline');
export const loadPlexFilledCatalog = () => loadVariant('filled');
