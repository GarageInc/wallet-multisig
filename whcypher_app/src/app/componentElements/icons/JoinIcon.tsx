import * as React from 'react'

function JoinIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
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
        d="M8.5 11.8267C9.60457 11.8267 10.5 10.1134 10.5 8.00001C10.5 5.8866 9.60457 4.17334 8.5 4.17334C7.39543 4.17334 6.5 5.8866 6.5 8.00001C6.5 10.1134 7.39543 11.8267 8.5 11.8267Z"
        fill="#2F41E8"
      />
      <path
        d="M5.5 7.99992C5.5 7.35325 5.65333 5.22659 7.52 3.66659C7 3.45992 6.43333 3.33325 5.83333 3.33325C3.26 3.33325 1.16666 5.42659 1.16666 7.99992C1.16666 10.5733 3.26 12.6666 5.83333 12.6666C6.43333 12.6666 7 12.5399 7.52 12.3333C5.65333 10.7733 5.5 8.64659 5.5 7.99992ZM11.1667 3.33325C10.5667 3.33325 10 3.45992 9.48 3.66659C11.3467 5.22659 11.5 7.35325 11.5 7.99992C11.5 8.64659 11.3467 10.7733 9.48 12.3333C10 12.5399 10.5667 12.6666 11.1667 12.6666C13.74 12.6666 15.8333 10.5733 15.8333 7.99992C15.8333 5.42659 13.74 3.33325 11.1667 3.33325Z"
        fill="#2F41E8"
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(JoinIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
