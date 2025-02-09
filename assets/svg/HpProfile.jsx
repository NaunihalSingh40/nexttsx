import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
)
export default SvgComponent
