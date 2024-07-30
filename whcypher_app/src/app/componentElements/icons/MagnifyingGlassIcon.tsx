import * as React from 'react'

function MagnifyingGlassIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  const color = 'white'

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M22.5 5C32.15 5 40 12.85 40 22.5C40 26.4 38.65 30.15 36.1 33.35L34.9 34.9L33.35 36.1C30.15 38.65 26.4 40 22.5 40C12.85 40 5 32.15 5 22.5C5 12.85 12.85 5 22.5 5ZM22.5 0C10.05 0 0 10.05 0 22.5C0 34.95 10.05 45 22.5 45C27.8 45 32.6 43.1 36.45 40L45.7 49.25C46.2 49.75 46.85 50 47.5 50C48.15 50 48.8 49.75 49.25 49.25C50.25 48.25 50.25 46.7 49.25 45.7L40 36.45C43.1 32.6 45 27.8 45 22.5C45 10.05 34.95 0 22.5 0Z"
        fill={color || '#fff'}
      />
    </svg>
  )
}

const ForwardRef = React.forwardRef(MagnifyingGlassIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
