import * as React from 'react'

function CrossIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  const color = props.color || 'white'

  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M5.175 4.475l3.6-3.6c.2-.2.2-.5 0-.7-.1-.2-.5-.2-.6 0l-3.7 3.6-3.6-3.7c-.2-.1-.6-.1-.8 0-.1.2-.1.6 0 .8l3.7 3.7-3.6 3.6c-.2.1-.2.5 0 .7.2.2.5.2.7 0l3.6-3.6 3.6 3.6c.2.1.6.1.8 0 .1-.2.1-.6 0-.8l-3.7-3.6z"
        fill="url(#cross_svg__paint0_linear)"
      />
      <defs>
        <linearGradient
          id="cross_svg__paint0_linear"
          x1={-0.025}
          y1={4.478}
          x2={8.981}
          y2={4.478}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.364} stopColor={color || '#2041E0'} />
          <stop offset={0.529} stopColor={color || '#2549E3'} />
          <stop offset={0.781} stopColor={color || '#345EEA'} />
          <stop offset={1} stopColor={color || '#4476F2'} />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ForwardRef = React.forwardRef(CrossIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
