import { type Meta } from "@storybook/react"
import { Label, type LabelProps } from "./Label"

const meta = {
  title: "Components/Label",
  component: Label,
} satisfies Meta<typeof Label>

export default meta

export const Basic = (args: LabelProps) => (
  <Label {...args} htmlFor="basic-input">
    Workspace name
  </Label>
)

export const WithCheckbox = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <input type="checkbox" id="story-terms" />
    <Label htmlFor="story-terms">Accept terms and conditions</Label>
  </div>
)

export const Disabled = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <Label htmlFor="story-disabled-input" data-disabled>
      Locked field
    </Label>
    <input id="story-disabled-input" disabled />
  </div>
)
