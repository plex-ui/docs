# Component Implementation Patterns

## Shared types (`src/lib/types.ts`)

```typescript
/** Utility: Creates a union type from string literal variants */
export type Variants<T extends string> = T

/** Control size scale — 9 steps from 3xs to 3xl */
export type ControlSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

/** Semantic color palette */
export type SemanticColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

/** Common component props mixin */
export type BaseComponentProps = {
  className?: string
  children?: React.ReactNode
}
```

## Class name utility (`src/lib/cn.ts`)

```typescript
import clsx, { type ClassValue } from 'clsx'

/** Merge class names with clsx */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
```

## Component patterns by category

### 1. Interactive Control (Button, Input, Select)

These components MUST support:
- `size?: ControlSize` (default: `'md'`)
- `color?: SemanticColor` (default: `'primary'`)
- `variant` specific to the component
- `disabled?: boolean`
- `ref` for DOM access
- All native HTML attributes via rest props

**Example: Button**

```tsx
// src/components/Button/index.tsx
import { type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import type { ControlSize, SemanticColor } from '../../lib/types'
import s from './Button.module.css'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ControlSize
  color?: SemanticColor
  pill?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  ref?: React.Ref<HTMLButtonElement | null>
  children?: React.ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

export function Button({
  variant = 'solid',
  size = 'md',
  color = 'primary',
  pill,
  loading,
  disabled,
  className,
  ref,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={clsx(s.Button, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-pill={pill ? '' : undefined}
      data-loading={loading ? '' : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={s.Spinner} aria-hidden="true" />}
      <span className={s.Label} data-loading={loading ? '' : undefined}>
        {children}
      </span>
    </button>
  )
}
```

**Button CSS Module:**

