import { DocsGlobalNav } from '@/components/layout/DocsGlobalNav';
import { buildDocsTreeNavigation } from '@/lib/docs-navigation';
import { source } from '@/lib/source';
import { Footer } from './_components/Footer';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const docsNavigation = buildDocsTreeNavigation(source.pageTree);

  return (
    <div className="flex min-h-screen flex-col">
      <DocsGlobalNav sections={docsNavigation.sections} />
      <div className="flex flex-1 flex-col justify-center">{children}</div>
      <Footer />
    </div>
  );
}
