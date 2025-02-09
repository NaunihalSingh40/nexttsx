import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <rect width={44} height={44} fill="#F4F4F4" rx={22} />
    <rect
      width={43}
      height={43}
      x={0.5}
      y={0.5}
      stroke="#734D00"
      strokeOpacity={0.1}
      rx={21.5}
    />
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13 13h1.371a2 2 0 0 1 1.959 1.595l2.34 11.31a2 2 0 0 0 1.959 1.595H27.5"
    />
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.824 17h12.85a1 1 0 0 1 .962 1.275l-1.014 3.55A3 3 0 0 1 26.737 24h-8.46"
    />
    <circle
      cx={26.5}
      cy={30.5}
      r={0.5}
      fill="#1A1A1A"
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      fill="#1A1A1A"
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="matrix(1 0 0 -1 20 31)"
    />
  </svg>
)
export default SvgComponent
