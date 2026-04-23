import Link from 'next/link';

const footerSections = [
  {
    title: 'Plex UI',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/docs/components' },
      { label: 'For AI Editors', href: '/docs/overview/installation' },
      { label: 'Figma Kit', href: '/pricing' },
      { label: 'AI Bridge', href: '/bridge' },
      { label: 'Blog', href: '/blog' },
      { label: 'GitHub', href: 'https://github.com/plex-ui/docs', external: true },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Overview', href: '/docs/overview' },
      { label: 'Foundations', href: '/docs/foundations' },
      { label: 'Concepts', href: '/docs/concepts' },
      { label: 'Hooks', href: '/docs/hooks' },
      { label: 'Transitions', href: '/docs/transitions' },
      { label: 'Plex UI vs shadcn/ui', href: '/compare/shadcn-ui' },
      { label: 'Plex UI vs Untitled UI', href: '/compare/untitled-ui' },
      { label: 'Plex UI vs Radix UI', href: '/compare/radix-ui' },
      { label: 'Plex UI vs MUI', href: '/compare/mui' },
      { label: 'Plex UI vs Ant Design', href: '/compare/ant-design' },
    ],
  },
  {
    title: 'Components',
    links: [
      { label: 'Alert', href: '/docs/components/alert' },
      { label: 'Avatar', href: '/docs/components/avatar' },
      { label: 'Avatar Group', href: '/docs/components/avatar-group' },
      { label: 'Badge', href: '/docs/components/badge' },
      { label: 'Button', href: '/docs/components/button' },
      { label: 'Button Link', href: '/docs/components/button-link' },
      { label: 'Card', href: '/docs/components/card' },
      { label: 'Checkbox', href: '/docs/components/checkbox' },
      { label: 'Code Block', href: '/docs/components/code-block' },
      { label: 'Copy Tooltip', href: '/docs/components/copy-tooltip' },
      { label: 'Date Input', href: '/docs/components/date-input' },
      { label: 'Date Picker', href: '/docs/components/date-picker' },
      { label: 'Date Range Picker', href: '/docs/components/date-range-picker' },
      { label: 'Dialog', href: '/docs/components/dialog' },
      { label: 'Empty Message', href: '/docs/components/empty-message' },
    ],
  },
  {
    title: '\u00A0', // non-breaking space, continuation column
    links: [
      { label: 'Field', href: '/docs/components/field' },
      { label: 'File Upload', href: '/docs/components/file-upload' },
      { label: 'Floating Label Input', href: '/docs/components/floating-label-input' },
      { label: 'Indicators', href: '/docs/components/indicators' },
      { label: 'Input', href: '/docs/components/input' },
      { label: 'Label', href: '/docs/components/label' },
      { label: 'Markdown', href: '/docs/components/markdown' },
      { label: 'Markdown Editor', href: '/docs/components/markdown-editor' },
      { label: 'Menu', href: '/docs/components/menu' },
      { label: 'OTP Input', href: '/docs/components/otp-input' },
      { label: 'Popover', href: '/docs/components/popover' },
      { label: 'Progress Steps', href: '/docs/components/progress-steps' },
      { label: 'Radio Group', href: '/docs/components/radio-group' },
      { label: 'Select', href: '/docs/components/select' },
    ],
  },
  {
    title: '\u00A0',
    links: [
      { label: 'Select Control', href: '/docs/components/select-control' },
      { label: 'Separator', href: '/docs/components/separator' },
      { label: 'Shimmer Text', href: '/docs/components/shimmer-text' },
      { label: 'Sidebar', href: '/docs/components/sidebar' },
      { label: 'Skeleton', href: '/docs/components/skeleton' },
      { label: 'Slider', href: '/docs/components/slider' },
      { label: 'Stat Card', href: '/docs/components/stat-card' },
      { label: 'Switch', href: '/docs/components/switch' },
      { label: 'Table', href: '/docs/components/table' },
      { label: 'Tabs', href: '/docs/components/tabs' },
      { label: 'Tag Input', href: '/docs/components/tag-input' },
      { label: 'Text Link', href: '/docs/components/text-link' },
      { label: 'Textarea', href: '/docs/components/textarea' },
      { label: 'Toast', href: '/docs/components/toast' },
      { label: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-background px-6 pt-12 pb-8">
      <div className="mx-auto max-w-4xl">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {footerSections.map((section, i) => (
            <div key={i}>
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-fd-foreground uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map(({ label, href, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-fd-border pt-6 text-sm text-fd-muted-foreground">
          <div>
            Built by Plex UI. The source code is available on{' '}
            <a
              href="https://github.com/plex-ui/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-fd-foreground"
            >
              GitHub
            </a>
            .
          </div>
          <a
            href="mailto:plexuikit@gmail.com"
            className="transition-colors hover:text-fd-foreground"
          >
            plexuikit@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
