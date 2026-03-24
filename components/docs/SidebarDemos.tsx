'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@plexui/ui/components/Badge';
import { Button } from '@plexui/ui/components/Button';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Switch } from '@plexui/ui/components/Switch';
import {
   Analytics,
   Bolt,
   CameraPhoto,
   ChevronDownMd,
   Code,
   CreditCard,
   Desktop,
   DotsHorizontal,
   FileDocument,
   Filter,
   FilterBadge,
   Folder,
   GripVertical,
   Home,
   Members,
   Plus,
   SettingsCog,
   Storage,
   Terminal,
 } from '@plexui/ui/components/Icon';
import { Menu } from '@plexui/ui/components/Menu';
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full">
        <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full" collapsible="icon" open={open} onOpenChange={ctx?.setOpen}>
        <SidebarLayout className="h-full">
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
       <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
         <SidebarProvider className="h-full" collapsible="none" key={icons ? 'icons' : 'no-icons'}>
          <SidebarLayout className="h-full">
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
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlBoolean name="icons" value={icons} onChange={setIcons} />
      </div>
    </>
  );
}

// =============================================
// Filtered tree navigation
// =============================================

type StepType = 'screen' | 'action' | 'document' | 'selfie';

type WorkflowStep = {
  id: string;
  label: string;
  type: StepType;
  children?: WorkflowStep[];
};

const stepTypeConfig: Record<StepType, { icon: React.ComponentType; label: string }> = {
  screen: { icon: Desktop, label: 'Screen' },
  action: { icon: Bolt, label: 'Action' },
  document: { icon: FileDocument, label: 'Document' },
  selfie: { icon: CameraPhoto, label: 'Selfie' },
};

const stepFilterOptions = (Object.keys(stepTypeConfig) as StepType[]).map((type) => ({
  value: type,
  label: stepTypeConfig[type].label,
}));



const workflowSteps: WorkflowStep[] = [
  { id: 'start', label: 'Start', type: 'screen' },
  { id: 'country-select', label: 'Country select', type: 'screen' },
  {
    id: 'gov-id',
    label: 'ID verification',
    type: 'document',
    children: [
      { id: 'run-gov-id', label: 'Run ID verification', type: 'action' },
      { id: 'update-gov-fields', label: 'Update inquiry fields', type: 'action' },
    ],
  },
  {
    id: 'selfie-check',
    label: 'Selfie verification',
    type: 'selfie',
    children: [
      { id: 'capture-selfie', label: 'Capture selfie', type: 'action' },
      { id: 'run-selfie', label: 'Run selfie check', type: 'action' },
    ],
  },
  {
    id: 'doc-check',
    label: 'Document check',
    type: 'document',
    children: [
      { id: 'run-doc', label: 'Run document check', type: 'action' },
      { id: 'update-doc-fields', label: 'Update inquiry fields', type: 'action' },
    ],
  },
  { id: 'success', label: 'Success', type: 'screen' },
  {
    id: 'fail',
    label: 'Fail',
    type: 'screen',
    children: [
      { id: 'retry-doc', label: 'Retry document', type: 'action' },
      { id: 'retry-selfie', label: 'Retry selfie', type: 'action' },
    ],
  },
  { id: 'doc-retry', label: 'Document retry', type: 'screen' },
  { id: 'selfie-retry', label: 'Selfie retry', type: 'screen' },
];

function filterWorkflowTree(
  items: WorkflowStep[],
  search: string,
): WorkflowStep[] {
  if (!search) return items;

  return items.reduce<WorkflowStep[]>((acc, item) => {
    const matchesSearch = item.label.toLowerCase().includes(search.toLowerCase());
    const filteredChildren = item.children
      ? filterWorkflowTree(item.children, search)
      : undefined;
    const hasMatchingChildren = filteredChildren && filteredChildren.length > 0;

    if (matchesSearch || hasMatchingChildren) {
      acc.push(hasMatchingChildren ? { ...item, children: filteredChildren } : item);
    }

    return acc;
  }, []);
}

function flattenByType(
  items: WorkflowStep[],
  typeFilters: Set<StepType>,
  search: string,
): WorkflowStep[] {
  const result: WorkflowStep[] = [];

  function collect(list: WorkflowStep[]) {
    for (const item of list) {
      const matchesType = typeFilters.has(item.type);
      const matchesSearch = !search || item.label.toLowerCase().includes(search.toLowerCase());
      if (matchesType && matchesSearch) result.push(item);
      if (item.children) collect(item.children);
    }
  }

  collect(items);
  return result;
}

