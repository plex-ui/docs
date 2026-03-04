import { type Meta } from "@storybook/react"
import React, { useState } from "react"
import { FloatingLabelSelect, type FloatingLabelSelectProps } from "./"

const meta = {
  title: "Components/Floating Label Select",
  component: FloatingLabelSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Country",
    disabled: false,
    invalid: false,
  },
  argTypes: {
    label: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    selected: { control: "boolean" },
    open: { control: "boolean" },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof FloatingLabelSelect>

export default meta

export const Base = (args: FloatingLabelSelectProps) => (
  <div className="w-[360px]">
    <FloatingLabelSelect {...args} />
  </div>
)

export const Selected = (args: FloatingLabelSelectProps) => (
  <div className="w-[360px]">
    <FloatingLabelSelect {...args} selected>
      United States
    </FloatingLabelSelect>
  </div>
)

Selected.args = {
  label: "Country",
}

export const WithError = (args: FloatingLabelSelectProps) => (
  <div className="w-[360px]">
    <FloatingLabelSelect {...args} />
  </div>
)

WithError.args = {
  label: "Country",
  selected: true,
  children: "United States",
  invalid: true,
  errorMessage: "Please select a different country.",
}

export const WithClearButton = () => {
  const [value, setValue] = useState<string | null>("United States")

  return (
    <div className="w-[360px]">
      <FloatingLabelSelect
        label="Country"
        selected={!!value}
        onClearClick={() => setValue(null)}
        onInteract={() => {}}
      >
        {value}
      </FloatingLabelSelect>
    </div>
  )
}

WithClearButton.parameters = {
  controls: { disable: true },
}

export const Disabled = (args: FloatingLabelSelectProps) => (
  <div className="w-[360px]">
    <FloatingLabelSelect {...args} />
  </div>
)

Disabled.args = {
  label: "Country",
  selected: true,
  children: "United States",
  disabled: true,
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
}

const STATE_LABELS = ["Empty", "Selected", "Invalid", "Disabled"] as const

export const States = () => (
  <div className="pt-1 pb-6 px-8 w-fit min-w-full max-w-[500px] mx-auto">
    <RowMatrix
      rowLabels={STATE_LABELS}
      renderRow={(index) => {
        switch (index) {
          case 0:
            return <FloatingLabelSelect label="Country" className="w-[320px]" />
          case 1:
            return (
              <FloatingLabelSelect label="Country" selected className="w-[320px]">
                United States
              </FloatingLabelSelect>
            )
          case 2:
            return (
              <FloatingLabelSelect
                label="Country"
                selected
                invalid
                errorMessage="Please select a different country."
                className="w-[320px]"
              >
                United States
              </FloatingLabelSelect>
            )
          case 3:
            return (
              <FloatingLabelSelect label="Country" selected disabled className="w-[320px]">
                United States
              </FloatingLabelSelect>
            )
          default:
            return null
        }
      }}
    />
  </div>
)

States.parameters = {
  controls: { disable: true },
}

const RowMatrix = ({
  rowLabels,
  renderRow,
}: {
  rowLabels: Readonly<string[]>
  renderRow: (rowIndex: number) => React.ReactNode
}) => (
  <div className="flex flex-col gap-8">
    {rowLabels.map((label, index) => (
      <div key={index} className="flex items-center">
        <div className="text-right text-tertiary text-sm mr-8 min-w-[5rem]">{label}</div>
        <div className="flex-1">{renderRow(index)}</div>
      </div>
    ))}
  </div>
)
