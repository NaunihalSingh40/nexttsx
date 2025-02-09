import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <circle cx={12} cy={12} r={9} stroke="#734D00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      stroke="#734D00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 8h4a2 2 0 0 1 2 2v1.143a2 2 0 0 1-2 2H9.333l4 3.857M8 8h8M10 10.572h6"
    />
  </svg>
)
export default SvgComponent
