import type { ComponentType, SVGProps } from 'react';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * One catalog entry — either a React component (Plex Icons, where each
 * icon already lives as a JSX export) or a raw SVG string (external
 * libraries fetched as a static JSON catalog so we don't bundle 1.9k
 * React components into the docs route).
 */
export type CatalogIcon =
  | { name: string; Component: IconComponent; svg?: undefined }
  | { name: string; Component?: undefined; svg: string };

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
