import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={11} fill="none" {...props}>
    <path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.9}
      d="M1.898 5.5h6.6M5.203 2.2v6.6"
    />
  </svg>
)
export default SvgComponent
