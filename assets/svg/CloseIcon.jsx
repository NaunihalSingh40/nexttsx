import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props}>
    <path stroke="#3C4242" strokeLinecap="round" strokeWidth={1.5} d="M18 4 4 18m14 0L4 4" />
  </svg>
)
export default SvgComponent
