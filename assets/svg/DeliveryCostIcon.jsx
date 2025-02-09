import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <circle cx={12} cy={10} r={3} stroke="#734D00" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      stroke="#734D00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9.75C19 15.375 12 21 12 21S5 15.375 5 9.75C5 6.022 8.134 3 12 3s7 3.022 7 6.75Z"
    />
  </svg>
)
export default SvgComponent
