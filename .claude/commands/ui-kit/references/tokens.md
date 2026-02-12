# Design Token Reference

This is the reference template for generating the three-layer CSS token system.

## Layer 1: Primitive Tokens (`variables-primitive.css`)

```css
:root {
  color-scheme: light dark;

  /* ─── Gray Scale ─── */
  --gray-0: light-dark(#ffffff, #0d0d0d);
  --gray-25: light-dark(#fafafa, #141414);
  --gray-50: light-dark(#f5f5f5, #1a1a1a);
  --gray-100: light-dark(#ececec, #242424);
  --gray-200: light-dark(#e0e0e0, #2e2e2e);
  --gray-300: light-dark(#cccccc, #3d3d3d);
  --gray-400: light-dark(#adadad, #525252);
  --gray-500: light-dark(#8a8a8a, #6e6e6e);
  --gray-600: light-dark(#6e6e6e, #8a8a8a);
  --gray-700: light-dark(#525252, #adadad);
  --gray-800: light-dark(#3d3d3d, #cccccc);
  --gray-900: light-dark(#1a1a1a, #e8e8e8);
  --gray-1000: light-dark(#0d0d0d, #f5f5f5);

  /* ─── Alpha Transparency Scale ─── */
  --alpha-2: 0.02;
  --alpha-4: 0.04;
  --alpha-6: 0.06;
  --alpha-8: 0.08;
  --alpha-10: 0.10;
  --alpha-14: 0.14;
  --alpha-18: 0.18;
  --alpha-22: 0.22;
  --alpha-28: 0.28;
  --alpha-34: 0.34;
  --alpha-40: 0.40;
  --alpha-48: 0.48;
  --alpha-56: 0.56;
  --alpha-64: 0.64;
  --alpha-70: 0.70;

  /* ─── Brand: Primary ─── */
  /* Replace these hex values with the user's brand colors */
  --primary-50: light-dark(#eef2ff, #1e1b4b);
  --primary-100: light-dark(#e0e7ff, #312e81);
  --primary-200: light-dark(#c7d2fe, #3730a3);
  --primary-300: light-dark(#a5b4fc, #4338ca);
  --primary-400: light-dark(#818cf8, #4f46e5);
  --primary-500: light-dark(#6366f1, #6366f1);
  --primary-600: light-dark(#4f46e5, #818cf8);
  --primary-700: light-dark(#4338ca, #a5b4fc);
  --primary-800: light-dark(#3730a3, #c7d2fe);
  --primary-900: light-dark(#312e81, #e0e7ff);

  /* ─── Brand: Danger ─── */
  --danger-50: light-dark(#fef2f2, #450a0a);
  --danger-100: light-dark(#fee2e2, #7f1d1d);
  --danger-200: light-dark(#fecaca, #991b1b);
  --danger-300: light-dark(#fca5a5, #b91c1c);
  --danger-400: light-dark(#f87171, #dc2626);
  --danger-500: light-dark(#ef4444, #ef4444);
  --danger-600: light-dark(#dc2626, #f87171);
  --danger-700: light-dark(#b91c1c, #fca5a5);
  --danger-800: light-dark(#991b1b, #fecaca);
  --danger-900: light-dark(#7f1d1d, #fee2e2);

  /* ─── Brand: Success ─── */
  --success-50: light-dark(#f0fdf4, #052e16);
  --success-100: light-dark(#dcfce7, #14532d);
  --success-200: light-dark(#bbf7d0, #166534);
  --success-300: light-dark(#86efac, #15803d);
  --success-400: light-dark(#4ade80, #16a34a);
  --success-500: light-dark(#22c55e, #22c55e);
  --success-600: light-dark(#16a34a, #4ade80);
  --success-700: light-dark(#15803d, #86efac);
  --success-800: light-dark(#166534, #bbf7d0);
  --success-900: light-dark(#14532d, #dcfce7);

  /* ─── Brand: Warning ─── */
  --warning-50: light-dark(#fffbeb, #451a03);
  --warning-100: light-dark(#fef3c7, #78350f);
  --warning-200: light-dark(#fde68a, #92400e);
  --warning-300: light-dark(#fcd34d, #b45309);
  --warning-400: light-dark(#fbbf24, #d97706);
  --warning-500: light-dark(#f59e0b, #f59e0b);
  --warning-600: light-dark(#d97706, #fbbf24);
  --warning-700: light-dark(#b45309, #fcd34d);
  --warning-800: light-dark(#92400e, #fde68a);
  --warning-900: light-dark(#78350f, #fef3c7);

  /* ─── Spacing Scale (rem) ─── */
  --space-0: 0;
  --space-0_5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1_5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2_5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-8: 2rem;         /* 32px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-14: 3.5rem;      /* 56px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */

  /* ─── Border Radius Scale ─── */
  --radius-2xs: 2px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-full: 9999px;

  /* ─── Typography Scale ─── */
  --text-3xs: 0.625rem;    /* 10px */
  --text-2xs: 0.6875rem;   /* 11px */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.8125rem;    /* 13px */
  --text-md: 0.875rem;     /* 14px */
  --text-lg: 1rem;         /* 16px */
  --heading-xs: 1.125rem;  /* 18px */
  --heading-sm: 1.25rem;   /* 20px */
  --heading-md: 1.5rem;    /* 24px */
  --heading-lg: 1.875rem;  /* 30px */
  --heading-xl: 2.25rem;   /* 36px */
  --heading-2xl: 3rem;     /* 48px */
  --heading-3xl: 3.75rem;  /* 60px */
  --heading-4xl: 4.5rem;   /* 72px */

  /* ─── Motion ─── */
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-move: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 100ms;
  --duration-base: 150ms;
  --duration-slow: 250ms;
  --duration-slower: 400ms;
}
```