export function SidebarFilteredTreeDemo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['gov-id', 'selfie-check', 'doc-check', 'fail']),
  );
  const [activeItem, setActiveItem] = useState('start');
  const [iconSize, setIconSize] = useState<'sm' | 'md'>('sm');
  const [expandMode, setExpandMode] = useState<'row' | 'chevron'>('chevron');

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isFiltering = typeFilters.length > 0;
  const typeFilterSet = new Set(typeFilters as StepType[]);

  const displaySteps = isFiltering
    ? flattenByType(workflowSteps, typeFilterSet, searchQuery)
    : filterWorkflowTree(workflowSteps, searchQuery);

  const iconPx = iconSize === 'sm' ? 16 : 20;
  const iconSizeVar = { '--sidebar-icon-size': `${iconPx}px` } as React.CSSProperties;
  const nestedIconStyle: React.CSSProperties = { width: iconPx, height: iconPx, flexShrink: 0 };

  const renderTreeItems = (items: WorkflowStep[], depth: number = 0): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const TypeIcon = stepTypeConfig[item.type].icon;

      if (depth === 0) {
        if (hasChildren) {
          const chevronOnly = expandMode === 'chevron';
          return (
            <SidebarMenuItem key={item.id} expanded={isExpanded}>
              <SidebarMenuButton
                isActive={activeItem === item.id}
                onClick={() => {
                  if (chevronOnly) setActiveItem(item.id);
                  else toggleExpanded(item.id);
                }}
              >
                <SidebarMenuButtonIcon style={iconSizeVar}><TypeIcon /></SidebarMenuButtonIcon>
                <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
                {chevronOnly ? (
                  <span
                    role="none"
                    className={`${ghostBtnCls} ml-auto transition-transform`}
                    style={{ width: 26, height: 26, marginRight: -9, transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    onClick={(e) => { e.stopPropagation(); toggleExpanded(item.id); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); toggleExpanded(item.id); } }}
                  >
                    <ChevronDownMd />
                  </span>
                ) : (
                  <SidebarMenuChevron />
                )}
              </SidebarMenuButton>
              <SidebarMenuSub open={isExpanded} hasIcons>
                {renderTreeItems(item.children!, depth + 1)}
              </SidebarMenuSub>
            </SidebarMenuItem>
          );
        }

        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            >
              <SidebarMenuButtonIcon style={iconSizeVar}><TypeIcon /></SidebarMenuButtonIcon>
              <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }

      if (hasChildren) {
        const chevronOnly = expandMode === 'chevron';
        return (
          <SidebarMenuItem key={item.id} expanded={isExpanded}>
            <SidebarMenuSubButton
              className="gap-2"
              indent={Math.min(depth, 3) as 0 | 1 | 2 | 3}
              isActive={chevronOnly ? activeItem === item.id : undefined}
              onClick={() => {
                if (chevronOnly) setActiveItem(item.id);
                else toggleExpanded(item.id);
              }}
            >
               <span style={nestedIconStyle} className="inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"><TypeIcon /></span>
               {item.label}
               {chevronOnly ? (
                 <span
                   role="none"
                   className={`${ghostBtnCls} ml-auto transition-transform`}
                   style={{ width: 26, height: 26, marginRight: -9, transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                   onClick={(e) => { e.stopPropagation(); toggleExpanded(item.id); }}
                   onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); toggleExpanded(item.id); } }}
                 >
                   <ChevronDownMd />
                 </span>
               ) : (
                 <SidebarMenuChevron />
               )}
            </SidebarMenuSubButton>
            <SidebarMenuSub open={isExpanded}>
              {renderTreeItems(item.children!, depth + 1)}
            </SidebarMenuSub>
          </SidebarMenuItem>
        );
      }

      return (
        <SidebarMenuSubItem key={item.id}>
          <SidebarMenuSubButton
            className="gap-2"
            indent={Math.min(depth, 3) as 0 | 1 | 2 | 3}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          >
            <span style={nestedIconStyle} className="inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"><TypeIcon /></span>
            {item.label}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    });
  };

  const renderFlatItems = (items: WorkflowStep[]): React.ReactNode => {
    return items.map((item) => {
      const TypeIcon = stepTypeConfig[item.type].icon;
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          >
            <SidebarMenuButtonIcon style={iconSizeVar}><TypeIcon /></SidebarMenuButtonIcon>
            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  const findLabel = (items: WorkflowStep[]): string => {
    for (const item of items) {
      if (item.id === activeItem) return item.label;
      if (item.children) {
        const found = findLabel(item.children);
        if (found) return found;
      }
    }
    return '';
  };
  const activeItemLabel = findLabel(workflowSteps) || 'Start';

   return (
     <>
       <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
         <SidebarProvider className="h-full" collapsible="none">
           <SidebarLayout className="h-full">
               <Sidebar style={{ width: '280px' }}>
                 <SidebarHeader>
                   <div className="flex items-center gap-2 w-full [&>div:first-child>div]:!p-0" style={{ padding: '16px 0 8px' }}>
                    <div className="flex-1">
                      <SidebarInput
                        size="md"
                        pill={false}
                        variant="soft"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClear={() => setSearchQuery('')}
                      />
                    </div>
                    <Menu>
                      <Menu.Trigger>
                        <Button
                          variant="soft"
                          size="md"
                          color="secondary"
                          pill={false}
                          aria-label="Filter by type"
                          uniform
                        >
                          {isFiltering ? <FilterBadge /> : <Filter />}
                        </Button>
                      </Menu.Trigger>
                      <Menu.Content minWidth="auto" align="end">
                        {stepFilterOptions.map((opt) => (
                          <Menu.CheckboxItem
                            key={opt.value}
                            checked={typeFilters.includes(opt.value)}
                            indicatorPosition="end"
                            indicatorVariant="ghost"
                            onCheckedChange={(checked) =>
                              setTypeFilters((prev) =>
                                checked
                                  ? [...prev, opt.value]
                                  : prev.filter((v) => v !== opt.value),
                              )
                            }
                            onSelect={(evt) => evt.preventDefault()}
                          >
                            {opt.label}
                          </Menu.CheckboxItem>
                        ))}
                      </Menu.Content>
                    </Menu>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {isFiltering ? renderFlatItems(displaySteps) : renderTreeItems(displaySteps)}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>

              <SidebarInset>
                <div className="p-6">
                  <h1 className="text-2xl font-semibold mb-4">{activeItemLabel}</h1>
                  <p className="text-secondary">
                    {isFiltering
                      ? 'Filtered results shown as a flat list.'
                      : 'Use the search and filter controls to narrow the navigation tree.'}
                  </p>
                </div>
               </SidebarInset>
            </SidebarLayout>
          </SidebarProvider>
      </div>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="iconSize">
          <SegmentedControl<'sm' | 'md'>
            value={iconSize}
            onChange={setIconSize}
            aria-label="Icon size"
            size="xs"
          >
            <SegmentedControl.Option value="sm">sm</SegmentedControl.Option>
            <SegmentedControl.Option value="md">md</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
        <DemoControlRow name="expand">
          <SegmentedControl<'row' | 'chevron'>
            value={expandMode}
            onChange={setExpandMode}
            aria-label="Expand trigger"
            size="xs"
          >
            <SegmentedControl.Option value="row">row</SegmentedControl.Option>
            <SegmentedControl.Option value="chevron">chevron</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
      </div>
    </>
  );
}

// =============================================
// Action tree navigation
// =============================================

const ghostBtnCls = 'inline-flex items-center justify-center shrink-0 rounded-sm cursor-pointer hover:bg-[var(--color-background-secondary-ghost-hover)] active:bg-[var(--color-background-secondary-ghost-hover)] active:scale-95 transition-all [&>svg]:w-4 [&>svg]:h-4 relative z-[1] pointer-events-auto';

export function SidebarActionTreeDemo() {
  const [steps, setSteps] = useState(workflowSteps);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(['gov-id', 'selfie-check', 'doc-check', 'fail']),
  );
  const [activeItem, setActiveItem] = useState('gov-id');
  const [iconSize, setIconSize] = useState<'sm' | 'md'>('sm');

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isFiltering = typeFilters.length > 0;
  const typeFilterSet = new Set(typeFilters as StepType[]);

  const displaySteps = isFiltering
    ? flattenByType(steps, typeFilterSet, searchQuery)
    : filterWorkflowTree(steps, searchQuery);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const iconPx = iconSize === 'sm' ? 16 : 20;
  const iconSizeVar = { '--sidebar-icon-size': `${iconPx}px` } as React.CSSProperties;
  const nestedIconStyle: React.CSSProperties = { width: iconPx, height: iconPx, flexShrink: 0 };

  const parentActionsCls = 'ml-auto flex items-center gap-0.5 opacity-0 group-hover/parent:opacity-100 transition-opacity relative z-[1]';
  const childActionsCls = 'hidden group-hover/action:flex items-center gap-0.5 shrink-0 relative z-[1] ml-auto';
  const btnSize = 26;

  const renderActions = () => (
    <span className={parentActionsCls} style={{ height: 0, marginRight: -9 }}>
      <span className={ghostBtnCls} style={{ width: btnSize, height: btnSize }} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="none">
        <DotsHorizontal />
      </span>
      <span className={ghostBtnCls} style={{ width: btnSize, height: btnSize }} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="none">
        <Plus />
      </span>
    </span>
  );

  const SortableNestedItem = ({ item }: { item: WorkflowStep }) => {
    const TypeIcon = stepTypeConfig[item.type].icon;
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
    const sortableStyle: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <SidebarMenuSubItem ref={setNodeRef} style={sortableStyle} className="group/action">
        <SidebarMenuSubButton
          asChild
          indent={0}
          isActive={activeItem === item.id}
        >
          <div
            role="button"
            tabIndex={0}
            className="[&:has(.item-actions:hover)::before]:!opacity-[0.3] [&:has(.item-actions:hover):active::before]:!scale-100"
            style={{ padding: '6px 12px 6px 60px', cursor: 'pointer' }}
            onClick={() => setActiveItem(item.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveItem(item.id); }}
          >
            <span style={{ ...nestedIconStyle, marginRight: 8 }} className="inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full relative z-[1]"><TypeIcon /></span>
            <span className="min-w-0 truncate relative z-[1]">{item.label}</span>
            <span className={childActionsCls} style={{ height: 0, marginRight: -9 }}>
              <span className={ghostBtnCls} style={{ width: btnSize, height: btnSize }} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="none">
                <DotsHorizontal />
              </span>
              <span
                className={ghostBtnCls}
                style={{ width: btnSize, height: btnSize, cursor: isDragging ? 'grabbing' : 'grab' }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                {...listeners}
                {...attributes}
                role="none"
              >
                <GripVertical />
              </span>
            </span>
          </div>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSteps((prev) => {
      return prev.map((parent) => {
        if (!parent.children) return parent;
        const oldIdx = parent.children.findIndex((child) => child.id === active.id);
        const newIdx = parent.children.findIndex((child) => child.id === over.id);
        if (oldIdx === -1 || newIdx === -1) return parent;
        return { ...parent, children: arrayMove(parent.children, oldIdx, newIdx) };
      });
    });
  };

  const renderTreeItems = (items: WorkflowStep[], depth: number = 0): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems.has(item.id);
      const TypeIcon = stepTypeConfig[item.type].icon;

      if (depth === 0) {
        return (
          <SidebarMenuItem key={item.id} expanded={isExpanded} className="group/parent">
            <SidebarMenuButton
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            >
              {hasChildren ? (
                <span
                  role="none"
                  className={`${ghostBtnCls} transition-transform`}
                  style={{ width: btnSize, height: btnSize, marginLeft: 3, marginRight: -3, transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                  onClick={(e) => { e.stopPropagation(); toggleExpanded(item.id); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); toggleExpanded(item.id); } }}
                >
                  <ChevronDownMd />
                </span>
              ) : (
                <span style={{ width: 23, flexShrink: 0, marginLeft: 3 }} />
              )}
              <SidebarMenuButtonIcon style={{ marginLeft: 0, ...iconSizeVar }}><TypeIcon /></SidebarMenuButtonIcon>
              <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
              {hasChildren && renderActions()}
            </SidebarMenuButton>
            {hasChildren && (
              <SidebarMenuSub open={isExpanded} hasIcons>
                <SortableContext items={item.children!.map((child) => child.id)} strategy={verticalListSortingStrategy}>
                  {renderTreeItems(item.children!, depth + 1)}
                </SortableContext>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        );
      }

      return <SortableNestedItem key={item.id} item={item} />;
    });
  };

  const renderFlatItems = (items: WorkflowStep[]): React.ReactNode => {
    return items.map((item) => {
      const TypeIcon = stepTypeConfig[item.type].icon;
      return (
        <SidebarMenuItem key={item.id} className="group/action">
          <SidebarMenuButton
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
          >
            <span style={{ width: 23, flexShrink: 0, marginLeft: 3 }} />
            <SidebarMenuButtonIcon style={{ marginLeft: 0, ...iconSizeVar }}><TypeIcon /></SidebarMenuButtonIcon>
            <SidebarMenuButtonLabel>{item.label}</SidebarMenuButtonLabel>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });
  };

  return (
    <>
      <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
        <SidebarProvider className="h-full" collapsible="none">
          <SidebarLayout className="h-full">
            <Sidebar style={{ width: '280px' }}>
              <SidebarHeader>
                <div className="flex items-center gap-2 w-full [&>div:first-child>div]:!p-0" style={{ padding: '16px 0 8px' }}>
                  <div className="flex-1">
                    <SidebarInput
                      size="md"
                      pill={false}
                      variant="soft"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClear={() => setSearchQuery('')}
                    />
                  </div>
                  <Menu>
                    <Menu.Trigger>
                      <Button variant="soft" size="md" color="secondary" pill={false} aria-label="Filter by type" uniform>
                        {isFiltering ? <FilterBadge /> : <Filter />}
                      </Button>
                    </Menu.Trigger>
                    <Menu.Content minWidth="auto" align="end">
                      {stepFilterOptions.map((opt) => (
                        <Menu.CheckboxItem
                          key={opt.value}
                          checked={typeFilters.includes(opt.value)}
                          indicatorPosition="end"
                          indicatorVariant="ghost"
                          onCheckedChange={(checked) =>
                            setTypeFilters((prev) =>
                              checked ? [...prev, opt.value] : prev.filter((v) => v !== opt.value),
                            )
                          }
                          onSelect={(evt) => evt.preventDefault()}
                        >
                          {opt.label}
                        </Menu.CheckboxItem>
                      ))}
                    </Menu.Content>
                  </Menu>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SidebarMenu>
                        {isFiltering ? renderFlatItems(displaySteps) : renderTreeItems(displaySteps)}
                      </SidebarMenu>
                    </DndContext>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset>
              <div className="p-6">
                <p className="text-secondary">
                  {isFiltering
                    ? 'Filtered results shown as a flat list.'
                    : 'Chevrons on the left expand/collapse. Action buttons appear on hover.'}
                </p>
              </div>
            </SidebarInset>
          </SidebarLayout>
        </SidebarProvider>
      </div>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="iconSize">
          <SegmentedControl<'sm' | 'md'>
            value={iconSize}
            onChange={setIconSize}
            aria-label="Icon size"
            size="xs"
          >
            <SegmentedControl.Option value="sm">sm</SegmentedControl.Option>
            <SegmentedControl.Option value="md">md</SegmentedControl.Option>
          </SegmentedControl>
        </DemoControlRow>
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full">
        <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full" collapsible="none">
        <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full" collapsible="none">
        <SidebarLayout className="h-full">
            <Sidebar variant="docs" style={{ width: '220px' }}>
              <SidebarHeader>
                <div style={{ padding: '16px 0 8px' }}>
                  <SidebarInput
                    variant="soft"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onClear={() => setSearchValue('')}
                  />
                </div>
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
   );
 }

 // =============================================
 // Skeleton
 // =============================================

export function SidebarSkeletonDemo() {
   return (
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full">
        <SidebarLayout className="h-full">
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
       <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
         <SidebarProvider className="h-full" collapsible="none">
           <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full" collapsible="icon">
        <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
      {size === 'sm' ? (
        <SidebarProvider className="h-full" collapsible="none" key="sm">
          <SidebarLayout className="h-full">
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
          <SidebarProvider className="h-full" collapsible="none" key="lg">
            <SidebarLayout className="h-full">
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
    <SidebarLayout className="h-full">
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
     <div data-demo-stage className="flex-1 w-full !p-0 !items-stretch !justify-stretch [&>*]:!m-0">
       <SidebarProvider className="h-full" collapsible={mobile ? 'offcanvas' : 'icon'} key={key}>
        <MobileMenuInner mobile={mobile} nested={nested} icons={icons} />
      </SidebarProvider>
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
