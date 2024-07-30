import * as React from 'react'

function IconBack(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      ref={svgRef}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.00012 12L10.7144 5M3.00012 12L10.7144 19M3.00012 12L21.0001 12"
        stroke="#2F41E8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(IconBack)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
