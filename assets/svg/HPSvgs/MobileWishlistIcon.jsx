import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      stroke="#282828"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M3.688 11.063 10 17.375l6.312-6.312a4.057 4.057 0 0 0-5.738-5.737L10 5.899l-.574-.573a4.057 4.057 0 0 0-5.738 5.737Z"
    />
  </svg>
)
export default SvgComponent
