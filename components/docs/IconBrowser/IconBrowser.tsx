'use client';

import {
  createElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { Button } from '@plexui/ui/components/Button';
import { Download, SearchSm, X } from '@plexui/ui/components/Icon';
import type { CatalogIcon, IconCatalog } from './types';
import s from './IconBrowser.module.css';

/** Tile measurements that drive the virtualized grid maths. Must match
 *  the values in IconBrowser.module.css (.Tile aspect-ratio + .Grid gap).
 *  Sizes match lucide.dev/icons: 56px tile, 8px gap. */
const TILE_SIZE = 56;
const GRID_GAP = 8;

/**
 * Lazy catalog loaders — `import()` keeps the per-library icon module
 * out of the docs route's main chunk. Without this Turbopack chokes on
 * compiling `import * as Lucide from 'lucide-react'` (~1.9k icons) every
 * time `/docs/[[...slug]]` is rebuilt.
 */
const CATALOG_LOADERS: Record<string, () => Promise<IconCatalog>> = {
  plex: () => import('./catalogs/plex').then((m) => m.plexCatalog),
  'lucide-stroke': () =>
    import('./catalogs/lucide-stroke').then((m) => m.loadLucideStrokeCatalog()),
  phosphor: () =>
    import('./catalogs/phosphor').then((m) => m.loadPhosphorCatalog()),
  remix: () => import('./catalogs/remix').then((m) => m.loadRemixCatalog()),
  tabler: () => import('./catalogs/tabler').then((m) => m.loadTablerCatalog()),
  hugeicons: () =>
    import('./catalogs/hugeicons').then((m) => m.loadHugeiconsCatalog()),
};

export type IconBrowserLibrary = keyof typeof CATALOG_LOADERS;

export type IconBrowserProps = {
  /** Which icon set to render. */
  library: IconBrowserLibrary;
};

export function IconBrowser({ library }: IconBrowserProps) {
  const [catalog, setCatalog] = useState<IconCatalog | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CatalogIcon | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(12);
  const [scrollMargin, setScrollMargin] = useState(0);

  // Recompute the column count whenever the container width changes.
  // The grid uses fixed-size tiles + a fixed gap, so columns =
  // floor((width + gap) / (tile + gap)).
  useLayoutEffect(() => {
    const node = gridContainerRef.current;
    if (!node) return;

    const update = () => {
      const next = Math.max(
        1,
        Math.floor((node.clientWidth + GRID_GAP) / (TILE_SIZE + GRID_GAP))
      );
      setColumns(next);
      // The window virtualizer needs to know how far the grid sits below
      // the document top so visible-row maths line up with `window.scrollY`.
      const rect = node.getBoundingClientRect();
      setScrollMargin(rect.top + window.scrollY);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [catalog]);

  // Load the catalog on mount / library change.
  useEffect(() => {
    let cancelled = false;
    const loader = CATALOG_LOADERS[library];
    if (!loader) return;
    setCatalog(null);
    loader().then((next) => {
      if (!cancelled) setCatalog(next);
    });
    return () => {
      cancelled = true;
    };
  }, [library]);

  const filtered = useMemo(() => {
    if (!catalog) return [];
    const q = query.trim().toLowerCase();
    if (!q) return catalog.icons;
    return catalog.icons.filter((icon) => icon.name.toLowerCase().includes(q));
  }, [catalog, query]);

  const rowCount = Math.ceil(filtered.length / columns);
  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => TILE_SIZE + GRID_GAP,
    overscan: 6,
    scrollMargin,
  });

  // ⌘K / Ctrl+K focuses the search input.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  if (!CATALOG_LOADERS[library]) {
    return null;
  }

  return (
    <div className={s.Root}>
      <div className={s.SearchRow}>
        <div className={s.InputWrap}>
          <SearchSm className={s.InputIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              catalog
                ? `Search ${catalog.icons.length.toLocaleString()} icons…`
                : 'Loading icons…'
            }
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={s.Input}
            aria-label={catalog ? `Search ${catalog.label}` : 'Search'}
            disabled={!catalog}
          />
          {query.length > 0 ? (
            <button
              type="button"
              className={s.ClearButton}
              aria-label="Clear search"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          ) : (
            <kbd className={s.Kbd}>⌘K</kbd>
          )}
        </div>
        {/* Count is encoded in the input placeholder ("Search 674 icons…") so we
            don't repeat it next to the field — matches lucide.dev/icons. */}
      </div>

      {!catalog ? (
        <div className={s.Grid} aria-busy="true">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className={s.SkeletonTile} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className={s.Empty}>
          <SearchSm className={s.EmptyIcon} />
          <p className={s.EmptyText}>
            No icons match <strong>“{query}”</strong>
          </p>
        </div>
      ) : (
        <div
          ref={gridContainerRef}
          className={s.GridContainer}
          style={{ height: virtualizer.getTotalSize() }}
        >
          {virtualizer.getVirtualItems().map((row) => {
            const start = row.index * columns;
            const end = Math.min(start + columns, filtered.length);
            const slice = filtered.slice(start, end);
            return (
              <div
                key={row.key}
                className={s.GridRow}
                style={{
                  transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`,
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {slice.map((icon) => (
                  <button
                    key={icon.name}
                    type="button"
                    className={s.Tile}
                    data-icon={icon.name}
                    onClick={() => setSelected(icon)}
                    aria-label={icon.name}
                    aria-pressed={selected?.name === icon.name || undefined}
                  >
                    <IconRender icon={icon} />
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <IconDetailPanel
        catalog={catalog}
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ── Floating, non-blocking detail panel ─────────────────── */

type IconDetailPanelProps = {
  catalog: IconCatalog | null;
  selected: CatalogIcon | null;
  onClose: () => void;
};

type CopiedAction = 'import' | 'jsx' | 'svg' | null;

function IconDetailPanel({ catalog, selected, onClose }: IconDetailPanelProps) {
  const [copied, setCopied] = useState<CopiedAction>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const flash = (action: Exclude<CopiedAction, null>) => {
    clearTimeout(flashTimer.current);
    setCopied(action);
    flashTimer.current = setTimeout(() => setCopied(null), 1500);
  };

  const getSvgMarkup = (icon: CatalogIcon): string | null => {
    // External catalogs ship raw SVG — use it directly.
    if (icon.svg) {
      return icon.svg.includes('xmlns=')
        ? icon.svg
        : icon.svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    // Plex catalog: lift SVG from the rendered DOM tile.
    const node = document.querySelector(`[data-icon="${icon.name}"] svg`);
    if (!node) return null;
    return node.outerHTML
      .replace(/ aria-hidden="true"/, '')
      .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  };

  const copy = async (text: string, action: Exclude<CopiedAction, null>) => {
    await writeToClipboard(text);
    flash(action);
  };

  // Esc closes the panel without dimming the grid behind it.
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected, onClose]);

  if (!selected || !catalog) return null;

  return (
    <aside
      className={s.Panel}
      role="region"
      aria-label={`${selected.name} actions`}
    >
      <button
        type="button"
        className={s.PanelClose}
        onClick={onClose}
        aria-label="Close"
      >
        <X />
      </button>
      <div className={s.PanelPreview}>
        <IconRender icon={selected} />
      </div>
      <h3 className={s.PanelName}>{selected.name}</h3>
      <div className={s.PanelActions}>
        <Button
          variant="solid"
          color="primary"
          onClick={() => copy(catalog.buildImport(selected.name), 'import')}
          block
        >
          {copied === 'import' ? 'Copied!' : 'Copy import'}
        </Button>
        <Button
          variant="outline"
          color="secondary"
          onClick={() => copy(catalog.buildJsx(selected.name), 'jsx')}
          block
        >
          {copied === 'jsx' ? 'Copied!' : 'Copy JSX'}
        </Button>
        <Button
          variant="outline"
          color="secondary"
          onClick={() => {
            const svg = getSvgMarkup(selected);
            if (svg) copy(svg, 'svg');
          }}
          block
        >
          {copied === 'svg' ? 'Copied!' : 'Copy SVG'}
        </Button>
        <Button
          variant="outline"
          color="secondary"
          onClick={() => {
            const svg = getSvgMarkup(selected);
            if (svg) downloadSvgFile(`${selected.name}.svg`, svg);
          }}
          block
        >
          <Download /> Download
        </Button>
      </div>
    </aside>
  );
}

/* ── Icon renderer (component vs raw SVG) ────────────────── */

/**
 * Renders either a React icon component (Plex catalog) or a raw SVG
 * string parsed into React elements (external catalogs). Parsing happens
 * client-side via DOMParser — same trust boundary as `<svg>` markup we
 * generate at build time, no `dangerouslySetInnerHTML`, no third-party
 * sanitizer needed.
 */
function IconRender({ icon }: { icon: CatalogIcon }) {
  const parsed = useMemo(() => {
    if (icon.Component) return null;
    if (typeof window === 'undefined') return null;
    return parseSvgString(icon.svg);
  }, [icon]);

  if (icon.Component) {
    const Component = icon.Component;
    return <Component />;
  }
  return parsed;
}

/** SVG attributes that need a different name in React's JSX dialect. */
const SVG_ATTR_RENAMES: Record<string, string> = {
  class: 'className',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'xmlns:xlink': 'xmlnsXlink',
  'xlink:href': 'xlinkHref',
};

function elementToReact(node: Element, key: number = 0): ReactElement {
  const props: Record<string, string | number> = { key };
  for (const attr of Array.from(node.attributes)) {
    const name = SVG_ATTR_RENAMES[attr.name] ?? attr.name;
    props[name] = attr.value;
  }
  const children = Array.from(node.children).map((child, i) =>
    elementToReact(child, i)
  );
  return createElement(node.tagName.toLowerCase(), props, ...children);
}

function parseSvgString(svgString: string): ReactElement | null {
  try {
    const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');
    if (!svgEl || doc.querySelector('parsererror')) return null;
    return elementToReact(svgEl);
  } catch {
    return null;
  }
}

/* ── Helpers ──────────────────────────────────────────────── */

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for non-https / older browsers.
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

function downloadSvgFile(filename: string, svg: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
