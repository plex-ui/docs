import { CodeBlock } from '@plexui/ui/components/CodeBlock';
import s from './UsageBlock.module.css';

/**
 * Single-line "import" code snippet shown above every component page.
 * Uses Plex `<CodeBlock>` (Prism syntax + Plex CopyButton) so the
 * highlighting palette and copy-button chrome match every other
 * codeblock on the docs site — previously this used Fumadocs
 * `<DynamicCodeBlock>` (Shiki + GitHub theme + Fumadocs copy button)
 * which produced a different syntax theme and a different copy
 * button colour from the demo blocks below it.
 */
export function UsageBlock({
  children,
  lang = 'tsx',
}: {
  children: string;
  lang?: string;
}) {
  return (
    <div className={`${s.Container} not-prose`}>
      <CodeBlock language={lang}>{children}</CodeBlock>
    </div>
  );
}
