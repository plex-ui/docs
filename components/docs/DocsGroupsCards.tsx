import { Card, Cards } from 'fumadocs-ui/components/card';
import { DOCS_GROUPS } from '@/lib/docs-navigation';

export type DocsGroupsCardsProps = {
  /** Restrict to a subset of group ids in the order given. Defaults to
   *  every group except `get-started` (the user is already on the
   *  Introduction page when this renders, no need to surface itself). */
  ids?: string[];
};

/**
 * Renders the docs sidebar groups (Foundations / AI & Distribution /
 * API / etc.) as a card grid. Source of truth is `DOCS_GROUPS` in
 * `lib/docs-navigation.ts` — the same list the sidebar uses — so the
 * intro CTA stays in sync without a parallel hand-curated copy.
 *
 * Each card links to the group's first entry and lists the rest of
 * the group's pages as its description. That gives the reader a real
 * preview of "what's inside" before they click.
 */
export function DocsGroupsCards({ ids }: DocsGroupsCardsProps = {}) {
  const groups = ids
    ? (ids
        .map((id) => DOCS_GROUPS.find((group) => group.id === id))
        .filter((group): group is (typeof DOCS_GROUPS)[number] => Boolean(group)))
    : DOCS_GROUPS.filter((group) => group.id !== 'get-started');

  return (
    <Cards>
      {groups.map((group) => {
        const [first] = group.entries;
        return (
          <Card
            key={group.id}
            href={first?.url ?? '/docs'}
            title={group.label}
            description={group.description}
          />
        );
      })}
    </Cards>
  );
}
