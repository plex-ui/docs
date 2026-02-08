'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ButtonLink } from '@plexui/ui/components/Button';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { usePathname } from 'fumadocs-core/framework';
import { SidebarTrigger } from 'fumadocs-ui/components/sidebar/base';
import { Github, Moon, PanelLeft, Search, Sun } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import type { DocsSectionNavItem } from '@/lib/docs-navigation';
import { shouldShowLeftSidebar } from '@/lib/docs-layout-rules';
import s from './DocsGlobalNav.module.css';

function normalizePath(pathname: string) {
  if (!pathname) return '/';
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

function isActivePath(currentPath: string, href: string) {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);
  return current === target || current.startsWith(`${target}/`);
}

function getSectionSlug(pathname: string) {
  const normalized = normalizePath(pathname);
  const parts = normalized.split('/').filter(Boolean);
  const docsIndex = parts.indexOf('docs');
  return docsIndex === -1 ? null : parts[docsIndex + 1] ?? null;
}

export function DocsGlobalNav({ sections }: { sections: DocsSectionNavItem[] }) {
  const pathname = usePathname();
  const { setOpenSearch } = useSearchContext();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-docs-width', 'wide');
    window.localStorage.setItem('plex-docs-width', 'wide');
  }, []);

  const isDark = resolvedTheme === 'dark';

  const currentSection = useMemo(() => getSectionSlug(pathname), [pathname]);
  const showLeftSidebar = shouldShowLeftSidebar(currentSection);
  const navLinks = useMemo(
    () =>
      sections.map((item) => ({
        ...item,
        active:
          (currentSection != null &&
            (item.matchSlugs?.includes(currentSection) ?? currentSection === item.slug)) ||
          isActivePath(pathname, item.href),
      })),
    [currentSection, pathname, sections]
  );

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className={s.Header} id="plex-global-nav">
      <div className={s.Inner}>
        <div className={s.Left}>
          {showLeftSidebar && (
            <SidebarTrigger className={s.MenuButton} aria-label="Open Sidebar">
              <PanelLeft className={s.Icon} />
            </SidebarTrigger>
          )}

          <Link href="/" className={s.Brand}>
            <Image
              src="/favicon.svg"
              alt=""
              aria-hidden
              width={24}
              height={24}
              className={s.BrandIcon}
              priority
            />
            <span className={s.BrandText}>Plex UI</span>
          </Link>

          <nav className={s.NavLinks} aria-label="Primary">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${s.NavLink} ${item.active ? s.NavLinkActive : ''}`.trim()}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={s.Center}>
          <button
            type="button"
            className={s.SearchButton}
            onClick={() => setOpenSearch(true)}
            aria-label="Open search"
          >
            <Search className={s.Icon} />
            <span className={s.SearchLabel}>Search documentation...</span>
            <span className={s.Kbd}>⌘K</span>
          </button>
        </div>

        <div className={s.Right}>
          <button
            type="button"
            className={`${s.IconButton} ${s.MobileSearch}`.trim()}
            onClick={() => setOpenSearch(true)}
            aria-label="Open search"
          >
            <Search className={s.Icon} />
          </button>

          <Link
            href="https://github.com/plex-ui/ui"
            target="_blank"
            rel="noreferrer noopener"
            className={s.IconButton}
            aria-label="Open GitHub repository"
          >
            <Github className={s.Icon} />
          </Link>

          <button
            type="button"
            className={s.IconButton}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className={s.Icon} /> : <Moon className={s.Icon} />}
          </button>

          <ButtonLink
            href="#"
            color="primary"
            variant="solid"
            size="sm"
            pill={false}
            className={s.FigmaButton}
          >
            Figma Kit
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
