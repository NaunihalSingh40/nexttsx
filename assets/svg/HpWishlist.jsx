import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.426 12.312 12 19.885l7.574-7.574a4.869 4.869 0 0 0-6.886-6.885L12 6.115l-.688-.689a4.869 4.869 0 0 0-6.886 6.886Z"
    />
  </svg>
)
export default SvgComponent
