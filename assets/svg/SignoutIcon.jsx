import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props}>
    <path
      stroke="#686868"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.667 15.583 19.25 11m0 0-4.583-4.583M19.25 11h-11m0-8.25h-1.1c-1.54 0-2.31 0-2.898.3A2.75 2.75 0 0 0 3.05 4.252c-.3.588-.3 1.358-.3 2.898v7.7c0 1.54 0 2.31.3 2.899a2.75 2.75 0 0 0 1.202 1.201c.588.3 1.358.3 2.898.3h1.1"
    />
  </svg>
)
export default SvgComponent
