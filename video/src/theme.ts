const sharedFonts = {
  mono: `'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace`,
  sans: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
};

export const theme = {
  bg: '#0b0b0f',
  bgSoft: '#13131a',
  surface: '#1a1a24',
  surfaceHover: '#21212e',
  border: '#2a2a38',
  fg: '#ffffff',
  fgMuted: '#8a8aa5',
  fgSubtle: '#5a5a75',
  accent: '#0169cc',
  accentSoft: 'rgba(1, 105, 204, 0.18)',
  green: '#4ade80',
  red: '#f87171',
  yellow: '#fbbf24',
  blue: '#60a5fa',
  ...sharedFonts,
};

export const lightTheme = {
  ...theme,
  bg: '#ffffff',
  bgSoft: '#f4f4f5',
  surface: '#fafafa',
  surfaceHover: '#f0f0f0',
  border: '#e4e4e7',
  fg: '#0b0b0f',
  fgMuted: '#71717a',
  fgSubtle: '#a1a1aa',
};

export type Theme = typeof theme;
