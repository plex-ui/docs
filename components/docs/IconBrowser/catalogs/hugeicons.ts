import { createJsonCatalogLoader } from './json-catalog';

export const loadHugeiconsCatalog = createJsonCatalogLoader({
  fileSlug: 'hugeicons',
  id: 'hugeicons',
  label: 'Hugeicons',
  buildImport: (name) =>
    `import { ${name} } from '@hugeicons/core-free-icons';`,
  buildJsx: (name) => `<HugeiconsIcon icon={${name}} />`,
});
