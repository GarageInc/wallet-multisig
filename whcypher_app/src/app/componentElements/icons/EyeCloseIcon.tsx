import * as React from 'react'

function EyeCloseIcon(props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) {
  const defaultColor = 'white'
  const color = props.color || defaultColor

  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={svgRef}
      {...props}
    >
      <path
        d="M9.27229 2.55191L8.54827 3.27593C8.99876 3.64396 9.43197 4.09251 9.85628 4.62998C8.34035 6.38914 6.60685 7.15324 4.90192 6.92228L4.02929 7.79491C4.51156 7.93101 5.00162 7.99998 5.49628 7.99998C7.42628 7.99998 9.28628 6.94998 10.8863 4.95998C11.0263 4.77998 11.0363 4.52998 10.9063 4.34998C10.3851 3.63928 9.83898 3.03944 9.27229 2.55191Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.53444 8.87554C1.33811 9.0332 1.05041 9.02096 0.868273 8.83882C0.673011 8.64356 0.673011 8.32697 0.868273 8.13171L2.12194 6.87805C1.41703 6.39129 0.741186 5.74964 0.106285 4.95998C-0.0337153 4.77998 -0.0337153 4.52998 0.0962847 4.34998C1.68628 2.15998 3.55628 0.999985 5.49628 0.999985C6.19654 0.999985 6.87888 1.15221 7.55179 1.4482L8.64645 0.353539C8.84171 0.158277 9.15829 0.158277 9.35355 0.353539C9.5357 0.53568 9.54793 0.823384 9.39027 1.01971L1.53444 8.87554ZM3.82628 2.39998C4.79173 1.98748 5.78028 1.93702 6.75138 2.24861L4.08065 4.91934C3.71999 4.5571 3.49628 4.0584 3.49628 3.50998C3.49628 3.12998 3.60628 2.74998 3.81628 2.42998C3.81628 2.41998 3.81628 2.40998 3.82628 2.39998ZM2.49628 3.50998C2.49628 4.3334 2.83249 5.0821 3.3744 5.62559L2.85295 6.14703C2.26007 5.77124 1.68398 5.26555 1.13628 4.62998C1.57628 4.05998 2.04628 3.58998 2.51628 3.20998C2.50628 3.30998 2.49628 3.40998 2.49628 3.50998Z"
        fill={color}
      />
      <path
        d="M5.31941 6.50479C5.37794 6.50824 5.43692 6.50998 5.49628 6.50998C7.14629 6.50998 8.49628 5.15998 8.49628 3.50998C8.49628 3.45383 8.48998 3.39768 8.48268 3.34152L7.00587 4.81833C6.9436 4.89003 6.87633 4.9573 6.80463 5.01957L5.31941 6.50479Z"
        fill={color}
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="8.55119e-08"
          y1="4.49998"
          x2="11"
          y2="4.49998"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.363636" stopColor="#2041E0" />
          <stop offset="0.529119" stopColor="#2549E3" />
          <stop offset="0.78054" stopColor="#345EEA" />
          <stop offset="1" stopColor="#4476F2" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="8.55119e-08"
          y1="4.49998"
          x2="11"
          y2="4.49998"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.363636" stopColor="#2041E0" />
          <stop offset="0.529119" stopColor="#2549E3" />
          <stop offset="0.78054" stopColor="#345EEA" />
          <stop offset="1" stopColor="#4476F2" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="8.55119e-08"
          y1="4.49998"
          x2="11"
          y2="4.49998"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.363636" stopColor="#2041E0" />
          <stop offset="0.529119" stopColor="#2549E3" />
          <stop offset="0.78054" stopColor="#345EEA" />
          <stop offset="1" stopColor="#4476F2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const ForwardRef = React.forwardRef(EyeCloseIcon)
const MemoForwardRef = React.memo(ForwardRef)
export default MemoForwardRef
