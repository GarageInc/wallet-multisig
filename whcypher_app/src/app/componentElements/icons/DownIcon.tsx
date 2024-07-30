import * as React from 'react'

import { COLORS } from '../Colors'

interface IProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

function DownIcon(props: IProps, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      {...props}
      ref={svgRef}
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 12.5L2.80385 6.5L13.1962 6.5L8 12.5Z" fill={props.color || COLORS.palette.blue} />
    </svg>
  )
}

const ForwardRef = React.forwardRef(DownIcon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
