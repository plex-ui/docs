'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Dialog } from '@plexui/ui/components/Dialog';
import { Download, SearchSm } from '@plexui/ui/components/Icon';
import { plexCatalog } from './catalogs/plex';
import type { CatalogIcon, IconCatalog } from './types';
import s from './IconBrowser.module.css';

const CATALOGS: Record<string, IconCatalog> = {
  plex: plexCatalog,
};

export type IconBrowserLibrary = keyof typeof CATALOGS;

export type IconBrowserProps = {
  /** Which icon set to render. Each catalog ships its own icon list and
   * import-path conventions. */
  library: IconBrowserLibrary;
};

export function IconBrowser({ library }: IconBrowserProps) {
  const catalog = CATALOGS[library];
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CatalogIcon | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
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

  if (!catalog) {
    // Defensive — should never trigger because the prop is typed against CATALOGS keys.
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
            placeholder={`Search ${catalog.icons.length.toLocaleString()} icons…`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={s.Input}
            aria-label={`Search ${catalog.label}`}
          />
          <kbd className={s.Kbd}>⌘K</kbd>
        </div>
        <span className={s.Count}>
          {filtered.length === catalog.icons.length
            ? `${catalog.icons.length.toLocaleString()} icons`
            : `${filtered.length.toLocaleString()} of ${catalog.icons.length.toLocaleString()}`}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className={s.Empty}>
          <SearchSm className={s.EmptyIcon} />
          <p className={s.EmptyText}>
            No icons match <strong>“{query}”</strong>
          </p>
        </div>
      ) : (
        <div className={s.Grid}>
          {filtered.map((icon) => {
            const { name, Component } = icon;
            return (
              <button
                key={name}
                type="button"
                className={s.Tile}
                data-icon={name}
                onClick={() => setSelected(icon)}
                aria-label={name}
                title={name}
              >
                <Component />
              </button>
            );
          })}
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
  catalog: IconCatalog;
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

  const getSvgMarkup = (name: string): string | null => {
    const node = document.querySelector(`[data-icon="${name}"] svg`);
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
        {selected && (
          <div className={s.DialogPanel}>
            <div className={s.Preview}>
              <selected.Component />
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
                  const svg = getSvgMarkup(selected.name);
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
                  const svg = getSvgMarkup(selected.name);
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
