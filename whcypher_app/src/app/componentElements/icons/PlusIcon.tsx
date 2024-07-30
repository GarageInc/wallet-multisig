import * as React from 'react'

function PlusIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      {...props}
      ref={svgRef}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.50001 2C5.18621 2 2.50001 4.6862 2.50001 8C2.50001 11.3138 5.18621 14 8.50001 14C11.8138 14 14.5 11.3138 14.5 8C14.5 4.6862 11.8138 2 8.50001 2ZM11.5 8.6H9.10001V11H7.90001V8.6H5.50001V7.4H7.90001V5H9.10001V7.4H11.5V8.6Z"
        fill="#2F41E8"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(PlusIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
