"use client"

import clsx from "clsx"
import { type ComponentProps, type HTMLAttributes, type Ref } from "react"
import { Separator } from "../Separator"
import s from "./ButtonGroup.module.css"

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

export type ButtonGroupOrientation = "horizontal" | "vertical"

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Direction of the joined buttons.
   * @default "horizontal"
   */
  orientation?: ButtonGroupOrientation
  className?: string
  ref?: Ref<HTMLDivElement>
}

const ButtonGroupRoot = ({
  orientation = "horizontal",
  className,
  ref,
  ...restProps
}: ButtonGroupProps) => (
  <div
    ref={ref}
    role="group"
    data-slot="button-group"
    data-orientation={orientation}
    className={clsx(s.Root, className)}
    {...restProps}
  />
)

/* ------------------------------------------------------------------ */
/*  Separator — thin divider between items                             */
/* ------------------------------------------------------------------ */

export type ButtonGroupSeparatorProps = Omit<
  ComponentProps<typeof Separator>,
  "orientation"
> & {
  /**
   * When omitted, flips to match the surrounding ButtonGroup axis.
   * Pass explicitly to override (rare).
   */
  orientation?: ButtonGroupOrientation
}

const ButtonGroupSeparator = ({
  className,
  orientation,
  ...restProps
}: ButtonGroupSeparatorProps) => (
  <Separator
    data-slot="button-group-separator"
    orientation={orientation ?? "vertical"}
    className={clsx(s.Separator, className)}
    {...restProps}
  />
)

/* ------------------------------------------------------------------ */
/*  Export — compound API                                              */
/* ------------------------------------------------------------------ */

type ButtonGroupComponent = typeof ButtonGroupRoot & {
  Separator: typeof ButtonGroupSeparator
}

export const ButtonGroup = ButtonGroupRoot as ButtonGroupComponent
ButtonGroup.Separator = ButtonGroupSeparator
