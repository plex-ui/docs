import type { Meta } from "@storybook/react"
import { DateTime } from "luxon"
import { useState } from "react"
import { Field } from "../Field"
import { DateInput, type DateInputProps } from "./DateInput"

const meta = {
  title: "Components/Date Input",
  component: DateInput,
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    min: { control: false },
    max: { control: false },
  },
} satisfies Meta<typeof DateInput>

export default meta

export const Base = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

Base.args = {
  size: "md",
  variant: "outline",
  clearable: true,
}

export const WithValue = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(DateTime.local(2025, 6, 15))

  return <DateInput {...args} value={date} onChange={setDate} />
}

WithValue.args = {
  size: "md",
  clearable: true,
}

export const WithLimits = (args: DateInputProps) => {
  const today = DateTime.local()
  const [date, setDate] = useState<DateTime | null>(today)

  return (
    <DateInput
      {...args}
      value={date}
      onChange={setDate}
      min={today.minus({ days: 30 }).startOf("day")}
      max={today.plus({ days: 30 }).endOf("day")}
    />
  )
}

WithLimits.args = {
  size: "md",
  clearable: true,
}

export const USFormat = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

USFormat.args = {
  mode: "mm/dd/yyyy",
  separator: "/",
  size: "md",
  clearable: true,
}

export const ISOFormat = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

ISOFormat.args = {
  mode: "yyyy/mm/dd",
  separator: "-",
  size: "md",
  clearable: true,
}

export const WithField = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return (
    <Field label="Date of birth" description="Enter your date of birth">
      <DateInput {...args} value={date} onChange={setDate} />
    </Field>
  )
}

WithField.args = {
  size: "md",
  clearable: true,
}

export const WithFieldError = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return (
    <Field label="Date of birth" errorMessage={!date ? "Date is required" : undefined}>
      <DateInput {...args} value={date} onChange={setDate} />
    </Field>
  )
}

WithFieldError.args = {
  size: "md",
  clearable: true,
}

export const Sizes = () => {
  const sizes = ["xs", "sm", "md", "lg", "xl"] as const
  const [dates, setDates] = useState<Record<string, DateTime | null>>(
    Object.fromEntries(sizes.map((s) => [s, null])),
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {sizes.map((s) => (
        <DateInput
          key={s}
          size={s}
          value={dates[s] ?? null}
          onChange={(v) => setDates((prev) => ({ ...prev, [s]: v }))}
          clearable
        />
      ))}
    </div>
  )
}

export const Disabled = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(DateTime.local(2025, 1, 1))

  return <DateInput {...args} value={date} onChange={setDate} />
}

Disabled.args = {
  size: "md",
  disabled: true,
}

export const SoftVariant = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

SoftVariant.args = {
  size: "md",
  variant: "soft",
  clearable: true,
}

export const WithTime = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

WithTime.args = {
  timeMode: "HH:MM",
  size: "md",
  clearable: true,
}

export const WithSeconds = (args: DateInputProps) => {
  const [date, setDate] = useState<DateTime | null>(null)

  return <DateInput {...args} value={date} onChange={setDate} />
}

WithSeconds.args = {
  timeMode: "HH:MM:SS",
  size: "md",
  clearable: true,
}
