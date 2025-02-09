import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <path
      stroke="#B5CAD1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.333}
      d="M3.5 3.5h1.6c1.106 0 2.06.777 2.285 1.86l2.73 13.196a2.333 2.333 0 0 0 2.285 1.86h8.017"
    />
    <path
      stroke="#B5CAD1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.333}
      d="M7.962 8.166h14.991c.775 0 1.335.742 1.122 1.488l-1.183 4.14a3.5 3.5 0 0 1-3.365 2.54h-9.87"
    />
    <circle
      cx={19.25}
      cy={23.917}
      r={0.583}
      fill="#B5CAD1"
      stroke="#B5CAD1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.333}
    />
    <circle
      cx={0.583}
      cy={0.583}
      r={0.583}
      fill="#B5CAD1"
      stroke="#B5CAD1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.333}
      transform="matrix(1 0 0 -1 11.667 24.5)"
    />
  </svg>
)
export default SvgComponent
