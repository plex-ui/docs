import { type Meta } from "@storybook/react"
import { Separator, type SeparatorProps } from "./Separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>

export default meta

export const Horizontal = (args: SeparatorProps) => (
  <div style={{ maxWidth: 360 }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Plex UI</div>
      <div style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
        Design system for ambitious product teams.
      </div>
    </div>
    <Separator style={{ margin: "16px 0" }} {...args} />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 14,
      }}
    >
      <span>Blog</span>
      <Separator orientation="vertical" style={{ height: 16 }} />
      <span>Docs</span>
      <Separator orientation="vertical" style={{ height: 16 }} />
      <span>Source</span>
    </div>
  </div>
)

export const Vertical = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      fontSize: 14,
    }}
  >
    <span>One</span>
    <Separator orientation="vertical" style={{ height: 20 }} />
    <span>Two</span>
    <Separator orientation="vertical" style={{ height: 20 }} />
    <span>Three</span>
  </div>
)
