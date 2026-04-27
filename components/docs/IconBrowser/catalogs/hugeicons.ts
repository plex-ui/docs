import { createJsonCatalogLoader } from './json-catalog';

export const loadHugeiconsCatalog = createJsonCatalogLoader({
  fileSlug: 'hugeicons',
  outlinedFileSlug: 'hugeicons-outlined',
  id: 'hugeicons',
  label: 'Hugeicons',
  buildImport: (name, opts) =>
    opts?.outlined
      ? `import { ${name} } from '@plexui/icons-hugeicons-outlined';`
      : `import { ${name} } from '@hugeicons/core-free-icons';`,
  buildJsx: (name, opts) => {
    if (opts?.outlined) return `<${name} />`;
    return opts?.strokeWidth !== undefined && opts.strokeWidth !== 2
      ? `<HugeiconsIcon icon={${name}} strokeWidth={${opts.strokeWidth}} />`
      : `<HugeiconsIcon icon={${name}} />`;
  },
});
