/**
 * Component slugs that should show a "New" badge in the docs sidebar.
 * Keep in sync with changelog (Unreleased → Added).
 */
export const NEW_COMPONENT_SLUGS = [] as const;

export function getNewComponentHrefs(): string[] {
  return NEW_COMPONENT_SLUGS.map((slug) => `/docs/components/${slug}`);
}
