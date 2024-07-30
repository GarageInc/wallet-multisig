import * as React from 'react'
import { SVGUniqueID } from 'react-svg-unique-id'

function LeftArrowIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <SVGUniqueID>
      <svg
        width="4"
        height="7"
        viewBox="0 0 4 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <path
          d="M3.5.5l-3 3 3 3"
          stroke="url(#left_arrow_svg__paint0_linear)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="left_arrow_svg__paint0_linear"
            x1={0.895}
            y1={1.605}
            x2={4.207}
            y2={3.084}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset={0.408} stopColor="#2041E0" />
            <stop offset={1} stopColor="#4476F2" />
          </linearGradient>
        </defs>
      </svg>
    </SVGUniqueID>
  )
}

const ForwardRef = React.forwardRef(LeftArrowIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
