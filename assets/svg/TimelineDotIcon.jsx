import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path fill="#B9B9B9" d="M16 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 16 0" />
    <path fill="#fff" d="M11.638 8a3.636 3.636 0 0 1-3.637 3.636A3.636 3.636 0 0 1 4.365 8a3.636 3.636 0 0 1 7.273 0" />
  </svg>
)
export default SvgComponent
