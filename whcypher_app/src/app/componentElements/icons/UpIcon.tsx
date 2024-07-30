import * as React from 'react'

import { COLORS } from '../Colors'

interface IProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

function UpIcon(props: IProps, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      {...props}
      ref={svgRef}
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 0L0.803848 6H11.1962L6 0Z" fill={COLORS.palette.blue} />
    </svg>
  )
}

const ForwardRef = React.forwardRef(UpIcon)
const MemoForwardRef = React.memo(ForwardRef)

export default MemoForwardRef
