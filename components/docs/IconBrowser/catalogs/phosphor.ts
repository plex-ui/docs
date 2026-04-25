import { createJsonCatalogLoader } from './json-catalog';

export const loadPhosphorCatalog = createJsonCatalogLoader({
  fileSlug: 'phosphor',
  id: 'phosphor',
  label: 'Phosphor',
  buildImport: (name) =>
    `import { ${name} } from '@phosphor-icons/react';`,
  buildJsx: (name) => `<${name} />`,
});
