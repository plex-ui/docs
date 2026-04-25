'use client';

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Dialog } from '@plexui/ui/components/Dialog';
import { Download, SearchSm } from '@plexui/ui/components/Icon';
import type { CatalogIcon, IconCatalog } from './types';
import s from './IconBrowser.module.css';

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

  const totalLabel = catalog
    ? `${catalog.icons.length.toLocaleString()} icons`
    : 'Loading…';

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
        <span className={s.Count}>
          {catalog == null
            ? totalLabel
            : filtered.length === catalog.icons.length
              ? `${catalog.icons.length.toLocaleString()} icons`
              : `${filtered.length.toLocaleString()} of ${catalog.icons.length.toLocaleString()}`}
        </span>
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
        <div className={s.Grid}>
          {filtered.map((icon) => (
            <button
              key={icon.name}
              type="button"
              className={s.Tile}
              data-icon={icon.name}
              onClick={() => setSelected(icon)}
              aria-label={icon.name}
              title={icon.name}
            >
              <IconRender icon={icon} />
            </button>
          ))}
        </div>
      )}

      <IconDetailDialog
        catalog={catalog}
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ── Dialog with the four copy/download actions ──────────── */

type IconDetailDialogProps = {
  catalog: IconCatalog | null;
  selected: CatalogIcon | null;
  onClose: () => void;
};

type CopiedAction = 'import' | 'jsx' | 'svg' | null;

function IconDetailDialog({ catalog, selected, onClose }: IconDetailDialogProps) {
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

  return (
    <Dialog open={selected != null} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content width={420}>
        {selected && catalog && (
          <div className={s.DialogPanel}>
            <div className={s.Preview}>
              <IconRender icon={selected} />
            </div>
            <h3 className={s.IconName}>{selected.name}</h3>
            <div className={s.Actions}>
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
          </div>
        )}
      </Dialog.Content>
    </Dialog>
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
