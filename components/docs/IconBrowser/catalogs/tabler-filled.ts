import { createJsonCatalogLoader } from './json-catalog';

/**
 * Tabler filled variant — 1,053 icons (strict subset of the 5,039
 * outline icons). Tabler React exports the filled variant under the
 * `…Filled` suffix: `IconAccessibleFilled`, `IconAdjustmentsFilled`, …
 *
 * Filled icons are pure-fill geometry; the stroke-width slider in the
 * detail panel correctly disables itself for them (no `stroke=…` on
 * the root SVG).
 */
export const loadTablerFilledCatalog = createJsonCatalogLoader({
  fileSlug: 'tabler-filled',
  id: 'tabler-filled',
  label: 'Tabler · Filled',
  buildImport: (name) => `import { ${name} } from '@tabler/icons-react';`,
  buildJsx: (name) => `<${name} />`,
});
