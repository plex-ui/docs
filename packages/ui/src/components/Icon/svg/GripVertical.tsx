import type { SVGProps } from "react"
const GripVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <circle cx="9" cy="7" r="1.5" />
    <circle cx="15" cy="7" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="17" r="1.5" />
    <circle cx="15" cy="17" r="1.5" />
  </svg>
)
GripVertical.displayName = "GripVertical"
export default GripVertical
