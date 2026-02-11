import type { Meta } from "@storybook/react"
import { useState } from "react"
import { Bell, DarkMode, Grid, Home, LightMode, Menu, SettingsCog, SystemMode } from "../Icon"
import { Tabs, type TabsProps, type SizeVariant } from "./"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    variant: {
      control: "select",
      options: ["segmented", "underline"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
    gutterSize: {
      control: "select",
      options: ["2xs", "xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

export const Base = (args: TabsProps<string>) => {
  const [view, setView] = useState("all")

  return (
    <Tabs
      {...args}
      value={view}
      onChange={(nextView) => setView(nextView)}
      aria-label="Select view"
    >
      <Tabs.Tab value="all">All</Tabs.Tab>
      <Tabs.Tab value="failed">Failed</Tabs.Tab>
      <Tabs.Tab value="successful">Successful</Tabs.Tab>
    </Tabs>
  )
}

export const Underline = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("overview")

  return (
    <Tabs
      {...args}
      variant="underline"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select section"
    >
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
      <Tabs.Tab value="reports">Reports</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
    </Tabs>
  )
}

Underline.args = {
  size: "md",
}

Underline.parameters = {
  controls: { include: ["size"] },
}

export const UnderlineBlock = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("overview")

  return (
    <div className="w-[500px]">
      <Tabs
        {...args}
        variant="underline"
        block
        value={tab}
        onChange={(nextTab) => setTab(nextTab)}
        aria-label="Select section"
      >
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab value="reports">Reports</Tabs.Tab>
      </Tabs>
    </div>
  )
}

UnderlineBlock.args = {
  size: "lg",
}

UnderlineBlock.parameters = {
  controls: { include: ["size"] },
}

export const UnderlineWithIcons = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("home")

  return (
    <Tabs
      {...args}
      variant="underline"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select section"
    >
      <Tabs.Tab value="home" icon={<Home />}>Home</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
      <Tabs.Tab value="notifications" icon={<Bell />}>Notifications</Tabs.Tab>
    </Tabs>
  )
}

UnderlineWithIcons.args = {
  size: "lg",
}

UnderlineWithIcons.parameters = {
  controls: { include: ["size"] },
}

export const UnderlineDisabled = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("overview")

  return (
    <Tabs
      {...args}
      variant="underline"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select section"
    >
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
      <Tabs.Tab value="reports" disabled>Reports</Tabs.Tab>
      <Tabs.Tab value="settings">Settings</Tabs.Tab>
    </Tabs>
  )
}

export const VerticalSegmented = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("account")

  return (
    <Tabs
      {...args}
      orientation="vertical"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Settings navigation"
    >
      <Tabs.Tab value="account">Account</Tabs.Tab>
      <Tabs.Tab value="password">Password</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      <Tabs.Tab value="display">Display</Tabs.Tab>
    </Tabs>
  )
}

VerticalSegmented.args = {
  size: "md",
}

VerticalSegmented.parameters = {
  controls: { include: ["size", "pill"] },
}

export const VerticalUnderline = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("account")

  return (
    <Tabs
      {...args}
      variant="underline"
      orientation="vertical"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Settings navigation"
    >
      <Tabs.Tab value="account">Account</Tabs.Tab>
      <Tabs.Tab value="password">Password</Tabs.Tab>
      <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      <Tabs.Tab value="display">Display</Tabs.Tab>
    </Tabs>
  )
}

VerticalUnderline.args = {
  size: "md",
}

VerticalUnderline.parameters = {
  controls: { include: ["size"] },
}

export const VerticalUnderlineWithIcons = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("home")

  return (
    <Tabs
      {...args}
      variant="underline"
      orientation="vertical"
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select section"
    >
      <Tabs.Tab value="home" icon={<Home />}>Home</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
      <Tabs.Tab value="notifications" icon={<Bell />}>Notifications</Tabs.Tab>
    </Tabs>
  )
}

