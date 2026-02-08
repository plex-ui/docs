'use client';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import s from './UsageBlock.module.css';

export function UsageBlock({
  children,
  lang = 'tsx',
}: {
  children: string;
  lang?: string;
}) {
  return (
    <div className={`${s.Container} not-prose`} style={{ marginBottom: '2.5rem' }}>
      <div className={s.CodeWrap}>
        <DynamicCodeBlock
          lang={lang}
          code={children}
          codeblock={{ allowCopy: true }}
        />
      </div>
    </div>
  );
}