## Layer 2: Semantic Tokens (`variables-semantic.css`)

```css
:root {
  /* ─── Surface Colors ─── */
  --color-surface-background: var(--gray-0);
  --color-surface-primary: var(--gray-0);
  --color-surface-elevated: var(--gray-0);
  --color-surface-sunken: var(--gray-50);
  --color-surface-overlay: light-dark(rgba(0,0,0,0.5), rgba(0,0,0,0.7));

  /* ─── Text Colors ─── */
  --color-text-primary: var(--gray-1000);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-500);
  --color-text-disabled: var(--gray-400);
  --color-text-inverse: var(--gray-0);
  --color-text-link: var(--primary-500);
  --color-text-link-hover: var(--primary-600);

  /* ─── Border Colors ─── */
  --color-border-default: var(--gray-200);
  --color-border-strong: var(--gray-300);
  --color-border-subtle: var(--gray-100);
  --color-border-focus: var(--primary-500);
  --color-border-error: var(--danger-500);

  /* ─── Semantic Color Variants ─── */
  /* Pattern: --color-background-{semantic}-{variant}[-state] */

  /* Primary */
  --color-background-primary-solid: var(--primary-500);
  --color-background-primary-solid-hover: var(--primary-600);
  --color-background-primary-solid-active: var(--primary-700);
  --color-background-primary-soft: var(--primary-50);
  --color-background-primary-soft-hover: var(--primary-100);
  --color-background-primary-soft-active: var(--primary-200);
  --color-background-primary-ghost: transparent;
  --color-background-primary-ghost-hover: var(--primary-50);
  --color-background-primary-ghost-active: var(--primary-100);
  --color-text-primary-solid: var(--gray-0);
  --color-text-primary-soft: var(--primary-700);
  --color-text-primary-ghost: var(--primary-600);
  --color-border-primary-outline: var(--primary-300);
  --color-border-primary-outline-hover: var(--primary-400);

  /* Danger */
  --color-background-danger-solid: var(--danger-500);
  --color-background-danger-solid-hover: var(--danger-600);
  --color-background-danger-solid-active: var(--danger-700);
  --color-background-danger-soft: var(--danger-50);
  --color-background-danger-soft-hover: var(--danger-100);
  --color-background-danger-soft-active: var(--danger-200);
  --color-background-danger-ghost: transparent;
  --color-background-danger-ghost-hover: var(--danger-50);
  --color-background-danger-ghost-active: var(--danger-100);
  --color-text-danger-solid: var(--gray-0);
  --color-text-danger-soft: var(--danger-700);
  --color-text-danger-ghost: var(--danger-600);
  --color-border-danger-outline: var(--danger-300);
  --color-border-danger-outline-hover: var(--danger-400);

  /* Success */
  --color-background-success-solid: var(--success-500);
  --color-background-success-solid-hover: var(--success-600);
  --color-background-success-solid-active: var(--success-700);
  --color-background-success-soft: var(--success-50);
  --color-background-success-soft-hover: var(--success-100);
  --color-text-success-solid: var(--gray-0);
  --color-text-success-soft: var(--success-700);
  --color-border-success-outline: var(--success-300);

  /* Warning */
  --color-background-warning-solid: var(--warning-500);
  --color-background-warning-solid-hover: var(--warning-600);
  --color-background-warning-soft: var(--warning-50);
  --color-background-warning-soft-hover: var(--warning-100);
  --color-text-warning-solid: var(--gray-0);
  --color-text-warning-soft: var(--warning-700);
  --color-border-warning-outline: var(--warning-300);

  /* Secondary (neutral) */
  --color-background-secondary-solid: var(--gray-900);
  --color-background-secondary-solid-hover: var(--gray-800);
  --color-background-secondary-soft: var(--gray-100);
  --color-background-secondary-soft-hover: var(--gray-200);
  --color-background-secondary-ghost: transparent;
  --color-background-secondary-ghost-hover: var(--gray-100);
  --color-text-secondary-solid: var(--gray-0);
  --color-text-secondary-soft: var(--gray-800);
  --color-border-secondary-outline: var(--gray-300);

  /* ─── Focus Ring ─── */
  --focus-ring: 0 0 0 2px var(--color-surface-background), 0 0 0 4px var(--color-border-focus);

  /* ─── Elevation / Shadow ─── */
  --elevation-100: light-dark(
    0 1px 2px rgba(0,0,0,0.05),
    0 1px 2px rgba(0,0,0,0.3)
  );
  --elevation-200: light-dark(
    0 2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04),
    0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)
  );
  --elevation-300: light-dark(
    0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04),
    0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.2)
  );
  --elevation-400: light-dark(
    0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.04),
    0 12px 24px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.2)
  );
}
```

