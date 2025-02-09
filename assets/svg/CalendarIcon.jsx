import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#734D00"
      strokeLinecap="round"
      strokeWidth={2}
      d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3m16 0v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9m16 0H4m4-7v4m8-4v4"
    />
    <rect width={5} height={5} x={6} y={12} fill="#734D00" rx={1} />
  </svg>
)
export default SvgComponent
