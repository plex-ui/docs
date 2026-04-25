import * as PlexIcons from '@plexui/ui/components/Icon';
import type { IconCatalog, IconComponent } from '../types';

export const plexCatalog: IconCatalog = {
  id: 'plex',
  label: 'Plex Icons',
  buildImport: (name) => `import { ${name} } from '@plexui/ui/components/Icon';`,
  buildJsx: (name) => `<${name} />`,
  icons: Object.entries(PlexIcons)
    .filter(
      ([key, value]) =>
        typeof value === 'function' && /^[A-Z]/.test(key)
    )
    .map(([name, Component]) => ({
      name,
      Component: Component as IconComponent,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)),
};
