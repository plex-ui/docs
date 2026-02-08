'use client';

import { useMemo, useState } from 'react';
import { EmptyMessage } from '@plexui/ui/components/EmptyMessage';
import * as Icons from '@plexui/ui/components/Icon';
import s from './IconGallery.module.css';

export function IconGallery() {
  const [search, setSearch] = useState<string>('');
  const iconList = useMemo(
    () =>
      Object.entries(Icons).filter(
        ([name]) =>
          typeof (Icons as Record<string, unknown>)[name] === 'function' &&
          name.toLowerCase().includes(search.toLowerCase().trim())
      ),
    [search]
  );

  return (
    <>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Icons.Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      {iconList.length === 0 ? (
        <EmptyMessage className={s.EmptyMessage} fill="none">
          <EmptyMessage.Icon size="sm">
            <Icons.Search />
          </EmptyMessage.Icon>
          <EmptyMessage.Description>
            No icons found matching <span className={s.SearchTerm}>"{search}"</span>
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <div className={s.Grid}>
          {iconList.map(([name, Icon]) => (
            <div key={name} className={s.Item}>
              <div className={s.IconWrap}>
                <Icon />
              </div>
              <span className={s.Name}>{name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
