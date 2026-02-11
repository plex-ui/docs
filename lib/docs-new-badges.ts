/**
 * Component slugs that should show a "New" badge in the docs sidebar.
 * Keep in sync with changelog (Unreleased → Added).
 */
export const NEW_COMPONENT_SLUGS = [
  'field',
  'sidebar',
  'skeleton',
  'floating-label-input',
  'progress-steps',
  'shimmer-text',
] as const;

export function getNewComponentHrefs(): string[] {
  return NEW_COMPONENT_SLUGS.map((slug) => `/docs/components/${slug}`);
}
