'use client';

import React, { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { Textarea } from '@plexui/ui/components/Textarea';
import { Select } from '@plexui/ui/components/Select';
import { Badge } from '@plexui/ui/components/Badge';
import { Avatar } from '@plexui/ui/components/Avatar';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Tooltip } from '@plexui/ui/components/Tooltip';
import { ShimmerText } from '@plexui/ui/components/ShimmerText';
import {
  Search,
  ArrowUp,
  ArrowRight,
  PlusLg,
  Delete,
  Filter,
  SettingsCog,
  Home,
  Members,
  BarChart,
  Bell,
  BellFilled,
  Calendar,
  ChevronDown,
  CheckCircleFilled,
  Clock,
  DotsHorizontal,
  Sparkles,
  Bolt,
  ShieldCheck,
  Globe,
  StarFilled,
  FileUpload,
  Mail,
} from '@plexui/ui/components/Icon';

// ─── Dashboard Template ───

const stats = [
  { label: 'Total users', value: '12,847', change: '+12.5%', positive: true },
  { label: 'Active now', value: '1,284', change: '+3.2%', positive: true },
  { label: 'Revenue', value: '$48.2k', change: '+8.1%', positive: true },
  { label: 'Bounce rate', value: '24.3%', change: '-2.4%', positive: false },
];

const recentActivity = [
  { user: 'Sarah C.', action: 'signed up', time: '2m ago', color: 'success' as const },
  { user: 'Marcus J.', action: 'upgraded to Pro', time: '15m ago', color: 'primary' as const },
  { user: 'Aisha P.', action: 'filed a ticket', time: '1h ago', color: 'warning' as const },
  { user: 'Tom R.', action: 'cancelled plan', time: '3h ago', color: 'danger' as const },
];

const tableRows = [
  { name: 'Sarah Chen', email: 'sarah@example.com', plan: 'Pro', status: 'Active', mrr: '$49' },
  { name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'Enterprise', status: 'Active', mrr: '$199' },
  { name: 'Aisha Patel', email: 'aisha@example.com', plan: 'Free', status: 'Active', mrr: '$0' },
  { name: 'Tom Rivera', email: 'tom@example.com', plan: 'Pro', status: 'Churned', mrr: '$49' },
];

const statusColor: Record<string, string> = {
  Active: 'success',
  Churned: 'danger',
  Trial: 'warning',
};

