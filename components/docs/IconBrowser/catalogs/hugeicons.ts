import { createJsonCatalogLoader } from './json-catalog';

export const loadHugeiconsCatalog = createJsonCatalogLoader({
  fileSlug: 'hugeicons',
  id: 'hugeicons',
  label: 'Hugeicons',
  buildImport: (name) =>
    `import { ${name} } from '@hugeicons/core-free-icons';`,
  buildJsx: (name, opts) =>
    opts?.strokeWidth !== undefined && opts.strokeWidth !== 2
      ? `<HugeiconsIcon icon={${name}} strokeWidth={${opts.strokeWidth}} />`
      : `<HugeiconsIcon icon={${name}} />`,
});
