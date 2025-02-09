import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#115469"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m12.8 15.6-5.035-5.034a.8.8 0 0 1 0-1.132L12.799 4.4"
    />
  </svg>
)
export default SvgComponent
