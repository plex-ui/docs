'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'fumadocs-core/framework';
import { SidebarTrigger } from 'fumadocs-ui/components/sidebar/base';
import { PanelLeft } from 'lucide-react';
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
        {/* Left column: hamburger + brand */}
        <div className={s.Left}>
          {showLeftSidebar && (
            <SidebarTrigger className={s.MenuButton} aria-label="Open Sidebar" data-plex-nav-trigger="">
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
        </div>

        {/* Center column: nav links (horizontally centered) */}
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

        {/* Right column: CTA + theme toggle */}
        <div className={s.Right}>
          <Link
            href="/#pricing"
            className={s.FigmaButton}
          >
            Figma Kit
          </Link>

          <button
            type="button"
            className={s.ThemeToggle}
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
          >
            {/* Sun icon — shown in light mode */}
            <svg className={s.ThemeIconLight} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11 0C11.5523 0 12 0.447715 12 1V3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3V1C10 0.447715 10.4477 0 11 0ZM3.22183 3.22183C3.61235 2.8313 4.24551 2.8313 4.63604 3.22183L6.05025 4.63604C6.44078 5.02656 6.44078 5.65973 6.05025 6.05025C5.65973 6.44078 5.02656 6.44078 4.63604 6.05025L3.22183 4.63604C2.8313 4.24551 2.8313 3.61235 3.22183 3.22183ZM18.7782 3.22183C19.1687 3.61235 19.1687 4.24551 18.7782 4.63604L17.364 6.05025C16.9734 6.44078 16.3403 6.44078 15.9497 6.05025C15.5592 5.65973 15.5592 5.02656 15.9497 4.63604L17.364 3.22183C17.7545 2.8313 18.3876 2.8313 18.7782 3.22183ZM11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8ZM6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11C16 13.7614 13.7614 16 11 16C8.23858 16 6 13.7614 6 11ZM0 11C0 10.4477 0.447715 10 1 10H3C3.55228 10 4 10.4477 4 11C4 11.5523 3.55228 12 3 12H1C0.447715 12 0 11.5523 0 11ZM18 11C18 10.4477 18.4477 10 19 10H21C21.5523 10 22 10.4477 22 11C22 11.5523 21.5523 12 21 12H19C18.4477 12 18 11.5523 18 11ZM6.05025 15.9497C6.44078 16.3403 6.44078 16.9734 6.05025 17.364L4.63604 18.7782C4.24551 19.1687 3.61235 19.1687 3.22183 18.7782C2.8313 18.3876 2.8313 17.7545 3.22183 17.364L4.63604 15.9497C5.02656 15.5592 5.65973 15.5592 6.05025 15.9497ZM15.9497 15.9497C16.3403 15.5592 16.9734 15.5592 17.364 15.9497L18.7782 17.364C19.1687 17.7545 19.1687 18.3876 18.7782 18.7782C18.3877 19.1687 17.7545 19.1687 17.364 18.7782L15.9497 17.364C15.5592 16.9734 15.5592 16.3403 15.9497 15.9497ZM11 18C11.5523 18 12 18.4477 12 19V21C12 21.5523 11.5523 22 11 22C10.4477 22 10 21.5523 10 21V19C10 18.4477 10.4477 18 11 18Z" fill="currentColor" />
            </svg>
            {/* Moon icon — shown in dark mode */}
            <svg className={s.ThemeIconDark} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7836 0.470481C10.9676 0.765118 10.9855 1.13415 10.8309 1.44525C10.2994 2.51497 10 3.7211 10 5.00001C10 9.41829 13.5817 13 18 13L18.0575 12.9998C18.4049 12.9974 18.7287 13.1754 18.9127 13.47C19.0968 13.7647 19.1147 14.1337 18.9601 14.4448C17.325 17.7352 13.9279 20 10 20C4.47715 20 0 15.5229 0 10C0 4.50107 4.43841 0.038857 9.92838 0.000268937C10.2758 -0.00217271 10.5995 0.175844 10.7836 0.470481ZM8.40989 2.15803C4.75344 2.8954 2 6.12619 2 10C2 14.4183 5.58172 18 10 18C12.587 18 14.8886 16.7721 16.3516 14.8648C11.6131 14.0789 8 9.96139 8 5.00001C8 4.01361 8.1431 3.05953 8.40989 2.15803Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
