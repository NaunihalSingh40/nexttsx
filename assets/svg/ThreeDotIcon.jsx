import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <path
      stroke="#979797"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.15 4h-7M10.15 4h-7M21.15 12h-9M8.15 12h-5M21.15 20h-5M12.15 20h-9M14.15 2v4M8.15 10v4M16.15 18v4"
    />
  </svg>
)
export default SvgComponent
