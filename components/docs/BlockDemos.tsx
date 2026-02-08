'use client';

import React, { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { Textarea } from '@plexui/ui/components/Textarea';
import { Select } from '@plexui/ui/components/Select';
import { Switch } from '@plexui/ui/components/Switch';
import { Badge } from '@plexui/ui/components/Badge';
import { Avatar } from '@plexui/ui/components/Avatar';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { FieldError } from '@plexui/ui/components/FieldError';
import { Tooltip } from '@plexui/ui/components/Tooltip';
import { ShimmerText } from '@plexui/ui/components/ShimmerText';
import {
  Search,
  ArrowUp,
  PlusLg,
  Delete,
  Filter,
  SettingsCog,
  Clear,
} from '@plexui/ui/components/Icon';

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
  borderRadius: 6,
  background: 'var(--docs-surface-elevated)',
};

function DemoControlRow({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div style={controlRowStyle}>
      <span style={controlLabelStyle}>{name}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
    </div>
  );
}

const SIZE_OPTIONS = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
type ControlSize = (typeof SIZE_OPTIONS)[number];

// ─── Settings Form Block ───

export function SettingsFormBlock() {
  const [size, setSize] = useState<ControlSize>('md');
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [role, setRole] = useState('developer');
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const roleOptions = [
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Product Manager', value: 'pm' },
    { label: 'Engineering Manager', value: 'em' },
  ];

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<ControlSize>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center py-12 w-full" data-demo-stage>
        <div className="p-6 max-w-[480px] w-full">
        <h3 className="heading-sm mb-1">Account settings</h3>
        <p className="text-sm text-secondary mb-5">Manage your profile and preferences.</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1 block text-secondary">Full name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              size={size}
            />
          </div>
          <div>
            <label className="text-sm mb-1 block text-secondary">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size={size}
              type="email"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block text-secondary">Role</label>
            <Select
              value={role}
              options={roleOptions}
              onChange={({ value }) => setRole(value)}
              size={size}
              block
            />
          </div>
          <div>
            <label className="text-sm mb-1 block text-secondary">Bio</label>
            <Textarea
              placeholder="Tell us about yourself..."
              size={size}
              rows={3}
            />
          </div>

          <div className="border-t border-alpha/10 pt-4 mt-1 flex flex-col gap-3">
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
              label="Email notifications"
            />
            <Switch
              checked={marketing}
              onCheckedChange={setMarketing}
              label="Marketing emails"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <Button color="primary" size={size}>Save changes</Button>
            <Button variant="ghost" size={size}>Cancel</Button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

// ─── Data Table Toolbar Block ───

const statusOptions = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
];

