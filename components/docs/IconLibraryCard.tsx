import Link from 'fumadocs-core/link';
import type { ReactNode } from 'react';

/**
 * Visual grid wrapper for the /docs/icons index page — three columns on
 * desktop, single column on small screens. Each cell renders an
 * `<IconLibraryCard>`.
 */
export function IconLibraryGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

interface IconLibraryCardProps {
  /** URL slug — links to `/docs/icons/{slug}`. */
  slug: string;
  /** Display name shown beneath the preview. */
  title: string;
  /** Short one-liner describing the library. */
  description: string;
  /** Optional pill rendered next to the title (e.g. "Built-in"). */
  badge?: string;
}

/**
 * Card matching the shadcndesign /icons gallery shape: large preview
 * surface (icon-grid background) with a centered avatar, title and
 * description below. Whole tile is a link.
 */
export function IconLibraryCard({
  slug,
  title,
  description,
  badge,
}: IconLibraryCardProps) {
  return (
    <Link
      href={`/docs/icons/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-fd-card text-fd-card-foreground transition-colors hover:border-fd-foreground/20"
    >
      {/* Preview canvas — diagonal hatch background, centered placeholder
          puck. Once each library page ships its own real preview we can
          render the actual sample SVG here. */}
      <div
        className="relative flex aspect-[4/3] w-full items-center justify-center border-b bg-[length:24px_24px]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 12px)',
        }}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-fd-background shadow-sm">
          <span className="text-xs font-medium text-fd-muted-foreground">
            {title.charAt(0)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <h3 className="not-prose text-sm font-semibold">{title}</h3>
          {badge && (
            <span className="rounded-full bg-fd-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-fd-muted-foreground">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-fd-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
