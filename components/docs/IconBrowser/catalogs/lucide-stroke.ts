import { createJsonCatalogLoader } from './json-catalog';

export const loadLucideStrokeCatalog = createJsonCatalogLoader({
  fileSlug: 'lucide-stroke',
  id: 'lucide-stroke',
  label: 'Lucide',
  buildImport: (name) => `import { ${name} } from 'lucide-react';`,
  buildJsx: (name) => `<${name} />`,
});