VerticalUnderlineWithIcons.args = {
  size: "lg",
}

VerticalUnderlineWithIcons.parameters = {
  controls: { include: ["size"] },
}

export const Sizing = (args: TabsProps<string>) => <Base {...args} />

Sizing.args = {
  size: "xl",
  pill: false,
}

Sizing.parameters = {
  controls: { include: ["size", "gutterSize", "pill", "variant", "orientation"] },
}

export const Block = (args: TabsProps<string>) => (
  <div className="w-[420px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <Base {...args} />
  </div>
)

Block.args = {
  block: true,
}

Block.parameters = {
  controls: { include: ["block", "variant"] },
}

export const Disabled = (args: TabsProps<string>) => <Base {...args} />

Disabled.args = {
  disabled: true,
}

Disabled.parameters = {
  controls: { include: ["disabled", "variant"] },
}

export const DisabledOption = ({ disabled, ...restProps }: TabsProps<string>) => {
  const [view, setView] = useState("all")

  return (
    <Tabs
      {...restProps}
      value={view}
      onChange={(nextView) => setView(nextView)}
      aria-label="Select view"
    >
      <Tabs.Tab value="all">All</Tabs.Tab>
      <Tabs.Tab value="failed">Failed</Tabs.Tab>
      <Tabs.Tab value="successful" disabled={disabled}>
        Successful
      </Tabs.Tab>
    </Tabs>
  )
}

DisabledOption.args = {
  disabled: true,
}

DisabledOption.parameters = {
  controls: { include: ["disabled", "variant"] },
}

export const Scrollable = ({ size }: { size: SizeVariant }) => {
  const [long, setLong] = useState("1")

  return (
    <div className="max-w-[400px]">
      <div className="flex">
        <Tabs
          value={long}
          onChange={(v) => setLong(v)}
          aria-label="Scrollable tabs"
          size={size}
        >
          <Tabs.Tab value="1">Overview</Tabs.Tab>
          <Tabs.Tab value="2">Analytics</Tabs.Tab>
          <Tabs.Tab value="3">Reports</Tabs.Tab>
          <Tabs.Tab value="4">Settings</Tabs.Tab>
          <Tabs.Tab value="5">Members</Tabs.Tab>
          <Tabs.Tab value="6">Billing</Tabs.Tab>
          <Tabs.Tab value="7">Security</Tabs.Tab>
          <Tabs.Tab value="8">Integrations</Tabs.Tab>
        </Tabs>
      </div>
    </div>
  )
}

