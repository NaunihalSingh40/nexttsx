import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M4.166 17.47v-.833a4.167 4.167 0 0 1 4.167-4.167h3.333a4.167 4.167 0 0 1 4.167 4.167v.833m-2.5-10.833a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0Z"
    />
  </svg>
)
export default SvgComponent
