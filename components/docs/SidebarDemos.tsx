'use client';

import React, { createContext, useContext, useState } from 'react';
import { Badge } from '@plexui/ui/components/Badge';
import { Button } from '@plexui/ui/components/Button';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Switch } from '@plexui/ui/components/Switch';
import {
  Analytics,
  ApiKeys,
  Code,
  CreditCard,
  FileDocument,
  Folder,
  Globe,
  Home,
  Members,
  SettingsCog,
  Storage,
  Terminal,
} from '@plexui/ui/components/Icon';
import {
  Sidebar,
  SidebarCard,
  SidebarCardContent,
  SidebarCardFooter,
  SidebarCardTitleLink,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarLayout,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuButtonIcon,
  SidebarMenuButtonLabel,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuChevron,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMobileMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@plexui/ui/components/Sidebar';

// =============================================
// Shared data
// =============================================

const mainNavItems = [
  { icon: Home, label: 'Overview' },
  { icon: Folder, label: 'Projects', badge: 'New' },
  { icon: FileDocument, label: 'Assets' },
  { icon: Analytics, label: 'Analytics' },
];

const systemNavItems = [
  { icon: Members, label: 'Team' },
  { icon: SettingsCog, label: 'Settings' },
];

const resourcesNavItems = [
  { icon: Code, label: 'Logs' },
  { icon: Terminal, label: 'Console' },
];

// =============================================
// Base
// =============================================

export function SidebarBaseDemo() {
  const [activeItem, setActiveItem] = useState('Overview');

  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 640, height: 600 }}>
        <SidebarProvider>
          <SidebarLayout style={{ height: 600 }}>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                            {item.badge && (
                              <SidebarMenuBadge>
                                <Badge size="sm" color="info">
                                  {item.badge}
                                </Badge>
                              </SidebarMenuBadge>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {systemNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarTrigger />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  Main content area. Press <kbd className="kbd">Cmd+B</kbd> to collapse.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Collapsible icon (with open control)
// =============================================

const CollapsibleIconContext = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);

function SidebarCollapsibleIconDemoRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <CollapsibleIconContext.Provider value={{ open, setOpen }}>
      {children}
    </CollapsibleIconContext.Provider>
  );
}

function SidebarCollapsibleIconDemoPreview() {
  const ctx = useContext(CollapsibleIconContext);
  const [activeItem, setActiveItem] = useState('Overview');
  const open = ctx?.open ?? true;

  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 640, height: 600 }}>
        <SidebarProvider collapsible="icon" open={open} onOpenChange={ctx?.setOpen}>
          <SidebarLayout style={{ height: 600 }}>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {systemNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarTrigger />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  Uses <code>collapsible=&quot;icon&quot;</code>. Tooltips appear when collapsed.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

function SidebarCollapsibleIconDemoControls() {
  const ctx = useContext(CollapsibleIconContext);
  if (!ctx) return null;
  return (
    <div data-demo-controls style={controlsTableStyle}>
      <DemoControlBoolean name="open" value={ctx.open} onChange={ctx.setOpen} />
    </div>
  );
}

export function SidebarCollapsibleIconDemo() {
  return (
    <SidebarCollapsibleIconDemoRoot>
      <SidebarCollapsibleIconDemoPreview />
      <SidebarCollapsibleIconDemoControls />
    </SidebarCollapsibleIconDemoRoot>
  );
}

// =============================================
// Nested navigation
// =============================================

type NavItem = {
  id: string;
  label: string;
  icon?: React.ComponentType;
  items?: NavItem[];
};

const nestedDocsSections: NavItem[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
      { id: 'configuration', label: 'Configuration' },
      { id: 'examples', label: 'Examples' },
    ],
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    items: [
      {
        id: 'responses',
        label: 'Responses',
        items: [
          { id: 'create-response', label: 'Create' },
          {
            id: 'streaming',
            label: 'Streaming',
            items: [
              { id: 'stream-created', label: 'response.created' },
              { id: 'stream-progress', label: 'response.in_progress' },
              { id: 'stream-completed', label: 'response.completed' },
              {
                id: 'output-item',
                label: 'response.output_item',
                items: [
                  { id: 'output-added', label: 'added' },
                  { id: 'output-done', label: 'done' },
                ],
              },
            ],
          },
          { id: 'get-response', label: 'Get' },
          { id: 'list-responses', label: 'List' },
          { id: 'delete-response', label: 'Delete' },
        ],
      },
      {
        id: 'chat-completions',
        label: 'Chat Completions',
        items: [
          { id: 'chat-create', label: 'Create' },
          { id: 'chat-stream', label: 'Streaming' },
        ],
      },
      {
        id: 'embeddings',
        label: 'Embeddings',
        items: [
          { id: 'embeddings-create', label: 'Create' },
          { id: 'embeddings-list', label: 'List' },
        ],
      },
      { id: 'models', label: 'Models' },
      { id: 'files', label: 'Files' },
      { id: 'images', label: 'Images' },
      { id: 'audio', label: 'Audio' },
      { id: 'errors', label: 'Errors' },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    items: [
      { id: 'best-practices', label: 'Best Practices' },
      { id: 'rate-limits', label: 'Rate Limits' },
      { id: 'authentication', label: 'Authentication' },
      { id: 'error-handling', label: 'Error Handling' },
      { id: 'pagination', label: 'Pagination' },
    ],
  },
  {
    id: 'sdks',
    label: 'SDKs & Libraries',
    items: [
      { id: 'sdk-python', label: 'Python' },
      { id: 'sdk-node', label: 'Node.js' },
      { id: 'sdk-go', label: 'Go' },
      { id: 'sdk-java', label: 'Java' },
    ],
  },
];