```css
/* src/components/Button/Button.module.css */
.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--control-gap);
  height: var(--control-height);
  padding: 0 var(--control-padding-x);
  font-size: var(--control-font-size);
  font-weight: 500;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: var(--control-border-radius);
  cursor: pointer;
  user-select: none;
  transition: all var(--duration-base) var(--ease-enter);
  outline: none;
}

/* ─── Size Scale ─── */
.Button[data-size="3xs"] {
  --control-height: var(--size-control-3xs);
  --control-padding-x: var(--control-3xs-padding-x);
  --control-font-size: var(--control-3xs-font-size);
  --control-border-radius: var(--control-3xs-border-radius);
  --control-gap: var(--control-3xs-gap);
}
.Button[data-size="2xs"] {
  --control-height: var(--size-control-2xs);
  --control-padding-x: var(--control-2xs-padding-x);
  --control-font-size: var(--control-2xs-font-size);
  --control-border-radius: var(--control-2xs-border-radius);
  --control-gap: var(--control-2xs-gap);
}
.Button[data-size="xs"] {
  --control-height: var(--size-control-xs);
  --control-padding-x: var(--control-xs-padding-x);
  --control-font-size: var(--control-xs-font-size);
  --control-border-radius: var(--control-xs-border-radius);
  --control-gap: var(--control-xs-gap);
}
.Button[data-size="sm"] {
  --control-height: var(--size-control-sm);
  --control-padding-x: var(--control-sm-padding-x);
  --control-font-size: var(--control-sm-font-size);
  --control-border-radius: var(--control-sm-border-radius);
  --control-gap: var(--control-sm-gap);
}
.Button[data-size="md"] {
  --control-height: var(--size-control-md);
  --control-padding-x: var(--control-md-padding-x);
  --control-font-size: var(--control-md-font-size);
  --control-border-radius: var(--control-md-border-radius);
  --control-gap: var(--control-md-gap);
}
.Button[data-size="lg"] {
  --control-height: var(--size-control-lg);
  --control-padding-x: var(--control-lg-padding-x);
  --control-font-size: var(--control-lg-font-size);
  --control-border-radius: var(--control-lg-border-radius);
  --control-gap: var(--control-lg-gap);
}
.Button[data-size="xl"] {
  --control-height: var(--size-control-xl);
  --control-padding-x: var(--control-xl-padding-x);
  --control-font-size: var(--control-xl-font-size);
  --control-border-radius: var(--control-xl-border-radius);
  --control-gap: var(--control-xl-gap);
}
.Button[data-size="2xl"] {
  --control-height: var(--size-control-2xl);
  --control-padding-x: var(--control-2xl-padding-x);
  --control-font-size: var(--control-2xl-font-size);
  --control-border-radius: var(--control-2xl-border-radius);
  --control-gap: var(--control-2xl-gap);
}
.Button[data-size="3xl"] {
  --control-height: var(--size-control-3xl);
  --control-padding-x: var(--control-3xl-padding-x);
  --control-font-size: var(--control-3xl-font-size);
  --control-border-radius: var(--control-3xl-border-radius);
  --control-gap: var(--control-3xl-gap);
}

/* ─── Pill modifier ─── */
.Button[data-pill] {
  border-radius: var(--radius-full);
  padding: 0 calc(var(--control-padding-x) * 1.33);
}

/* ─── Variant × Color: Solid ─── */
.Button[data-variant="solid"][data-color="primary"] {
  background: var(--color-background-primary-solid);
  color: var(--color-text-primary-solid);
}
.Button[data-variant="solid"][data-color="primary"]:hover:not(:disabled) {
  background: var(--color-background-primary-solid-hover);
}
.Button[data-variant="solid"][data-color="primary"]:active:not(:disabled) {
  background: var(--color-background-primary-solid-active);
}

.Button[data-variant="solid"][data-color="danger"] {
  background: var(--color-background-danger-solid);
  color: var(--color-text-danger-solid);
}
.Button[data-variant="solid"][data-color="danger"]:hover:not(:disabled) {
  background: var(--color-background-danger-solid-hover);
}

.Button[data-variant="solid"][data-color="secondary"] {
  background: var(--color-background-secondary-solid);
  color: var(--color-text-secondary-solid);
}
.Button[data-variant="solid"][data-color="secondary"]:hover:not(:disabled) {
  background: var(--color-background-secondary-solid-hover);
}

/* ─── Variant: Soft ─── */
.Button[data-variant="soft"][data-color="primary"] {
  background: var(--color-background-primary-soft);
  color: var(--color-text-primary-soft);
}
.Button[data-variant="soft"][data-color="primary"]:hover:not(:disabled) {
  background: var(--color-background-primary-soft-hover);
}

/* ─── Variant: Outline ─── */
.Button[data-variant="outline"][data-color="primary"] {
  background: transparent;
  border-color: var(--color-border-primary-outline);
  color: var(--color-text-primary-ghost);
}
.Button[data-variant="outline"][data-color="primary"]:hover:not(:disabled) {
  border-color: var(--color-border-primary-outline-hover);
  background: var(--color-background-primary-ghost-hover);
}

/* ─── Variant: Ghost ─── */
.Button[data-variant="ghost"][data-color="primary"] {
  background: transparent;
  color: var(--color-text-primary-ghost);
}
.Button[data-variant="ghost"][data-color="primary"]:hover:not(:disabled) {
  background: var(--color-background-primary-ghost-hover);
}

/* ─── States ─── */
.Button:focus-visible {
  box-shadow: var(--focus-ring);
}

.Button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ─── Loading ─── */
.Spinner {
  width: var(--control-font-size);
  height: var(--control-font-size);
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 0.6s linear infinite;
  position: absolute;
}

.Label[data-loading] {
  visibility: hidden;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 2. Form Control (Input, Textarea, Select)

Additional requirements:
- `error?: boolean` — error/invalid state
- `placeholder?: string`
- Wrap in a container for label + error message layout

```tsx
// src/components/Input/index.tsx
import { type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import type { ControlSize } from '../../lib/types'
import s from './Input.module.css'

export type InputProps = {
  size?: ControlSize
  error?: boolean
  className?: string
  ref?: React.Ref<HTMLInputElement | null>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export function Input({
  size = 'md',
  error,
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <input
      ref={ref}
      className={clsx(s.Input, className)}
      data-size={size}
      data-error={error ? '' : undefined}
      {...props}
    />
  )
}
```

```css
/* src/components/Input/Input.module.css */
.Input {
  display: flex;
  width: 100%;
  height: var(--control-height);
  padding: 0 var(--control-padding-x);
  font-size: var(--control-font-size);
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--control-border-radius);
  outline: none;
  transition: border-color var(--duration-base) var(--ease-enter),
              box-shadow var(--duration-base) var(--ease-enter);
}

/* Size scale — same pattern as Button */
.Input[data-size="md"] {
  --control-height: var(--size-control-md);
  --control-padding-x: var(--control-md-padding-x);
  --control-font-size: var(--control-md-font-size);
  --control-border-radius: var(--control-md-border-radius);
}
/* ... repeat for all 9 sizes ... */

.Input::placeholder {
  color: var(--color-text-tertiary);
}

.Input:hover:not(:disabled):not(:focus) {
  border-color: var(--color-border-strong);
}

.Input:focus {
  border-color: var(--color-border-focus);
  box-shadow: var(--focus-ring);
}

.Input[data-error] {
  border-color: var(--color-border-error);
}

.Input[data-error]:focus {
  border-color: var(--color-border-error);
  box-shadow: 0 0 0 2px var(--color-surface-background), 0 0 0 4px var(--danger-400);
}

.Input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-surface-sunken);
}
```

### 3. Display Component (Card, Badge, Avatar)

Simpler pattern — no ControlSize needed unless the component has interactive variants.

```tsx
// src/components/Badge/index.tsx
import clsx from 'clsx'
import type { SemanticColor } from '../../lib/types'
import s from './Badge.module.css'

export type BadgeVariant = 'solid' | 'soft' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: SemanticColor
  pill?: boolean
  className?: string
  children?: React.ReactNode
}

export function Badge({
  variant = 'soft',
  size = 'md',
  color = 'secondary',
  pill,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(s.Badge, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      data-pill={pill ? '' : undefined}
    >
      {children}
    </span>
  )
}
```

### 4. Overlay Component (Modal, Dropdown, Tooltip, Toast)

Additional patterns:
- Portal rendering (`createPortal`)
- Keyboard trap (focus management)
- `open` state management
- Animation on mount/unmount
- Backdrop/overlay

```tsx
// Simplified Modal pattern
export type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null

  return createPortal(
    <div className={s.Overlay} onClick={onClose}>
      <div
        className={clsx(s.Modal, className)}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
```

## State handling checklist

Every component should handle these states in CSS:

| State | CSS Selector | Data Attribute |
|-------|-------------|----------------|
| Default | `.Component` | — |
| Hover | `.Component:hover:not(:disabled)` | — |
| Active | `.Component:active:not(:disabled)` | — |
| Focus | `.Component:focus-visible` | — |
| Disabled | `.Component:disabled` or `.Component[data-disabled]` | `data-disabled` |
| Error | `.Component[data-error]` | `data-error` |
| Loading | `.Component[data-loading]` | `data-loading` |
| Open | `.Component[data-open]` | `data-open` |
| Selected | `.Component[data-selected]` | `data-selected` |
| Checked | `.Component[data-checked]` | `data-checked` |
| Read-only | `.Component[data-readonly]` | `data-readonly` |
