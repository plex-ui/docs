import Link from 'next/link';

const footerSections = [
  {
    title: 'Plex UI',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'For AI Editors', href: '/docs/installation' },
      { label: 'Figma Kit', href: '/pricing' },
      { label: 'AI Bridge', href: '/bridge' },
      { label: 'Blog', href: '/blog' },
      { label: 'GitHub', href: 'https://github.com/plex-ui/docs', external: true },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Overview', href: '/docs' },
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
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Avatar Group', href: '/components/avatar-group' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Button', href: '/components/button' },
      { label: 'Button Group', href: '/components/button-group' },
      { label: 'Button Link', href: '/components/button-link' },
      { label: 'Card', href: '/components/card' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Code Block', href: '/components/code-block' },
      { label: 'Copy Tooltip', href: '/components/copy-tooltip' },
      { label: 'Date Input', href: '/components/date-input' },
      { label: 'Date Picker', href: '/components/date-picker' },
      { label: 'Date Range Picker', href: '/components/date-range-picker' },
      { label: 'Dialog', href: '/components/dialog' },
      { label: 'Empty Message', href: '/components/empty-message' },
    ],
  },
  {
    title: '\u00A0', // non-breaking space, continuation column
    links: [
      { label: 'Field', href: '/components/field' },
      { label: 'File Upload', href: '/components/file-upload' },
      { label: 'Floating Label Input', href: '/components/floating-label-input' },
      { label: 'Indicators', href: '/components/indicators' },
      { label: 'Input', href: '/components/input' },
      { label: 'Label', href: '/components/label' },
      { label: 'Markdown', href: '/components/markdown' },
      { label: 'Markdown Editor', href: '/components/markdown-editor' },
      { label: 'Menu', href: '/components/menu' },
      { label: 'OTP Input', href: '/components/otp-input' },
      { label: 'Popover', href: '/components/popover' },
      { label: 'Progress', href: '/components/progress' },
      { label: 'Progress Steps', href: '/components/progress-steps' },
      { label: 'Radio Group', href: '/components/radio-group' },
      { label: 'Select', href: '/components/select' },
    ],
  },
  {
    title: '\u00A0',
    links: [
      { label: 'Select Control', href: '/components/select-control' },
      { label: 'Separator', href: '/components/separator' },
      { label: 'Shimmer Text', href: '/components/shimmer-text' },
      { label: 'Sidebar', href: '/components/sidebar' },
      { label: 'Skeleton', href: '/components/skeleton' },
      { label: 'Slider', href: '/components/slider' },
      { label: 'Stat Card', href: '/components/stat-card' },
      { label: 'Switch', href: '/components/switch' },
      { label: 'Table', href: '/components/table' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Tag Input', href: '/components/tag-input' },
      { label: 'Text Link', href: '/components/text-link' },
      { label: 'Textarea', href: '/components/textarea' },
      { label: 'Toast', href: '/components/toast' },
      { label: 'Tooltip', href: '/components/tooltip' },
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
