import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      stroke="#929FA5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.375 2.625-6.75 6.75M9.375 9.375l-6.75-6.75"
    />
  </svg>
)
export default SvgComponent
