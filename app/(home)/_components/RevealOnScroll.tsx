'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function RevealOnScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0 }
    );

    /* Mark elements already in viewport immediately */
    sections.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.setAttribute('data-visible', 'true');
      }
    });

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