export function DashboardTemplate() {
  const [sidebarItem, setSidebarItem] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const nav = [
    { id: 'dashboard', label: 'Dashboard', Icon: Home },
    { id: 'users', label: 'Users', Icon: Members },
    { id: 'analytics', label: 'Analytics', Icon: BarChart },
    { id: 'settings', label: 'Settings', Icon: SettingsCog },
  ];

  return (
    <div className="flex w-full h-[640px] border border-alpha/10 rounded-xl overflow-hidden text-sm">
      {/* Sidebar */}
      <div className="w-[200px] flex-shrink-0 border-r border-alpha/10 flex flex-col" style={{ background: 'var(--docs-surface-elevated)' }}>
        <div className="px-3 py-3 border-b border-alpha/5">
          <div className="flex items-center gap-2 px-1">
            <div className="w-6 h-6 rounded-md bg-[var(--color-bg-primary-solid)] flex items-center justify-center">
              <Sparkles className="fill-white" width={14} height={14} />
            </div>
            <span className="font-semibold text-sm">Acme Inc</span>
          </div>
        </div>
        <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setSidebarItem(item.id)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] cursor-pointer transition-colors ${
                sidebarItem === item.id
                  ? 'bg-alpha/8 font-medium'
                  : 'text-secondary hover:bg-alpha/3'
              }`}
            >
              <item.Icon width={16} height={16} className={sidebarItem === item.id ? '' : 'opacity-60'} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-alpha/5">
          <div className="flex items-center gap-2">
            <Avatar name="Jane Doe" size={24} color="secondary" variant="soft" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">Jane Doe</div>
              <div className="text-[10px] text-tertiary truncate">jane@acme.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-alpha/5">
          <h2 className="font-semibold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search..."
              startAdornment={<Search className="fill-tertiary" />}
              size="xs"
              className="w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Tooltip content="Notifications">
              <Button variant="ghost" color="secondary" size="xs" uniform>
                <Bell />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 px-5 py-4">
          {stats.map((s) => (
            <div key={s.label} className="p-3 rounded-lg border border-alpha/8">
              <div className="text-xs text-tertiary mb-1">{s.label}</div>
              <div className="text-lg font-semibold">{s.value}</div>
              <div className={`text-xs mt-0.5 ${s.positive ? 'text-[var(--color-text-success)]' : 'text-[var(--color-text-danger)]'}`}>
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="flex-1 flex gap-4 px-5 pb-4 overflow-hidden">
          {/* Table */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-xs text-secondary">Recent users</span>
              <Button variant="ghost" color="secondary" size="2xs">View all</Button>
            </div>
            <div className="border border-alpha/8 rounded-lg overflow-hidden flex-1">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: 'var(--docs-surface-elevated)' }}>
                    <th className="text-left px-3 py-2 text-tertiary font-medium">Name</th>
                    <th className="text-left px-3 py-2 text-tertiary font-medium">Plan</th>
                    <th className="text-left px-3 py-2 text-tertiary font-medium">Status</th>
                    <th className="text-right px-3 py-2 text-tertiary font-medium">MRR</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.email} className="border-t border-alpha/5">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Avatar name={row.name} size={20} />
                          <div>
                            <div className="font-medium">{row.name}</div>
                            <div className="text-[10px] text-tertiary">{row.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-secondary">{row.plan}</td>
                      <td className="px-3 py-2">
                        <Badge color={statusColor[row.status] as any} size="sm">{row.status}</Badge>
                      </td>
                      <td className="px-3 py-2 text-right font-mono">{row.mrr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity sidebar */}
          <div className="w-[180px] flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-xs text-secondary">Activity</span>
            </div>
            <div className="flex flex-col gap-0">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-2 py-2 border-b border-alpha/5 last:border-b-0">
                  <Avatar name={a.user} size={18} color={a.color} variant="soft" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs">
                      <span className="font-medium">{a.user}</span>{' '}
                      <span className="text-tertiary">{a.action}</span>
                    </p>
                    <p className="text-[10px] text-tertiary">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SaaS Landing Template ───

const landingFeatures = [
  { Icon: Sparkles, title: '9-step size scale', desc: 'From 22px to 48px across all controls.' },
  { Icon: ShieldCheck, title: 'Battle-tested', desc: 'Powers ChatGPT — hundreds of millions of users.' },
  { Icon: Bolt, title: 'Radix + Tailwind 4', desc: 'Modern, accessible, zero legacy.' },
  { Icon: Globe, title: 'Figma parity', desc: 'Design and code match 1:1.' },
];

const landingTestimonials = [
  { name: 'Alex C.', role: 'Designer', quote: 'The sizing system is a game-changer.', stars: 5 },
  { name: 'Maria S.', role: 'Developer', quote: 'Figma parity is real — everything matches.', stars: 5 },
  { name: 'Jordan K.', role: 'Founder', quote: 'Shipped in a weekend with Plex UI.', stars: 5 },
];

export function LandingTemplate() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col w-full border border-alpha/10 rounded-xl overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-alpha/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[var(--color-bg-primary-solid)] flex items-center justify-center">
              <Sparkles className="fill-white" width={14} height={14} />
            </div>
            <span className="font-semibold text-sm">Plex UI</span>
          </div>
          <nav className="flex gap-4 text-sm text-secondary">
            <a className="hover:text-[var(--color-text-primary)] cursor-pointer">Components</a>
            <a className="hover:text-[var(--color-text-primary)] cursor-pointer">Blocks</a>
            <a className="hover:text-[var(--color-text-primary)] cursor-pointer">Pricing</a>
            <a className="hover:text-[var(--color-text-primary)] cursor-pointer">Docs</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button color="primary" size="sm">Get started</Button>
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-6 py-14">
        <Badge color="discovery" variant="soft" size="md" pill className="mb-4">
          New: 12 application blocks
        </Badge>
        <h1 className="heading-2xl mb-3 max-w-[500px]">
          The UI kit behind ChatGPT
        </h1>
        <p className="text-base text-secondary max-w-[420px] mb-6">
          35+ production-grade components with pixel-perfect Figma parity and a 9-step size scale.
        </p>
        <div className="flex items-center gap-3">
          <Button color="primary" size="lg" pill>
            Get started free <ArrowRight />
          </Button>
          <Button variant="outline" size="lg" pill>
            View Figma kit
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-4 gap-4 px-6 py-8 border-t border-alpha/5" style={{ background: 'var(--docs-surface-elevated)' }}>
        {landingFeatures.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center gap-2 px-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-bg-primary-soft)] flex items-center justify-center">
              <f.Icon className="fill-[var(--color-text-primary)]" width={18} height={18} />
            </div>
            <h3 className="text-xs font-semibold">{f.title}</h3>
            <p className="text-[11px] text-secondary leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div className="grid grid-cols-3 gap-4 px-6 py-8 border-t border-alpha/5">
        {landingTestimonials.map((t) => (
          <div key={t.name} className="flex flex-col p-3 rounded-lg border border-alpha/8">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.stars }).map((_, i) => (
                <StarFilled key={i} className="fill-[var(--color-text-warning)]" width={12} height={12} />
              ))}
            </div>
            <p className="text-xs text-secondary flex-1">"{t.quote}"</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Avatar name={t.name} size={18} color="secondary" variant="soft" />
              <span className="text-[11px] font-medium">{t.name}</span>
              <span className="text-[10px] text-tertiary">· {t.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center text-center px-6 py-8 border-t border-alpha/5" style={{ background: 'var(--docs-surface-elevated)' }}>
        <h2 className="heading-md mb-2">Start building today</h2>
        <p className="text-sm text-secondary mb-4">Free forever. Upgrade when you need the Figma kit.</p>
        <div className="flex gap-2 max-w-[340px]">
          <Input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            pill
            type="email"
            className="flex-1"
          />
          <Button color="primary" size="lg" pill>Subscribe</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Chat Interface Template ───

const chatMessages = [
  { role: 'assistant' as const, content: 'Hello! How can I help you today?' },
  { role: 'user' as const, content: 'I want to build a dashboard with Plex UI. Where do I start?' },
  {
    role: 'assistant' as const,
    content: 'Great choice! Start by installing the package with `npm install @plexui/ui`, then set up your Tailwind config with the Plex UI tokens. For a dashboard, I recommend using `size="xs"` for the sidebar controls and `size="md"` for the main content area. Check out the Dashboard template in the Blocks section for a complete example.',
  },
  { role: 'user' as const, content: 'How do I handle dark mode?' },
];

const chatHistory = [
  { title: 'Dashboard setup', time: 'Now' },
  { title: 'Figma variables sync', time: 'Yesterday' },
  { title: 'Custom theming', time: '2 days ago' },
  { title: 'Component sizing', time: 'Last week' },
];

export function ChatTemplate() {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(true);

  return (
    <div className="flex w-full h-[560px] border border-alpha/10 rounded-xl overflow-hidden text-sm">
      {/* Chat sidebar */}
      <div className="w-[200px] flex-shrink-0 border-r border-alpha/10 flex flex-col" style={{ background: 'var(--docs-surface-elevated)' }}>
        <div className="px-3 py-3 border-b border-alpha/5">
          <Button color="primary" size="sm" block>
            <PlusLg /> New chat
          </Button>
        </div>
        <div className="flex-1 px-2 py-2 overflow-y-auto">
          {chatHistory.map((c, i) => (
            <button
              key={c.title}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[13px] mb-0.5 cursor-pointer transition-colors ${
                i === 0 ? 'bg-alpha/8 font-medium' : 'text-secondary hover:bg-alpha/3'
              }`}
            >
              <div className="truncate">{c.title}</div>
              <div className="text-[10px] text-tertiary">{c.time}</div>
            </button>
          ))}
        </div>
        <div className="px-3 py-3 border-t border-alpha/5">
          <div className="flex items-center gap-2">
            <Avatar name="Jane Doe" size={24} color="secondary" variant="soft" />
            <span className="text-xs font-medium flex-1 truncate">Jane Doe</span>
            <Button variant="ghost" color="secondary" size="3xs" uniform>
              <SettingsCog />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-alpha/5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">Dashboard setup</span>
            <Badge color="info" size="sm">GPT-4</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" color="secondary" size="2xs" uniform>
              <DotsHorizontal />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar
                name={msg.role === 'user' ? 'You' : 'AI'}
                size={26}
                color={msg.role === 'user' ? 'secondary' : 'primary'}
                variant={msg.role === 'user' ? 'soft' : 'solid'}
                className="flex-shrink-0 mt-0.5"
              />
              <div
                className={`text-[13px] leading-relaxed px-3 py-2 rounded-xl max-w-[75%] ${
                  msg.role === 'user'
                    ? 'bg-[var(--color-bg-primary-solid)] text-[var(--color-text-primary-solid)]'
                    : 'bg-alpha/5'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2.5">
              <Avatar name="AI" size={26} color="primary" variant="solid" className="flex-shrink-0 mt-0.5" />
              <div className="text-[13px] leading-relaxed px-3 py-2 rounded-xl bg-alpha/5">
                <ShimmerText as="span" className="text-secondary">Thinking...</ShimmerText>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-alpha/5">
          <div className="flex gap-2">
            <Input
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              size="md"
              pill
              className="flex-1"
            />
            <Button
              color="primary"
              size="md"
              uniform
              pill
              onClick={() => {
                setInput('');
                setIsThinking(!isThinking);
              }}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
