import { createJsonCatalogLoader } from './json-catalog';

export const loadTablerCatalog = createJsonCatalogLoader({
  fileSlug: 'tabler',
  outlinedFileSlug: 'tabler-outlined',
  id: 'tabler',
  label: 'Tabler',
  buildImport: (name, opts) =>
    opts?.outlined
      ? `import { ${name} } from '@plexui/icons-tabler-outlined';`
      : `import { ${name} } from '@tabler/icons-react';`,
  buildJsx: (name, opts) => {
    if (opts?.outlined) return `<${name} />`;
    return opts?.strokeWidth !== undefined && opts.strokeWidth !== 2
      ? `<${name} stroke={${opts.strokeWidth}} />`
      : `<${name} />`;
  },
});
