import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      stroke="#734D00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.7}
      d="M15.188 9H2.812M7.875 3.938 2.812 9l5.063 5.063"
    />
  </svg>
)
export default SvgComponent
