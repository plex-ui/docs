'use client';

import React, { useState } from 'react';
import { Button } from '@plexui/ui/components/Button';
import { Input } from '@plexui/ui/components/Input';
import { Badge } from '@plexui/ui/components/Badge';
import { Avatar } from '@plexui/ui/components/Avatar';
import { Switch } from '@plexui/ui/components/Switch';
import { SegmentedControl } from '@plexui/ui/components/SegmentedControl';
import { Checkbox } from '@plexui/ui/components/Checkbox';
import { Tooltip } from '@plexui/ui/components/Tooltip';
import {
  FileUpload,
  X,
  CheckCircleFilled,
  Bell,
  Clock,
  ExclamationMarkCircle,
  Search,
  Filter,
  DotsHorizontal,
} from '@plexui/ui/components/Icon';

// ─── File Upload Area ───

export function FileUploadBlock() {
  const [files, setFiles] = useState<{ name: string; size: string; progress: number }[]>([
    { name: 'design-tokens.json', size: '24 KB', progress: 100 },
    { name: 'components.figma', size: '12.4 MB', progress: 72 },
  ]);

  return (
    <div className="w-full p-6">
      <div className="max-w-[460px] mx-auto">
        {/* Drop zone */}
        <div className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-alpha/15 rounded-xl text-center hover:border-alpha/25 transition-colors cursor-pointer mb-4">
          <div className="w-10 h-10 rounded-lg bg-alpha/5 flex items-center justify-center">
            <FileUpload className="fill-tertiary" width={20} height={20} />
          </div>
          <div>
            <p className="text-sm font-medium">Drop files here or click to browse</p>
            <p className="text-xs text-tertiary mt-1">PNG, JPG, SVG, JSON up to 50MB</p>
          </div>
          <Button variant="outline" size="sm">
            Choose files
          </Button>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-3 rounded-lg border border-alpha/10"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <span className="text-xs text-tertiary flex-shrink-0">{file.size}</span>
                  </div>
                  {file.progress < 100 && (
                    <div className="mt-1.5 h-1 rounded-full bg-alpha/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--color-bg-primary-solid)] transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {file.progress === 100 ? (
                  <CheckCircleFilled className="fill-[var(--color-text-success)] flex-shrink-0" width={16} height={16} />
                ) : (
                  <span className="text-xs font-mono text-tertiary flex-shrink-0">{file.progress}%</span>
                )}
                <Button
                  variant="ghost"
                  color="secondary"
                  size="3xs"
                  uniform
                  onClick={() => setFiles((prev) => prev.filter((f) => f.name !== file.name))}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Activity Feed ───

const activities = [
  {
    user: 'Sarah Chen',
    action: 'pushed 3 commits to',
    target: 'main',
    time: '2 minutes ago',
    color: 'primary' as const,
  },
  {
    user: 'Marcus Johnson',
    action: 'commented on',
    target: 'PR #127',
    time: '15 minutes ago',
    color: 'info' as const,
  },
  {
    user: 'Aisha Patel',
    action: 'deployed',
    target: 'v2.4.0',
    time: '1 hour ago',
    color: 'success' as const,
  },
  {
    user: 'Tom Rivera',
    action: 'opened issue',
    target: '#301',
    time: '3 hours ago',
    color: 'danger' as const,
  },
  {
    user: 'Lena Schmidt',
    action: 'merged',
    target: 'PR #125',
    time: '5 hours ago',
    color: 'discovery' as const,
  },
];

export function ActivityFeedBlock() {
  return (
    <div className="w-full p-6">
      <div className="max-w-[460px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Activity</h3>
          <Button variant="ghost" color="secondary" size="xs">
            View all
          </Button>
        </div>
        <div className="flex flex-col">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-alpha/5 last:border-b-0"
            >
              <Avatar name={a.user} size={28} color={a.color} variant="soft" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{a.user}</span>{' '}
                  <span className="text-secondary">{a.action}</span>{' '}
                  <span className="font-medium">{a.target}</span>
                </p>
                <p className="text-xs text-tertiary mt-0.5 flex items-center gap-1">
                  <Clock width={11} height={11} /> {a.time}
                </p>
              </div>
              <Button variant="ghost" color="secondary" size="3xs" uniform>
                <DotsHorizontal />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notification Panel ───

const notifications = [
  {
    title: 'New component released',
    description: 'FloatingLabelInput is now available in v2.4.0',
    time: '5m ago',
    unread: true,
    type: 'info',
  },
  {
    title: 'Deploy succeeded',
    description: 'Production deploy completed in 42s',
    time: '23m ago',
    unread: true,
    type: 'success',
  },
  {
    title: 'Build failed',
    description: 'Type error in components/Dashboard.tsx:45',
    time: '1h ago',
    unread: false,
    type: 'error',
  },
  {
    title: 'Review requested',
    description: 'Sarah Chen requested your review on PR #128',
    time: '3h ago',
    unread: false,
    type: 'info',
  },
];

const typeIcon: Record<string, React.ReactNode> = {
  info: <Bell className="fill-[var(--color-text-info)]" width={16} height={16} />,
  success: <CheckCircleFilled className="fill-[var(--color-text-success)]" width={16} height={16} />,
  error: <ExclamationMarkCircle className="fill-[var(--color-text-danger)]" width={16} height={16} />,
};

export function NotificationBlock() {
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const displayed = tab === 'unread' ? notifications.filter((n) => n.unread) : notifications;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-fd-border" style={{ background: 'var(--docs-surface-elevated)' }}>
        <h3 className="text-sm font-semibold">Notifications</h3>
        <SegmentedControl<'all' | 'unread'>
          value={tab}
          onChange={setTab}
          aria-label="Filter"
          size="2xs"
        >
          <SegmentedControl.Option value="all">All</SegmentedControl.Option>
          <SegmentedControl.Option value="unread" badge={notifications.filter((n) => n.unread).length}>
            Unread
          </SegmentedControl.Option>
        </SegmentedControl>
      </div>
      <div className="flex flex-col max-w-[420px] mx-auto">
        {displayed.map((n, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 px-4 py-3 border-b border-alpha/5 last:border-b-0 ${
              n.unread ? 'bg-[var(--color-bg-primary-soft)]/20' : ''
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">{typeIcon[n.type]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{n.title}</span>
                {n.unread && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg-primary-solid)] flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-secondary mt-0.5">{n.description}</p>
              <p className="text-[10px] text-tertiary mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-fd-border text-center">
        <Button variant="ghost" color="secondary" size="xs">
          Mark all as read
        </Button>
      </div>
    </div>
  );
}

// ─── Command / Search Modal ───

const searchResults = [
  { label: 'Button', section: 'Components', shortcut: '⌘B' },
  { label: 'Input', section: 'Components', shortcut: '⌘I' },
  { label: 'Segmented Control', section: 'Components', shortcut: null },
  { label: 'Design Tokens', section: 'Foundations', shortcut: null },
  { label: 'Dark Mode', section: 'Concepts', shortcut: null },
];

export function SearchModalBlock() {
  const [query, setQuery] = useState('');

  const filtered = query
    ? searchResults.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.section.toLowerCase().includes(query.toLowerCase())
      )
    : searchResults;

  return (
    <div className="w-full p-6">
      <div className="max-w-[480px] mx-auto rounded-xl border border-alpha/15 overflow-hidden shadow-lg">
        {/* Search input */}
        <div className="px-4 py-3 border-b border-alpha/10">
          <Input
            placeholder="Search components, tokens, hooks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            startAdornment={<Search className="fill-tertiary" />}
            size="lg"
            variant="soft"
          />
        </div>

        {/* Results */}
        <div className="flex flex-col py-1">
          {filtered.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between px-4 py-2 hover:bg-alpha/3 cursor-pointer"
            >
              <div>
                <span className="text-sm">{r.label}</span>
                <span className="text-xs text-tertiary ml-2">{r.section}</span>
              </div>
              {r.shortcut && (
                <span className="text-[10px] font-mono text-tertiary px-1.5 py-0.5 rounded bg-alpha/5">{r.shortcut}</span>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-tertiary">
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-alpha/10 text-[10px] text-tertiary">
          <span>{filtered.length} results</span>
          <div className="flex items-center gap-2">
            <span className="px-1 py-0.5 rounded bg-alpha/5 font-mono">↑↓</span>
            <span>navigate</span>
            <span className="px-1 py-0.5 rounded bg-alpha/5 font-mono">↵</span>
            <span>open</span>
            <span className="px-1 py-0.5 rounded bg-alpha/5 font-mono">esc</span>
            <span>close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
