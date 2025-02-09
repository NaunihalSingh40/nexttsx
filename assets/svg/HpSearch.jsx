import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#000"
      d="M17.964 19.236a.9.9 0 1 0 1.273-1.272l-1.273 1.273ZM14.7 8.6a6.1 6.1 0 0 1-6.1 6.1v1.8a7.9 7.9 0 0 0 7.9-7.9h-1.8Zm-6.1 6.1a6.1 6.1 0 0 1-6.1-6.1H.7a7.9 7.9 0 0 0 7.9 7.9v-1.8ZM2.5 8.6a6.1 6.1 0 0 1 6.1-6.1V.7A7.9 7.9 0 0 0 .7 8.6h1.8Zm6.1-6.1a6.1 6.1 0 0 1 6.1 6.1h1.8A7.9 7.9 0 0 0 8.6.7v1.8Zm4.364 11.736 5 5 1.273-1.272-5-5-1.273 1.272Z"
    />
  </svg>
)
export default SvgComponent
