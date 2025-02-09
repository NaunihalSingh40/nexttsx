import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} fill="none" {...props}>
    <rect width={44} height={44} fill="#F4F4F4" rx={22} />
    <rect width={43} height={43} x={0.5} y={0.5} stroke="#734D00" strokeOpacity={0.1} rx={21.5} />
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 30v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1m-3-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
)
export default SvgComponent
