"use client"

import clsx from "clsx"
import { type ComponentProps } from "react"
import { Label as RadixLabel } from "radix-ui"
import s from "./Label.module.css"

export type LabelProps = ComponentProps<typeof RadixLabel.Root> & {
  /**
   * Marks the field as required. Renders a subtle indicator after the label text.
   */
  required?: boolean
  className?: string
}

export const Label = ({
  required = false,
  className,
  children,
  ...restProps
}: LabelProps) => {
  return (
    <RadixLabel.Root className={clsx(s.Label, className)} {...restProps}>
      {children}
      {required && (
        <span className={s.RequiredIndicator} aria-hidden="true">
          *
        </span>
      )}
    </RadixLabel.Root>
  )
}
