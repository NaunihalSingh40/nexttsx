import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 3h1.371A2 2 0 0 1 6.33 4.595l2.34 11.31a2 2 0 0 0 1.959 1.595H17.5"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.824 7h12.85a1 1 0 0 1 .962 1.275l-1.014 3.55A3 3 0 0 1 16.737 14h-8.46"
    />
    <circle
      cx={16.5}
      cy={20.5}
      r={0.5}
      fill="#000"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <circle
      cx={0.5}
      cy={0.5}
      r={0.5}
      fill="#000"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="matrix(1 0 0 -1 10 21)"
    />
  </svg>
)
export default SvgComponent
