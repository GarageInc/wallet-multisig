import * as React from 'react'
import { COLORS } from 'src/app/componentElements/Colors'

function CheckIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  return (
    <svg
      ref={svgRef}
      {...props}
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.08471 9.46756L1.92244 6.35658C1.57205 6.01187 1.01027 6.01088 0.658662 6.35435C0.297031 6.70761 0.296004 7.28897 0.656385 7.6435L4.3834 11.3101C4.77256 11.6929 5.39685 11.6929 5.78601 11.3101L15.3481 1.90308C15.7064 1.55059 15.7064 0.972899 15.3481 0.620408C14.9981 0.276091 14.4367 0.275958 14.0865 0.62011L5.08471 9.46756Z"
        fill={COLORS.palette.blue}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(CheckIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