## Layer 3: Component Tokens (`variables-components.css`)

```css
:root {
  /* ─── Control Size Scale (9 steps) ─── */
  --size-control-3xs: 22px;
  --size-control-2xs: 24px;
  --size-control-xs: 26px;
  --size-control-sm: 28px;
  --size-control-md: 32px;
  --size-control-lg: 36px;
  --size-control-xl: 40px;
  --size-control-2xl: 44px;
  --size-control-3xl: 48px;

  /* ─── Per-Size Defaults ─── */
  /* These are set via data-size attribute on each component */

  /* 3xs */
  --control-3xs-padding-x: var(--space-1_5);
  --control-3xs-font-size: var(--text-3xs);
  --control-3xs-icon-size: 12px;
  --control-3xs-border-radius: var(--radius-xs);
  --control-3xs-gap: var(--space-0_5);

  /* 2xs */
  --control-2xs-padding-x: var(--space-2);
  --control-2xs-font-size: var(--text-2xs);
  --control-2xs-icon-size: 14px;
  --control-2xs-border-radius: var(--radius-xs);
  --control-2xs-gap: var(--space-1);

  /* xs */
  --control-xs-padding-x: var(--space-2);
  --control-xs-font-size: var(--text-xs);
  --control-xs-icon-size: 14px;
  --control-xs-border-radius: var(--radius-sm);
  --control-xs-gap: var(--space-1);

  /* sm */
  --control-sm-padding-x: var(--space-2_5);
  --control-sm-font-size: var(--text-sm);
  --control-sm-icon-size: 16px;
  --control-sm-border-radius: var(--radius-sm);
  --control-sm-gap: var(--space-1);

  /* md (default) */
  --control-md-padding-x: var(--space-3);
  --control-md-font-size: var(--text-md);
  --control-md-icon-size: 16px;
  --control-md-border-radius: var(--radius-md);
  --control-md-gap: var(--space-1_5);

  /* lg */
  --control-lg-padding-x: var(--space-4);
  --control-lg-font-size: var(--text-md);
  --control-lg-icon-size: 18px;
  --control-lg-border-radius: var(--radius-md);
  --control-lg-gap: var(--space-2);

  /* xl */
  --control-xl-padding-x: var(--space-4);
  --control-xl-font-size: var(--text-lg);
  --control-xl-icon-size: 20px;
  --control-xl-border-radius: var(--radius-lg);
  --control-xl-gap: var(--space-2);

  /* 2xl */
  --control-2xl-padding-x: var(--space-5);
  --control-2xl-font-size: var(--text-lg);
  --control-2xl-icon-size: 22px;
  --control-2xl-border-radius: var(--radius-lg);
  --control-2xl-gap: var(--space-2_5);

  /* 3xl */
  --control-3xl-padding-x: var(--space-6);
  --control-3xl-font-size: var(--text-lg);
  --control-3xl-icon-size: 24px;
  --control-3xl-border-radius: var(--radius-xl);
  --control-3xl-gap: var(--space-3);
}
```

## Token naming conventions

- **Primitive**: `--{scale}-{step}` (e.g., `--gray-500`, `--primary-300`)
- **Semantic**: `--color-{category}-{semantic}-{variant}[-state]` (e.g., `--color-background-primary-solid-hover`)
- **Component**: `--{scope}-{property}` (e.g., `--control-md-padding-x`, `--size-control-lg`)
- **Spacing**: `--space-{multiplier}` (e.g., `--space-4` = 1rem = 16px)
- **Radius**: `--radius-{size}` (e.g., `--radius-md`)
- **Typography**: `--text-{size}` or `--heading-{size}`
- **Motion**: `--ease-{type}`, `--duration-{speed}`
