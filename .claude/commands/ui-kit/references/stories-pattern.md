# Storybook Stories Pattern

## Story file template

Every component gets a stories file following this pattern:

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Control size (9-step scale)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
      description: 'Semantic color',
    },
    pill: {
      control: 'boolean',
      description: 'Pill-shaped border radius',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof Button>

/** Default button with interactive controls */
export const Default: Story = {}

/** All visual variants */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button {...args} variant="solid">Solid</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="soft">Soft</Button>
    </div>
  ),
}

/** Full 9-step size scale */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      {(['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

/** All semantic colors */
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {(['primary', 'secondary', 'danger', 'success', 'warning'] as const).map((color) => (
        <Button key={color} {...args} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

/** All component states */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button {...args}>Default</Button>
        <Button {...args} disabled>Disabled</Button>
        <Button {...args} loading>Loading</Button>
      </div>
      <p style={{ fontSize: '13px', color: '#666' }}>
        Hover and focus states are interactive — hover over or Tab to buttons above.
      </p>
    </div>
  ),
}

/** Pill shape */
export const Pill: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button {...args} pill>Pill Solid</Button>
      <Button {...args} pill variant="outline">Pill Outline</Button>
      <Button {...args} pill variant="soft">Pill Soft</Button>
    </div>
  ),
}
```

## Story patterns by component type

### Form controls (Input, Select, Textarea)

Include these stories:
- **Default** — basic usage with controls
- **Sizes** — 9-step scale
- **States** — default, filled, focus, error, disabled, readonly
- **WithLabel** — paired with label element
- **Validation** — error state with error message

```tsx
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
      <Input placeholder="Default" />
      <Input defaultValue="Filled value" />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="Read-only" readOnly />
    </div>
  ),
}
```

### Display components (Badge, Avatar, Card)

Include these stories:
- **Default** — basic usage
- **Variants** — all visual variants
- **Sizes** — available sizes
- **Colors** — semantic colors
- **Composition** — combined with other components

### Overlay components (Modal, Dropdown, Tooltip)

Include these stories:
- **Default** — basic open/close
- **Controlled** — with state management
- **Placement** — different positions (for Tooltip/Dropdown)
- **Content** — various content configurations
- **Nested** — overlay inside overlay (if supported)

## Dark mode story wrapper

Every story file should work in both themes. Add a decorator if needed:

```tsx
const meta: Meta<typeof Button> = {
  // ...
  decorators: [
    (Story) => (
      <div style={{ padding: '24px' }}>
        <Story />
      </div>
    ),
  ],
}
```

## Naming conventions

- Story file: `ComponentName.stories.tsx`
- Meta title: `Components/ComponentName` (or `Forms/ComponentName`, `Overlays/ComponentName`)
- Story names: PascalCase (Default, Variants, Sizes, Colors, States)
- Use `tags: ['autodocs']` to auto-generate documentation
