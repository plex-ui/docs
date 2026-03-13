"use client"

import type { CellContext } from "@tanstack/react-table"
import { Badge } from "../Badge"
import { CopyTooltip } from "../Tooltip"
import { Tooltip } from "../Tooltip"

export function idCell<T>(accessor: (row: T) => string) {
  function IdCell({ row }: CellContext<T, unknown>) {
    const value = accessor(row.original)
    return (
      <CopyTooltip copyValue={value}>
        <span
          style={{
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            color: "var(--color-text-secondary)",
            cursor: "pointer",
          }}
        >
          {value}
        </span>
      </CopyTooltip>
    )
  }
  IdCell.displayName = "IdCell"
  return IdCell
}

export function dateTimeCell<T>(
  accessor: (row: T) => string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  const fmt = new Intl.DateTimeFormat("en-US", options ?? defaultOptions)

  function DateTimeCell({ row }: CellContext<T, unknown>) {
    const val = accessor(row.original)
    return <span style={{ color: "var(--color-text-secondary)" }}>{val ? fmt.format(new Date(val)) : "—"}</span>
  }
  DateTimeCell.displayName = "DateTimeCell"
  return DateTimeCell
}

export function statusCell<T>(
  accessor: (row: T) => string,
  colorMap?: Record<
    string,
    "secondary" | "success" | "danger" | "warning" | "info" | "discovery" | "caution"
  >,
) {
  const defaultColorMap: Record<
    string,
    "secondary" | "success" | "danger" | "warning" | "info" | "discovery" | "caution"
  > = {
    active: "success",
    completed: "success",
    paid: "success",
    pending: "warning",
    processing: "info",
    inactive: "secondary",
    cancelled: "danger",
    failed: "danger",
    unpaid: "danger",
  }

  function StatusCell({ row }: CellContext<T, unknown>) {
    const status = accessor(row.original)
    const map = colorMap ?? defaultColorMap
    const color = map[status.toLowerCase()] ?? "secondary"
    return (
      <Badge color={color} variant="soft">
        {status}
      </Badge>
    )
  }
  StatusCell.displayName = "StatusCell"
  return StatusCell
}

export function tooltipHeader(label: string, description: string) {
  function TooltipHeader() {
    return (
      <Tooltip content={description} side="bottom" maxWidth={260}>
        <span style={{ cursor: "help", borderBottom: "1px dashed currentColor" }}>{label}</span>
      </Tooltip>
    )
  }
  TooltipHeader.displayName = "TooltipHeader"
  return TooltipHeader
}