const nestedIconsSections: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    items: [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
      { id: 'metrics', label: 'Metrics' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: FileDocument,
    items: [
      { id: 'pages', label: 'Pages' },
      { id: 'posts', label: 'Posts' },
      { id: 'media', label: 'Media Library' },
      { id: 'templates', label: 'Templates' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: Members,
    items: [
      { id: 'all-users', label: 'All Users' },
      { id: 'roles', label: 'Roles' },
      { id: 'permissions', label: 'Permissions' },
      { id: 'invitations', label: 'Invitations' },
    ],
  },
  {
    id: 'api',
    label: 'API',
    icon: Code,
    items: [
      { id: 'api-keys', label: 'API Keys' },
      { id: 'webhooks', label: 'Webhooks' },
      { id: 'logs', label: 'Logs' },
    ],
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    items: [
      { id: 'subscription', label: 'Subscription' },
      { id: 'invoices', label: 'Invoices' },
      { id: 'usage', label: 'Usage' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsCog,
    items: [
      { id: 'general', label: 'General' },
      { id: 'security', label: 'Security' },
      { id: 'integrations', label: 'Integrations' },
      { id: 'notifications', label: 'Notifications' },
    ],
  },
];

export function SidebarNestedDemo() {
  const [icons, setIcons] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
  const [activeItem, setActiveItem] = useState({ id: 'introduction', label: 'Introduction' });

  React.useEffect(() => {
    setExpandedSections(icons ? ['dashboard'] : ['getting-started']);
    setActiveItem(icons ? { id: 'overview', label: 'Overview' } : { id: 'introduction', label: 'Introduction' });
  }, [icons]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentSections = icons ? nestedIconsSections : nestedDocsSections;

  const renderItems = (items: NavItem[], depth: number = 0) => {
    return items.map((item) => {
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = expandedSections.includes(item.id);
      const Icon = item.icon;

      if (hasChildren) {
        return (
          <SidebarMenuItem key={item.id} expanded={isExpanded}>
            <SidebarMenuSubButton
              indent={depth as 0 | 1 | 2 | 3}
              onClick={() => toggleSection(item.id)}
            >
              {Icon != null && <Icon />}
              {item.label}
              <SidebarMenuChevron />
            </SidebarMenuSubButton>
            <SidebarMenuSub open={isExpanded}>{renderItems(item.items!, depth + 1)}</SidebarMenuSub>
          </SidebarMenuItem>
        );
      }

      return (
        <SidebarMenuSubItem key={item.id}>
          <SidebarMenuSubButton
            indent={depth as 0 | 1 | 2 | 3}
            isActive={activeItem.id === item.id}
            onClick={() => setActiveItem({ id: item.id, label: item.label })}
          >
            {Icon != null && <Icon />}
            {item.label}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    });
  };

  return (
    <>
      <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
        <div style={{ width: 640, height: 600 }}>
          <SidebarProvider collapsible="none" key={icons ? 'icons' : 'no-icons'}>
            <SidebarLayout style={{ height: 600 }}>
              <Sidebar variant={icons ? undefined : 'docs'} style={{ width: '280px' }}>
                <SidebarContent>
                  {icons ? (
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {nestedIconsSections.map((section) => {
                            const isExpanded = expandedSections.includes(section.id);
                            const Icon = section.icon;
                            return (
                              <SidebarMenuItem key={section.id} expanded={isExpanded}>
                                <SidebarMenuButton onClick={() => toggleSection(section.id)}>
                                  <SidebarMenuButtonIcon>{Icon != null && <Icon />}</SidebarMenuButtonIcon>
                                  <SidebarMenuButtonLabel>{section.label}</SidebarMenuButtonLabel>
                                  <SidebarMenuChevron />
                                </SidebarMenuButton>
                                <SidebarMenuSub open={isExpanded} hasIcons>
                                  {section.items?.map((child) => (
                                    <SidebarMenuSubItem key={child.id}>
                                      <SidebarMenuSubButton
                                        indent={1}
                                        isActive={activeItem.id === child.id}
                                        onClick={() => setActiveItem({ id: child.id, label: child.label })}
                                      >
                                        {child.label}
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ) : (
                    currentSections.map((section) => (
                      <SidebarGroup key={section.id}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                          <SidebarMenu>{section.items != null && renderItems(section.items, 0)}</SidebarMenu>
                        </SidebarGroupContent>
                      </SidebarGroup>
                    ))
                  )}
                </SidebarContent>
              </Sidebar>

              <SidebarInset>
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">{activeItem.label}</h1>
                  <p className="text-secondary">
                    Documentation page for {activeItem.label}. This is where the content would be displayed.
                  </p>
                </div>
              </SidebarInset>
            </SidebarLayout>
          </SidebarProvider>
        </div>
      </div>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="icons" value={icons} onChange={setIcons} />
      </div>
    </>
  );
}

// =============================================
// Scrollable
// =============================================

export function SidebarScrollableDemo() {
  const [activeItem, setActiveItem] = useState('Overview');

  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 640, height: 500 }}>
        <SidebarProvider>
          <SidebarLayout style={{ height: 500 }}>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {systemNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel size="sm">Resources</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {resourcesNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarTrigger />
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  When content exceeds the container height, it scrolls vertically.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Text only
// =============================================

export function SidebarTextOnlyDemo() {
  const [activeItem, setActiveItem] = useState('General');

  const categories = [
    { label: 'Settings', items: ['Your profile'] },
    { label: 'Organization', items: ['General', 'API keys', 'Admin keys'] },
    { label: 'People', items: ['People', 'Projects', 'Billing', 'Limits', 'Usage'] },
  ];

  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 640, height: 600 }}>
        <SidebarProvider collapsible="none">
          <SidebarLayout style={{ height: 600 }}>
            <Sidebar variant="docs" style={{ width: '180px' }}>
              <SidebarContent>
                {categories.map((cat) => (
                  <SidebarGroup key={cat.label}>
                    <SidebarGroupLabel size="lg">{cat.label}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {cat.items.map((item) => (
                          <SidebarMenuItem key={item}>
                            <SidebarMenuButton
                              isActive={activeItem === item}
                              onClick={() => setActiveItem(item)}
                            >
                              <SidebarMenuButtonLabel>{item}</SidebarMenuButtonLabel>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  Text-only sidebar for settings pages. Uses <code>collapsible=&quot;none&quot;</code>.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Search
// =============================================

export function SidebarSearchDemo() {
  const [activeItem, setActiveItem] = useState('Overview');
  const [searchValue, setSearchValue] = useState('');

  const docsSections = [
    { label: 'Get started', items: ['Overview', 'Quickstart', 'Models', 'Pricing', 'Libraries'] },
    { label: 'Core concepts', items: ['Text generation', 'Code generation', 'Images and vision', 'Structured output'] },
    { label: 'Agents', items: ['Overview', 'Build agents'] },
  ];

  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: 640, height: 600 }}>
        <SidebarProvider collapsible="none">
          <SidebarLayout style={{ height: 600 }}>
            <Sidebar variant="docs" style={{ width: '220px' }}>
              <SidebarHeader>
                <SidebarInput
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                />
              </SidebarHeader>
              <SidebarContent>
                {docsSections.map((section) => (
                  <SidebarGroup key={section.label}>
                    <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={`${section.label}-${item}`}>
                            <SidebarMenuSubButton
                              indent={0}
                              isActive={activeItem === item}
                              onClick={() => setActiveItem(item)}
                            >
                              {item}
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  Search input stays fixed at the top while sidebar content scrolls.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Skeleton
// =============================================

export function SidebarSkeletonDemo() {
  return (
    <div data-demo-stage className="flex justify-center items-center py-10">
      <div style={{ width: 640, height: 300 }}>
        <SidebarProvider>
          <SidebarLayout style={{ height: 300 }}>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuSkeleton labelWidth="70%" />
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuSkeleton labelWidth="55%" />
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuSkeleton labelWidth="80%" />
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuSkeleton labelWidth="45%" />
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Loading</h1>
                <p className="text-secondary">Skeleton placeholders while navigation loads.</p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Badges (with pill control)
// =============================================

export function SidebarBadgesDemo() {
  const [activeItem, setActiveItem] = useState('Overview');
  const [pill, setPill] = useState(false);

  const menuItems = [
    { label: 'Overview', icon: Home },
    { label: 'API Reference', icon: Code, badge: { text: 'New', color: 'info' as const } },
    { label: 'Playground', icon: Terminal, badge: { text: 'Beta', color: 'warning' as const } },
    { label: 'Fine-tuning', icon: SettingsCog, badge: { text: '3', color: 'info' as const } },
    { label: 'Batch API', icon: Storage, badge: { text: 'Updated', color: 'discovery' as const } },
    { label: 'Legacy Models', icon: FileDocument, badge: { text: 'Deprecated', color: 'danger' as const } },
    { label: 'Usage', icon: Analytics, badge: { text: '12', color: 'caution' as const } },
    { label: 'Billing', icon: CreditCard },
  ];

  return (
    <>
      <div data-demo-stage className="flex justify-center items-center py-10">
        <div style={{ width: 640, height: 400 }}>
          <SidebarProvider collapsible="none">
            <SidebarLayout style={{ height: 400 }}>
              <Sidebar>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {menuItems.map((item) => (
                          <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                              isActive={activeItem === item.label}
                              onClick={() => setActiveItem(item.label)}
                            >
                              <SidebarMenuButtonIcon>
                                <item.icon />
                              </SidebarMenuButtonIcon>
                              <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                              {item.badge && (
                                <SidebarMenuBadge>
                                  <Badge size="sm" color={item.badge.color} pill={pill}>
                                    {item.badge.text}
                                  </Badge>
                                </SidebarMenuBadge>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <SidebarInset>
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                  <p className="text-secondary">
                    Badges indicate status, counts, or special states for menu items.
                  </p>
                </div>
              </SidebarInset>
            </SidebarLayout>
          </SidebarProvider>
        </div>
      </div>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="pill" value={pill} onChange={setPill} />
      </div>
    </>
  );
}

// =============================================
// Footer cards
// =============================================

export function SidebarFooterCardsDemo() {
  const [activeItem, setActiveItem] = useState('Overview');

  return (
    <div data-demo-stage className="flex justify-center items-center py-10">
      <div style={{ width: 640, height: 600 }}>
        <SidebarProvider collapsible="icon">
          <SidebarLayout style={{ height: 600 }}>
            <Sidebar>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {systemNavItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            isActive={activeItem === item.label}
                            tooltip={item.label}
                            onClick={() => setActiveItem(item.label)}
                          >
                            <SidebarMenuButtonIcon>
                              <item.icon />
                            </SidebarMenuButtonIcon>
                            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter>
                <SidebarCard dismissible onDismiss={() => { }}>
                  <SidebarCardTitleLink href="#" onClick={(e) => e.preventDefault()}>
                    Upgrade to Pro
                  </SidebarCardTitleLink>
                  <SidebarCardContent>
                    Unlock higher rate limits, priority support, and advanced features.
                  </SidebarCardContent>
                  <SidebarCardFooter>
                    <Button size="sm" pill color="primary">
                      View Plans
                    </Button>
                  </SidebarCardFooter>
                </SidebarCard>
                <SidebarTrigger />
              </SidebarFooter>
            </Sidebar>

            <SidebarInset>
              <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                <p className="text-secondary">
                  Footer cards are hidden when the sidebar is collapsed.
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
    </div>
  );
}

// =============================================
// Header sizes (with controls)
// =============================================

const dashboardSections = [
  { label: 'Project', items: [{ icon: Home, label: 'Overview' }, { icon: Folder, label: 'Projects' }, { icon: Analytics, label: 'Analytics' }] },
  { label: 'System', items: [{ icon: Members, label: 'Team' }, { icon: SettingsCog, label: 'Settings' }] },
];

const docsSectionsHeaderSizes = [
  { label: 'Getting Started', items: ['Introduction', 'Installation', 'Quick Start'] },
  { label: 'Components', items: ['Button', 'Input', 'Modal', 'Sidebar'] },
];

type HeaderSizesContextValue = {
  size: 'sm' | 'lg';
  setSize: (s: 'sm' | 'lg') => void;
  activeItem: string;
  setActiveItem: (s: string) => void;
};

const HeaderSizesContext = createContext<HeaderSizesContextValue | null>(null);

export function SidebarHeaderSizesDemoRoot({ children }: { children: React.ReactNode }) {
  const [size, setSize] = useState<'sm' | 'lg'>('sm');
  const [activeItem, setActiveItem] = useState('Overview');
  const value: HeaderSizesContextValue = {
    size,
    setSize,
    activeItem,
    setActiveItem,
  };
  return (
    <HeaderSizesContext.Provider value={value}>
      {children}
    </HeaderSizesContext.Provider>
  );
}

export function SidebarHeaderSizesDemoPreview() {
  const ctx = useContext(HeaderSizesContext);
  const size = ctx?.size ?? 'sm';
  const activeItem = ctx?.activeItem ?? 'Overview';
  const setActiveItem = ctx?.setActiveItem ?? (() => { });

  return (
    <div data-demo-stage className="flex justify-center items-center py-10">
      <div style={{ width: 640 }}>
        {size === 'sm' ? (
          <SidebarProvider collapsible="none" key="sm">
            <SidebarLayout style={{ height: 400 }}>
              <Sidebar style={{ width: '200px' }}>
                <SidebarContent>
                  {dashboardSections.map((section) => (
                    <SidebarGroup key={section.label}>
                      <SidebarGroupLabel size="sm">{section.label}</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {section.items.map((item) => (
                            <SidebarMenuItem key={item.label}>
                              <SidebarMenuButton
                                isActive={activeItem === item.label}
                                onClick={() => setActiveItem(item.label)}
                              >
                                <SidebarMenuButtonIcon>
                                  <item.icon />
                                </SidebarMenuButtonIcon>
                                <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ))}
                </SidebarContent>
              </Sidebar>
              <SidebarInset>
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                  <p className="text-secondary">Compact headers with tertiary color.</p>
                </div>
              </SidebarInset>
            </SidebarLayout>
          </SidebarProvider>
        ) : (
          <SidebarProvider collapsible="none" key="lg">
            <SidebarLayout style={{ height: 400 }}>
              <Sidebar variant="docs" style={{ width: '220px' }}>
                <SidebarContent>
                  {docsSectionsHeaderSizes.map((section) => (
                    <SidebarGroup key={section.label}>
                      <SidebarGroupLabel size="lg">{section.label}</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {section.items.map((item) => (
                            <SidebarMenuItem key={item}>
                              <SidebarMenuButton isActive={activeItem === item} onClick={() => setActiveItem(item)}>
                                <SidebarMenuButtonLabel>{item}</SidebarMenuButtonLabel>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ))}
                </SidebarContent>
              </Sidebar>
              <SidebarInset>
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">{activeItem}</h1>
                  <p className="text-secondary">Prominent headers with primary color.</p>
                </div>
              </SidebarInset>
            </SidebarLayout>
          </SidebarProvider>
        )}
      </div>
    </div>
  );
}

// =============================================
// Shared controls table UI (Storybook-style)
// =============================================

const controlsTableStyle: React.CSSProperties = {
  background: 'var(--docs-surface-elevated)',

  width: '100%',
};

const controlRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '6px 16px 6px 8px',
  borderTop: '1px solid var(--color-fd-border)',
};

const controlLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono, ui-monospace, monospace)',
  fontSize: '0.8125rem',
  padding: '2px 8px',
};

function DemoControlBoolean({ name, value, onChange }: { name: string; value: boolean; onChange: (v: boolean) => void }) {
  const controlId = "demo-switch-" + name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={controlRowStyle}>
      <label htmlFor={controlId} style={controlLabelStyle}>{name}</label>
      <Switch id={controlId} checked={value} onCheckedChange={onChange} aria-label={name} />
    </div>
  );
}

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

export function SidebarHeaderSizesDemo() {
  return (
    <SidebarHeaderSizesDemoRoot>
      <SidebarHeaderSizesDemoPreview />
      <SidebarHeaderSizesDemoControls />
    </SidebarHeaderSizesDemoRoot>
  );
}

function SidebarHeaderSizesDemoControls() {
  const ctx = useContext(HeaderSizesContext);
  if (!ctx) return null;
  const { size, setSize, setActiveItem } = ctx;
  return (
    <div data-demo-controls style={controlsTableStyle}>
      <DemoControlRow name="size">
        <SegmentedControl<'sm' | 'lg'>
          value={size}
          onChange={(next) => {
            setSize(next);
            setActiveItem(next === 'sm' ? 'Overview' : 'Introduction');
          }}
          aria-label="Group label size"
          size="xs"
        >
          <SegmentedControl.Option value="sm">sm</SegmentedControl.Option>
          <SegmentedControl.Option value="lg">lg</SegmentedControl.Option>
        </SegmentedControl>
      </DemoControlRow>
    </div>
  );
}

// =============================================
// Mobile menu (with mobile / nested / icons controls)
// =============================================

function MobileMenuInner({ mobile, nested, icons }: { mobile: boolean; nested: boolean; icons: boolean }) {
  const { openMobile, setOpenMobile } = useSidebar();
  const [activeItem, setActiveItem] = useState({ id: 'overview', label: 'Overview' });
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Recursive render for nested items (matches Storybook's renderNestedItems)
  const renderNestedItems = (
    items: NavItem[],
    depth: number = 0,
    onSelect?: (item: { id: string; label: string }) => void,
  ) => {
    return items.map((item) => {
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = expandedSections.includes(item.id);

      if (hasChildren) {
        return (
          <SidebarMenuItem key={item.id} expanded={isExpanded}>
            <SidebarMenuSubButton
              indent={depth as 0 | 1 | 2 | 3}
              onClick={() => toggleSection(item.id)}
            >
              {item.label}
              <SidebarMenuChevron />
            </SidebarMenuSubButton>
            <SidebarMenuSub open={isExpanded}>
              {renderNestedItems(item.items!, depth + 1, onSelect)}
            </SidebarMenuSub>
          </SidebarMenuItem>
        );
      }

      return (
        <SidebarMenuSubItem key={item.id}>
          <SidebarMenuSubButton
            indent={depth as 0 | 1 | 2 | 3}
            isActive={activeItem.id === item.id}
            onClick={() => {
              setActiveItem({ id: item.id, label: item.label });
              onSelect?.({ id: item.id, label: item.label });
            }}
          >
            {item.label}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    });
  };

  // Desktop: simple flat nav with icons (default)
  const renderDesktopSimpleNav = () => (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );

  // Desktop: simple flat nav without icons
  const renderDesktopSimpleNavNoIcons = () => (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} tooltip={item.label} onClick={() => setActiveItem({ id: item.label.toLowerCase(), label: item.label })}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );

  // Desktop: nested docs-style (text only, deep nesting)
  const renderDesktopNestedNav = () => (
    <Sidebar variant="docs" style={{ width: '280px' }}>
      <SidebarContent>
        {nestedDocsSections.map((section) => (
          <SidebarGroup key={section.id}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{section.items && renderNestedItems(section.items, 0)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );

  // Desktop: nested with icons (2 levels)
  const renderDesktopNestedNavWithIcons = () => (
    <Sidebar style={{ width: '280px' }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nestedIconsSections.map((item) => {
                const isExpanded = expandedSections.includes(item.id);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id} expanded={isExpanded}>
                    <SidebarMenuButton onClick={() => toggleSection(item.id)}>
                      <SidebarMenuButtonIcon>{Icon && <Icon />}</SidebarMenuButtonIcon>
                      <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                      <SidebarMenuChevron />
                    </SidebarMenuButton>
                    <SidebarMenuSub open={isExpanded} hasIcons>
                      {item.items?.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuSubButton
                            indent={1}
                            isActive={activeItem.id === child.id}
                            onClick={() => setActiveItem({ id: child.id, label: child.label })}
                          >
                            {child.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  const renderDesktopSidebar = () => {
    if (!nested) return icons ? renderDesktopSimpleNav() : renderDesktopSimpleNavNoIcons();
    if (icons) return renderDesktopNestedNavWithIcons();
    return renderDesktopNestedNav();
  };

  // Mobile view
  if (mobile) {
    // Mobile: nested docs-style with close callback
    const renderMobileNestedNavWithClose = () => (
      <SidebarContent>
        {nestedDocsSections.map((section) => (
          <SidebarGroup key={section.id}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items && renderNestedItems(section.items, 0, () => setOpenMobile(false))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    );

    // Mobile: nested with icons with close callback
    const renderMobileNestedWithIconsAndClose = () => (
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {nestedIconsSections.map((item) => {
                const isExpanded = expandedSections.includes(item.id);
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id} expanded={isExpanded}>
                    <SidebarMenuButton onClick={() => toggleSection(item.id)}>
                      <SidebarMenuButtonIcon>{Icon && <Icon />}</SidebarMenuButtonIcon>
                      <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                      <SidebarMenuChevron />
                    </SidebarMenuButton>
                    <SidebarMenuSub open={isExpanded} hasIcons>
                      {item.items?.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuSubButton
                            indent={1}
                            isActive={activeItem.id === child.id}
                            onClick={() => {
                              setActiveItem({ id: child.id, label: child.label });
                              setOpenMobile(false);
                            }}
                          >
                            {child.label}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    );

    // Mobile: simple flat nav with close callback (with icons)
    const renderMobileSimpleNavWithClose = () => (
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonIcon><item.icon /></SidebarMenuButtonIcon>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    );

    // Mobile: simple flat nav without icons with close callback
    const renderMobileSimpleNavNoIconsWithClose = () => (
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel size="sm">Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={activeItem.label === item.label} onClick={() => { setActiveItem({ id: item.label.toLowerCase(), label: item.label }); setOpenMobile(false); }}>
                    <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    );

    const renderMobileContent = () => {
      if (!nested) return icons ? renderMobileSimpleNavWithClose() : renderMobileSimpleNavNoIconsWithClose();
      if (icons) return renderMobileNestedWithIconsAndClose();
      return renderMobileNestedNavWithClose();
    };

    return (
      <div
        data-mobile-menu={openMobile ? 'visible' : 'hidden'}
        style={{
          width: 375,
          height: 667,
          background: 'var(--gray-75, #f3f3f3)',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        <header className="flex items-center" style={{ justifyContent: 'flex-end', height: 54, padding: '0 8px' }}>
          <SidebarMobileMenuButton />
        </header>
        <div
          style={{
            margin: 8,
            marginTop: 0,
            background: 'var(--color-surface, #ffffff)',
            boxShadow: 'var(--sidebar-inset-shadow, 0 1px 3px rgba(0,0,0,.08))',
            borderRadius: 8,
            height: 'calc(100% - 54px - 8px)',
            overflow: 'auto',
          }}
        >
          {openMobile ? (
            <div style={{ padding: 12 }}>
              {renderMobileContent()}
              {!nested && (
                <SidebarCard dismissible onDismiss={() => { }}>
                  <SidebarCardTitleLink href="#" onClick={(e) => e.preventDefault()}>
                    Upgrade to Pro
                  </SidebarCardTitleLink>
                  <SidebarCardContent>
                    Unlock higher rate limits, priority support, and advanced features.
                  </SidebarCardContent>
                  <SidebarCardFooter>
                    <Button size="sm" pill color="primary">View Plans</Button>
                  </SidebarCardFooter>
                </SidebarCard>
              )}
            </div>
          ) : (
            <div style={{ padding: 24 }}>
              <h1 className="text-2xl font-semibold mb-4">{activeItem.label}</h1>
              <p className="text-secondary">
                Click the menu button to open the sidebar and select a different item.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{ width: nested ? 680 : 640, height: 667 }}>
      <SidebarLayout style={{ height: 667 }}>
        {renderDesktopSidebar()}
        <SidebarInset>
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">{activeItem.label}</h1>
            <p className="text-secondary">
              Toggle mobile to see the mobile sidebar.
            </p>
          </div>
        </SidebarInset>
      </SidebarLayout>
    </div>
  );
}

type MobileDemoContextValue = {
  mobile: boolean;
  setMobile: (v: boolean) => void;
  nested: boolean;
  setNested: (v: boolean) => void;
  icons: boolean;
  setIcons: (v: boolean) => void;
};

const MobileDemoContext = createContext<MobileDemoContextValue | null>(null);

export function SidebarMobileDemoRoot({ children }: { children: React.ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const [nested, setNested] = useState(false);
  const [icons, setIcons] = useState(false);
  const value: MobileDemoContextValue = { mobile, setMobile, nested, setNested, icons, setIcons };
  return (
    <MobileDemoContext.Provider value={value}>
      {children}
    </MobileDemoContext.Provider>
  );
}

export function SidebarMobileDemoPreview() {
  const ctx = useContext(MobileDemoContext);
  const mobile = ctx?.mobile ?? false;
  const nested = ctx?.nested ?? false;
  const icons = ctx?.icons ?? false;
  const key = `${mobile}-${nested}-${icons}`;
  return (
    <div data-demo-stage className="flex-1 flex flex-col items-center justify-center py-12 w-full">
      <div style={{ width: mobile ? 400 : (nested ? 680 : 640) }}>
        <SidebarProvider collapsible={mobile ? 'offcanvas' : 'icon'} key={key}>
          <MobileMenuInner mobile={mobile} nested={nested} icons={icons} />
        </SidebarProvider>
      </div>
    </div>
  );
}

function SidebarMobileDemoControls() {
  const ctx = useContext(MobileDemoContext);
  if (!ctx) return null;
  const { mobile, setMobile, nested, setNested, icons, setIcons } = ctx;
  return (
    <div data-demo-controls style={controlsTableStyle}>
      <DemoControlBoolean name="mobile" value={mobile} onChange={setMobile} />
      <DemoControlBoolean name="nested" value={nested} onChange={setNested} />
      <DemoControlBoolean name="icons" value={icons} onChange={setIcons} />
    </div>
  );
}

export function SidebarMobileDemo() {
  return (
    <SidebarMobileDemoRoot>
      <SidebarMobileDemoControls />
      <SidebarMobileDemoPreview />
    </SidebarMobileDemoRoot>
  );
}