export const NarrowPill = (args: TabsProps<string>) => {
  const [view, setView] = useState("1")
  const [mode, setMode] = useState("light")

  return (
    <div className="flex flex-col items-center gap-8">
      <Tabs
        {...args}
        block={false}
        value={view}
        onChange={(nextView) => setView(nextView)}
        aria-label="Select number"
      >
        <Tabs.Tab value="1">1</Tabs.Tab>
        <Tabs.Tab value="2">2</Tabs.Tab>
        <Tabs.Tab value="3">3</Tabs.Tab>
      </Tabs>

      <Tabs
        {...args}
        block={false}
        value={mode}
        onChange={(nextMode) => setMode(nextMode)}
        aria-label="Select mode"
      >
        <Tabs.Tab value="light" aria-label="Light mode">
          <LightMode />
        </Tabs.Tab>
        <Tabs.Tab value="dark" aria-label="Dark mode">
          <DarkMode />
        </Tabs.Tab>
        <Tabs.Tab value="system" aria-label="System mode">
          <SystemMode />
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

NarrowPill.args = {
  size: "3xl",
  gutterSize: "2xs",
  pill: true,
}

NarrowPill.parameters = {
  controls: { include: ["size", "gutterSize", "pill"] },
}

export const IconOnly = (args: TabsProps<string>) => {
  const [view, setView] = useState("grid")

  return (
    <Tabs
      {...args}
      value={view}
      onChange={(nextView) => setView(nextView)}
      aria-label="Select view mode"
    >
      <Tabs.Tab value="grid" icon={<Grid />} aria-label="Grid view" />
      <Tabs.Tab value="list" icon={<Menu />} aria-label="List view" />
    </Tabs>
  )
}

IconOnly.args = {
  size: "md",
}

IconOnly.parameters = {
  controls: { include: ["size", "pill", "variant"] },
}

export const IconAndText = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("home")

  return (
    <Tabs
      {...args}
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select section"
    >
      <Tabs.Tab value="home" icon={<Home />}>Home</Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
      <Tabs.Tab value="notifications" icon={<Bell />}>Notifications</Tabs.Tab>
    </Tabs>
  )
}

IconAndText.args = {
  size: "lg",
}

IconAndText.parameters = {
  controls: { include: ["size", "pill", "variant"] },
}

export const WithBadge = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("all")

  return (
    <Tabs
      {...args}
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select filter"
    >
      <Tabs.Tab value="all" badge={128}>All</Tabs.Tab>
      <Tabs.Tab value="unread" badge={{ content: 12, color: "info" }}>Unread</Tabs.Tab>
      <Tabs.Tab value="flagged" badge={{ content: 3, color: "danger" }}>Flagged</Tabs.Tab>
    </Tabs>
  )
}

WithBadge.args = {
  size: "lg",
}

WithBadge.parameters = {
  controls: { include: ["size", "pill", "variant"] },
}

export const IconTextBadge = (args: TabsProps<string>) => {
  const [tab, setTab] = useState("inbox")

  return (
    <Tabs
      {...args}
      value={tab}
      onChange={(nextTab) => setTab(nextTab)}
      aria-label="Select mailbox"
    >
      <Tabs.Tab value="inbox" icon={<Home />} badge={24}>Inbox</Tabs.Tab>
      <Tabs.Tab
        value="notifications"
        icon={<Bell />}
        badge={{ content: 5, color: "danger" }}
      >
        Alerts
      </Tabs.Tab>
      <Tabs.Tab value="settings" icon={<SettingsCog />}>Settings</Tabs.Tab>
    </Tabs>
  )
}

IconTextBadge.args = {
  size: "xl",
}

IconTextBadge.parameters = {
  controls: { include: ["size", "pill", "variant"] },
}

const BADGE_COLORS = ["secondary", "success", "danger", "info"] as const
const BADGE_VARIANTS = ["soft", "solid"] as const

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const BadgeVariants = (args: TabsProps<string> & { badgePill?: boolean }) => {
  const [softSelected, setSoftSelected] = useState("secondary")
  const [solidSelected, setSolidSelected] = useState("danger")

  const states = {
    soft: [softSelected, setSoftSelected],
    solid: [solidSelected, setSolidSelected],
  } as const

  return (
    <div className="flex flex-col justify-center gap-6 min-h-[320px]">
      {BADGE_VARIANTS.map((variant) => {
        const [selected, setSelected] = states[variant]
        return (
          <div key={variant} className="flex flex-col items-start gap-2">
            <span className="text-sm text-tertiary">{capitalize(variant)}</span>
            <Tabs
              {...args}
              value={selected}
              onChange={setSelected}
              aria-label={`Badge ${variant} variants`}
            >
              {BADGE_COLORS.map((color) => (
                <Tabs.Tab
                  key={color}
                  value={color}
                  badge={{ content: 5, color, variant, pill: args.badgePill }}
                >
                  {capitalize(color)}
                </Tabs.Tab>
              ))}
            </Tabs>
          </div>
        )
      })}
    </div>
  )
}

BadgeVariants.args = {
  size: "md",
  pill: true,
  badgePill: true,
}

BadgeVariants.parameters = {
  controls: { include: ["size", "pill", "badgePill", "variant"] },
}
