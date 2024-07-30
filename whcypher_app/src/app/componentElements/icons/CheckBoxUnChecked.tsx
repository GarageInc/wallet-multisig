import * as React from 'react'

import { COLORS } from '../Colors'

function CheckboxUnchecked(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <g clipPath="url(#clip0_541_3891)">
        <rect x="0.5" y="1" width="19" height="19" rx="3.5" stroke={COLORS.palette.darkGrey} />
      </g>
      <defs>
        <clipPath id="clip0_541_3891">
          <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

const ForwardRef = React.forwardRef(CheckboxUnchecked)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
