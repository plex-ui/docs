import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Checkbox, type CheckboxProps } from "./"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  args: {
    disabled: false,
    defaultChecked: false,
    pill: false,
    variant: "solid",
  },
} satisfies Meta<typeof Checkbox>

export default meta

export const Base = (args: CheckboxProps) => <Checkbox {...args} />

Base.args = {
  label: "Same as billing address",
}

export const Pill = (args: CheckboxProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Checkbox {...args} label="Unchecked" />
    <Checkbox {...args} label="Checked" defaultChecked />
    <Checkbox {...args} label="Indeterminate" checked="indeterminate" />
  </div>
)

Pill.args = {
  pill: true,
}

export const Ghost = (args: CheckboxProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Checkbox {...args} label="Unchecked" />
    <Checkbox {...args} label="Checked" defaultChecked />
    <Checkbox {...args} label="Indeterminate" checked="indeterminate" />
  </div>
)

Ghost.args = {
  variant: "ghost",
}

export const Indeterminate = (args: CheckboxProps) => {
  const [checked, setChecked] = useState<CheckboxProps["checked"]>("indeterminate")

  return (
    <Checkbox
      {...args}
      checked={checked}
      onCheckedChange={() => {
        setChecked((c) => (c === "indeterminate" ? true : c ? false : "indeterminate"))
      }}
    />
  )
}

Indeterminate.args = {
  checked: "indeterminate",
}

Indeterminate.parameters = {
  docs: {
    source: {
      code: `<Checkbox
  checked="indeterminate"
/>`,
    },
  },
}
