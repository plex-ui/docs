import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Input } from "../Input"
import { Textarea } from "../Textarea"
import { Select } from "../Select"
import { Checkbox } from "../Checkbox"
import { Field, type FieldProps } from "./"

const meta = {
  title: "Components/Field",
  component: Field,
  args: {
    label: "Email",
    size: "md",
    required: false,
    orientation: "vertical",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
} satisfies Meta<typeof Field>

export default meta

export const Base = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      <Input placeholder="Enter email..." />
    </Field>
  </div>
)

export const WithDescription = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      <Input placeholder="Enter email..." />
    </Field>
  </div>
)

WithDescription.args = {
  label: "Email",
  description: "We'll never share your email with anyone else.",
}

export const WithError = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      <Input placeholder="Enter email..." />
    </Field>
  </div>
)

WithError.args = {
  label: "Email",
  errorMessage: "Email is required",
}

export const Required = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      <Input placeholder="Enter email..." />
    </Field>
  </div>
)

Required.args = {
  label: "Email",
  required: true,
}

export const Sizes = (args: FieldProps) => (
  <div className="flex flex-col gap-6 w-[320px]">
    {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
      <Field key={size} {...args} size={size} label={`Label (${size})`}>
        <Input placeholder="Enter text..." size={size} />
      </Field>
    ))}
  </div>
)

Sizes.args = {
  description: "Helper text scales with size",
}

Sizes.parameters = {
  controls: { include: [] },
}

export const HorizontalOrientation = (args: FieldProps) => (
  <div className="w-[480px]">
    <div className="flex flex-col gap-4">
      <Field {...args} label="First name">
        <Input placeholder="Jane" />
      </Field>
      <Field {...args} label="Last name">
        <Input placeholder="Doe" />
      </Field>
      <Field {...args} label="Bio">
        <Textarea placeholder="Tell us about yourself..." rows={3} />
      </Field>
    </div>
  </div>
)

HorizontalOrientation.args = {
  orientation: "horizontal",
}

HorizontalOrientation.parameters = {
  controls: { include: ["orientation", "size"] },
}

export const WithTextarea = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      <Textarea placeholder="Tell us more..." rows={3} />
    </Field>
  </div>
)

WithTextarea.args = {
  label: "Bio",
  description: "Write a short bio for your profile.",
}

export const WithSelect = (args: FieldProps) => {
  const [role, setRole] = useState("")
  return (
    <div className="w-[320px]">
      <Field {...args}>
        {(fieldProps) => (
          <Select
            id={fieldProps.id}
            placeholder="Select a role..."
            value={role}
            onChange={(opt) => setRole(opt.value)}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ]}
          />
        )}
      </Field>
    </div>
  )
}

WithSelect.args = {
  label: "Role",
  description: "Select your primary role.",
}

export const RenderProp = (args: FieldProps) => (
  <div className="w-[320px]">
    <Field {...args}>
      {(fieldProps) => <Input {...fieldProps} placeholder="Enter email..." />}
    </Field>
  </div>
)

RenderProp.args = {
  label: "Email (render prop)",
  description: "Using the function children pattern for explicit prop passing.",
}

export const FormExample = () => {
  const [role, setRole] = useState("")
  return (
    <div className="w-[400px] flex flex-col gap-5">
      <Field label="Full name" required>
        <Input placeholder="Jane Doe" />
      </Field>
      <Field label="Email" required errorMessage="Email is required">
        <Input placeholder="jane@example.com" />
      </Field>
      <Field label="Role" description="Select your primary role.">
        {(fieldProps) => (
          <Select
            id={fieldProps.id}
            placeholder="Select a role..."
            value={role}
            onChange={(opt) => setRole(opt.value)}
            options={[
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Viewer", value: "viewer" },
            ]}
          />
        )}
      </Field>
      <Field label="Bio">
        <Textarea placeholder="Tell us about yourself..." rows={3} />
      </Field>
      <Field label="Notifications">
        <Checkbox label="Receive email notifications" />
      </Field>
    </div>
  )
}

FormExample.parameters = {
  controls: { include: [] },
}
