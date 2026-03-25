'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { EmptyMessage } from '@plexui/ui/components/EmptyMessage';
import * as Icons from '@plexui/ui/components/Icon';
import s from './IconGallery.module.css';

type CopiedState = { name: string; type: 'import' | 'svg' } | null;

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
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

export function IconGallery() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<CopiedState>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const allIcons = useMemo(
    () =>
      Object.entries(Icons).filter(
        ([name]) => typeof (Icons as Record<string, unknown>)[name] === 'function'
      ),
    []
  );

  const iconList = useMemo(
    () =>
      search.trim()
        ? allIcons.filter(([name]) =>
            name.toLowerCase().includes(search.toLowerCase().trim())
          )
        : allIcons,
    [allIcons, search]
  );

  const flash = useCallback((name: string, type: 'import' | 'svg') => {
    clearTimeout(timerRef.current);
    setCopied({ name, type });
    timerRef.current = setTimeout(() => setCopied(null), 1500);
  }, []);

  const handleCopyImport = useCallback(
    async (name: string) => {
      await writeToClipboard(
        `import { ${name} } from "@plexui/ui/components/Icon"`
      );
      flash(name, 'import');
    },
    [flash]
  );

  const handleCopySvg = useCallback(
    async (name: string) => {
      const svgEl = document.querySelector(`[data-icon="${name}"] svg`);
      if (!svgEl) return;
      const svg = svgEl.outerHTML
        .replace(/ aria-hidden="true"/, '')
        .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
      await writeToClipboard(svg);
      flash(name, 'svg');
    },
    [flash]
  );

  return (
    <>
      <div className={s.StickyContainer}>
        <div className={s.SearchRow}>
          <div className={s.InputWrap}>
            <Icons.Search className={s.InputIcon} />
            <input
              className={s.Input}
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
              placeholder="Search icons..."
            />
          </div>
          <span className={s.Count}>
            {iconList.length === allIcons.length
              ? `${allIcons.length} icons`
              : `${iconList.length} of ${allIcons.length}`}
          </span>
        </div>
      </div>
      {iconList.length === 0 ? (
        <EmptyMessage className={s.EmptyMessage} fill="none">
          <EmptyMessage.Icon size="sm">
            <Icons.Search />
          </EmptyMessage.Icon>
          <EmptyMessage.Description>
            No icons found matching{' '}
            <span className={s.SearchTerm}>"{search}"</span>
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <div className={s.Grid}>
          {iconList.map(([name, Icon]) => {
            const isCopied = copied?.name === name;
            const copiedLabel =
              copied?.type === 'svg' ? 'SVG copied!' : 'Import copied!';
            return (
              <div
                key={name}
                className={`${s.Item} ${isCopied ? s.ItemCopied : ''}`}
                data-icon={name}
              >
                <div className={s.IconWrap}>
                  <Icon />
                </div>
                <span className={s.Name}>
                  {isCopied ? copiedLabel : name}
                </span>
                {!isCopied && (
                  <div className={s.Actions}>
                    <button
                      type="button"
                      className={s.Action}
                      onClick={() => handleCopyImport(name)}
                    >
                      Import
                    </button>
                    <button
                      type="button"
                      className={s.Action}
                      onClick={() => handleCopySvg(name)}
                    >
                      SVG
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