const tableData = [
  { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
  { name: 'Marcus Johnson', email: 'marcus@example.com', role: 'Developer', status: 'Active' },
  { name: 'Aisha Patel', email: 'aisha@example.com', role: 'Designer', status: 'Pending' },
  { name: 'Tom Rivera', email: 'tom@example.com', role: 'Developer', status: 'Inactive' },
  { name: 'Lena Schmidt', email: 'lena@example.com', role: 'PM', status: 'Active' },
];

const statusColorMap: Record<string, string> = {
  Active: 'success',
  Inactive: 'secondary',
  Pending: 'warning',
};

export function DataTableBlock() {
  const [size, setSize] = useState<ControlSize>('xs');
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = tableData.filter((row) => {
    const matchSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase()) || row.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = status === 'all' || row.status.toLowerCase() === status;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (email: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<ControlSize>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div className="flex-1 flex flex-col items-center w-full py-12" data-demo-stage>
        <div className="p-4 w-full max-w-full">
        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Input
            placeholder="Search members..."
            startAdornment={<Search className="fill-tertiary" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            size={size}
            className="flex-1 min-w-[180px] max-w-[280px]"
          />
          <Select
            value={status}
            options={statusOptions}
            onChange={({ value }) => setStatus(value)}
            size={size}
            block={false}
          />
          <Button variant="outline" size={size}>
            <Filter /> Filter
          </Button>
          <div className="flex-1" />
          <Button color="primary" size={size}>
            <PlusLg /> Add member
          </Button>
        </div>

        {/* Table */}
        <div className="border border-alpha/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-alpha/10" style={{ background: 'var(--docs-surface-elevated)' }}>
                <th className="w-10 px-3 py-2" />
                <th className="text-left px-3 py-2 text-xs font-medium text-tertiary">Name</th>
                <th className="text-left px-3 py-2 text-xs font-medium text-tertiary">Email</th>
                <th className="text-left px-3 py-2 text-xs font-medium text-tertiary">Role</th>
                <th className="text-left px-3 py-2 text-xs font-medium text-tertiary">Status</th>
                <th className="w-10 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.email} className="border-b border-alpha/5 last:border-b-0">
                  <td className="px-3 py-2">
                    <Checkbox
                      checked={selected.has(row.email)}
                      onCheckedChange={() => toggleSelect(row.email)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar name={row.name} size={22} />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-secondary">{row.email}</td>
                  <td className="px-3 py-2 text-secondary">{row.role}</td>
                  <td className="px-3 py-2">
                    <Badge color={statusColorMap[row.status] as any} size="sm">{row.status}</Badge>
                  </td>
                  <td className="px-3 py-2">
                    <Button variant="ghost" color="secondary" size="3xs" uniform>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected.size > 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-secondary">
            <span>{selected.size} selected</span>
            <Button variant="ghost" color="danger" size={size}>
              <Delete /> Delete selected
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

// ─── Chat Interface Block ───

const messages = [
  { role: 'user' as const, content: 'How do I set up dark mode with Plex UI?' },
  {
    role: 'assistant' as const,
    content:
      'Plex UI uses the CSS `light-dark()` function for theming. Wrap your app with `PlexUIProvider` and use `applyDocumentTheme("dark")` to switch themes. All design tokens automatically adapt.',
  },
  { role: 'user' as const, content: 'Does it work with Tailwind classes too?' },
];

export function ChatBlock() {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(true);

  return (
    <div className="flex flex-col w-full h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-fd-border" style={{ background: 'var(--docs-surface-elevated)' }}>
        <div className="flex items-center gap-2">
          <Avatar name="Plex AI" size={28} color="primary" variant="solid" />
          <div>
            <div className="text-sm font-semibold">Plex AI</div>
            <div className="text-xs text-tertiary">Always online</div>
          </div>
        </div>
        <Button variant="ghost" color="secondary" size="sm" uniform>
          <SettingsCog />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <Avatar
              name={msg.role === 'user' ? 'You' : 'Plex AI'}
              size={28}
              color={msg.role === 'user' ? 'secondary' : 'primary'}
              variant={msg.role === 'user' ? 'soft' : 'solid'}
              className="flex-shrink-0 mt-0.5"
            />
            <div
              className={`text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[80%] ${
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
            <Avatar name="Plex AI" size={28} color="primary" variant="solid" className="flex-shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed px-3 py-2 rounded-xl bg-alpha/5">
              <ShimmerText as="span" className="text-secondary">Thinking...</ShimmerText>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-fd-border">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="lg"
            pill
            className="flex-1"
          />
          <Button
            color="primary"
            size="lg"
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
  );
}

// ─── Login Form Block ───

export function LoginFormBlock() {
  const [size, setSize] = useState<ControlSize>('lg');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  return (
    <>
      <div data-demo-controls style={controlsTableStyle}>
        <DemoControlRow name="size">
          <SegmentedControl<ControlSize>
            value={size}
            onChange={setSize}
            aria-label="size"
            size="xs"
          >
            {SIZE_OPTIONS.map((s) => (
              <SegmentedControl.Option key={s} value={s}>{s}</SegmentedControl.Option>
            ))}
          </SegmentedControl>
        </DemoControlRow>
      </div>
      <div className="flex-1 flex items-center justify-center py-12 w-full" data-demo-stage>
        <div className="p-8 max-w-[380px] w-full">
        <div className="text-center mb-6">
          <h3 className="heading-md mb-1">Welcome back</h3>
          <p className="text-sm text-secondary">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm mb-1 block text-secondary">Email</label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowError(false);
              }}
              placeholder="jane@example.com"
              size={size}
              type="email"
              invalid={showError}
            />
            {showError && <FieldError>Please enter a valid email</FieldError>}
          </div>
          <div>
            <label className="text-sm mb-1 block text-secondary">Password</label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              size={size}
              type="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />
            <button className="text-sm text-[var(--color-text-primary)] hover:underline cursor-pointer">
              Forgot password?
            </button>
          </div>

          <Button
            color="primary"
            size={size}
            block
            className="mt-1"
            onClick={() => {
              if (!email.includes('@')) setShowError(true);
            }}
          >
            Sign in
          </Button>

          <div className="text-center text-sm text-secondary mt-2">
            Don't have an account?{' '}
            <button className="text-[var(--color-text-primary)] hover:underline cursor-pointer">Sign up</button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
