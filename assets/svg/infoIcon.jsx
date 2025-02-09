import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#686868"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10 11.666a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333Zm0 0c-3.682 0-6.667 2.239-6.667 5m6.667-5c3.682 0 6.667 2.239 6.667 5"
    />
  </svg>
)
export default SvgComponent
