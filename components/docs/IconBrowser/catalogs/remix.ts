import { createJsonCatalogLoader } from './json-catalog';

export const loadRemixCatalog = createJsonCatalogLoader({
  fileSlug: 'remix',
  id: 'remix',
  label: 'Remix Icon',
  buildImport: (name) => `import { ${name} } from '@remixicon/react';`,
  buildJsx: (name) => `<${name} />`,
});
