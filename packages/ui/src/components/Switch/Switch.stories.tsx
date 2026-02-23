import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Switch, type SwitchProps } from "./"

const meta: Meta<SwitchProps> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    label: { control: "text" },
    description: { control: "text" },
    onCheckedChange: { control: false },
    className: { control: false },
    id: { control: false },
    name: { control: false },
    value: { control: false },
    onBlur: { control: false },
    onFocus: { control: false },
  },
} satisfies Meta<typeof Switch>

export default meta

export const Base = (args: SwitchProps) => <Switch {...args} />

export const WithLabel = (args: SwitchProps) => <Switch {...args} />
WithLabel.args = {
  label: "Notifications",
}

export const LabelPositionStart = (args: SwitchProps) => <Switch {...args} />
LabelPositionStart.args = {
  label: "Right aligned",
  labelPosition: "start",
}

export const Disabled = (args: SwitchProps) => (
  <div className="flex gap-6">
    <Switch {...args} />
    <Switch {...args} checked />
  </div>
)
Disabled.args = {
  disabled: true,
}

export const DefaultChecked = (args: SwitchProps) => <Switch {...args} />
DefaultChecked.args = {
  name: "field-set-as-default",
  defaultChecked: true,
}

export const WithDescription = (args: SwitchProps) => <Switch {...args} />
WithDescription.args = {
  label: "Disable user API keys",
  description: "Disable user-based API keys across your entire organization.",
}

export const SettingsPanel = () => (
  <div className="flex w-full max-w-lg flex-col gap-6">
    <Switch
      label="Enable custom providers for evals"
      description="Allow eval runs to use third-party models you configure under Custom model providers."
    />
    <Switch
      label="Enable OpenRouter models"
      description="Make OpenRouter models available for evaluation runs."
    />
    <Switch
      label="Disable user API keys"
      description="Disable user-based API keys across your entire organization."
      defaultChecked
    />
  </div>
)

export const Controlled = () => {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}

Controlled.parameters = {
  docs: {
    source: {
      code: `const [checked, setChecked] = useState(false)

<Switch checked={checked} onCheckedChange={setChecked} />`,
    },
  },
}
