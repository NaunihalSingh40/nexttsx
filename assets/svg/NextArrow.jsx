import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      stroke="#115469"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m8.373 4.897 5.034 5.035a.8.8 0 0 1 0 1.131l-5.034 5.034"
    />
  </svg>
)
export default SvgComponent
