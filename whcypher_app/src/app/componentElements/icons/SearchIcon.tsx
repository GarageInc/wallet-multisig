import * as React from 'react'

function SearchIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  const defaultColor = 'white'
  const color = props.color || defaultColor

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M7.4 3.2C9.716 3.2 11.6 5.084 11.6 7.4C11.6 8.336 11.276 9.236 10.664 10.004L10.376 10.376L10.004 10.664C9.236 11.276 8.336 11.6 7.4 11.6C5.084 11.6 3.2 9.716 3.2 7.4C3.2 5.084 5.084 3.2 7.4 3.2ZM7.4 2C4.412 2 2 4.412 2 7.4C2 10.388 4.412 12.8 7.4 12.8C8.672 12.8 9.824 12.344 10.748 11.6L12.968 13.82C13.088 13.94 13.244 14 13.4 14C13.556 14 13.712 13.94 13.82 13.82C14.06 13.58 14.06 13.208 13.82 12.968L11.6 10.748C12.344 9.824 12.8 8.672 12.8 7.4C12.8 4.412 10.388 2 7.4 2Z"
        fill={color}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(SearchIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
