import * as React from 'react'

import { COLORS } from '../Colors'

function InfoIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  const color = props.color || COLORS.palette.darkGrey

  return (
    <svg
      ref={svgRef}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect width="32" height="32" rx="16" fill={color} />
      <path
        d="M16.0667 14.5V22M16.1333 10V10.15H16V10H16.1333Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(InfoIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
