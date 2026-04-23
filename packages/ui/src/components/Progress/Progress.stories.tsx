import { useEffect, useState } from "react"
import { type Meta } from "@storybook/react"
import { Progress, type ProgressProps } from "./Progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta

export const Basic = (args: ProgressProps) => (
  <div style={{ maxWidth: 320 }}>
    <Progress value={66} {...args} />
  </div>
)

export const Animated = () => {
  const [value, setValue] = useState(13)
  useEffect(() => {
    const t = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(t)
  }, [])
  return (
    <div style={{ maxWidth: 320 }}>
      <Progress value={value} />
    </div>
  )
}

export const Indeterminate = () => (
  <div style={{ maxWidth: 320 }}>
    <Progress value={null} />
  </div>
)

export const Zero = () => (
  <div style={{ maxWidth: 320 }}>
    <Progress value={0} />
  </div>
)

export const Complete = () => (
  <div style={{ maxWidth: 320 }}>
    <Progress value={100} />
  </div>
)
