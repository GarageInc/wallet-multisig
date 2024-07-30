import * as React from 'react'

function IconSend(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
      <rect width="32" height="32" rx="16" fill="#2F41E8" />
      <path
        d="M14.6569 17.8284L17.4853 23.4853L21.7279 10.7574L9 15L14.6569 17.8284ZM14.6569 17.8284L17.4853 15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(IconSend)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
