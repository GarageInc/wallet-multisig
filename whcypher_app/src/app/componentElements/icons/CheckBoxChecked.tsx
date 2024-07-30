import * as React from 'react'

import { COLORS } from '../Colors'

function CheckboxChecked(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
      <g clipPath="url(#clip0_541_4274)">
        <rect x="0.5" y="1" width="19" height="19" rx="3.5" stroke={COLORS.palette.blue} />
        <g clipPath="url(#clip1_541_4274)">
          <path
            d="M8.27416 13.5332L5.71801 10.954C5.42813 10.6615 4.95563 10.6607 4.66472 10.9522C4.37603 11.2414 4.37521 11.7095 4.66287 11.9997L7.56389 14.9269C7.95513 15.3216 8.59319 15.3216 8.98443 14.9269L16.6264 7.21615C16.9123 6.92758 16.9123 6.46244 16.6264 6.17387C16.3368 5.88172 15.8646 5.88161 15.5749 6.17362L8.27416 13.5332Z"
            fill="#2F41E8"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_541_4274">
          <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
        </clipPath>
        <clipPath id="clip1_541_4274">
          <rect width="11.4286" height="11.4286" fill="white" transform="translate(4.28572 4.78613)" />
        </clipPath>
      </defs>
    </svg>
  )
}

const ForwardRef = React.forwardRef(CheckboxChecked)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
