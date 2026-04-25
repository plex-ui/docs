import { createJsonCatalogLoader } from './json-catalog';

export const loadLucideOutlinedCatalog = createJsonCatalogLoader({
  fileSlug: 'lucide-outlined',
  id: 'lucide-outlined',
  label: 'Lucide (Outlined)',
  // Once @plexui/icons-lucide-outlined is published, the import below
  // resolves to the package's React-component re-exports. Until then,
  // the package ships only raw SVGs and the import is documentation-only.
  buildImport: (name) =>
    `import { ${name} } from '@plexui/icons-lucide-outlined';`,
  buildJsx: (name) => `<${name} />`,
});
