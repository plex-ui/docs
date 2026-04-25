import { createJsonCatalogLoader } from './json-catalog';

export const loadTablerCatalog = createJsonCatalogLoader({
  fileSlug: 'tabler',
  id: 'tabler',
  label: 'Tabler',
  buildImport: (name) => `import { ${name} } from '@tabler/icons-react';`,
  buildJsx: (name, opts) =>
    opts?.strokeWidth !== undefined && opts.strokeWidth !== 2
      ? `<${name} stroke={${opts.strokeWidth}} />`
      : `<${name} />`,
});
