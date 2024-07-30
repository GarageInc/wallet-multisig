import * as React from 'react'

function Icon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M8.5 2C5.182 2 2.5 4.682 2.5 8C2.5 11.318 5.182 14 8.5 14C11.818 14 14.5 11.318 14.5 8C14.5 4.682 11.818 2 8.5 2ZM11.077 9.731C11.3106 9.96462 11.3106 10.3434 11.077 10.577C10.8434 10.8106 10.4646 10.8106 10.231 10.577L8.5 8.846L6.769 10.577C6.53538 10.8106 6.15662 10.8106 5.923 10.577C5.68938 10.3434 5.68938 9.96462 5.923 9.731L7.654 8L5.923 6.269C5.68938 6.03538 5.68938 5.65662 5.923 5.423C6.15662 5.18938 6.53538 5.18938 6.769 5.423L8.5 7.154L10.231 5.423C10.4646 5.18938 10.8434 5.18938 11.077 5.423C11.3106 5.65662 11.3106 6.03538 11.077 6.269L9.346 8L11.077 9.731Z"
        fill="#848C97"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(Icon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
