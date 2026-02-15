import { SidebarProvider } from 'fumadocs-ui/components/sidebar/base';
import { DocsGlobalNav } from '@/components/layout/DocsGlobalNav';
import { HomeSidebarDrawer } from '@/components/layout/HomeSidebarDrawer';
import { buildDocsTreeNavigation } from '@/lib/docs-navigation';
import { source } from '@/lib/source';
import { Footer } from './_components/Footer';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const docsNavigation = buildDocsTreeNavigation(source.pageTree);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <DocsGlobalNav sections={docsNavigation.sections} />
        <HomeSidebarDrawer sections={docsNavigation.sections} />
        <div className="flex flex-1 flex-col justify-center">{children}</div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
