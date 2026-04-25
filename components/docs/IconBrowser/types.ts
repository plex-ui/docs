import type { ComponentType, SVGProps } from 'react';

/**
 * Render an icon. Most catalogs hand back a React component that takes
 * standard SVG props; some libraries (Hugeicons) need a wrapper that
 * receives icon data — those catalogs return a thin component that
 * already closes over the data.
 */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type CatalogIcon = {
  /** Unique name within the catalog — also the React export name. */
  name: string;
  /** Component that renders the SVG. */
  Component: IconComponent;
};

export type IconCatalog = {
  /** Library identifier. Should match the `library` prop on <IconBrowser>. */
  id: string;
  /** Human-readable name shown in the dialog header. */
  label: string;
  /** Builds the `Copy import` snippet for a single icon name. */
  buildImport: (name: string) => string;
  /** Builds the `Copy JSX` snippet (one-liner usage). */
  buildJsx: (name: string) => string;
  /** All icons. Pre-sorted alphabetically. */
  icons: CatalogIcon[];
};
