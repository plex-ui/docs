'use client';

import { useEffect, useState } from 'react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);

export function SidebarSearch() {
  const [mounted, setMounted] = useState(false);
  const { setOpenSearch } = useSearchContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      className="sidebar-search-trigger"
      onClick={() => setOpenSearch(true)}
      aria-label="Search documentation"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Search</span>
      {mounted && (
        <span className="sidebar-search-keys">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </span>
      )}
    </button>
  );
}
