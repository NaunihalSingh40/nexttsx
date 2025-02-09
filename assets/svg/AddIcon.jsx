import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#734D00"
      d="M6 9.4a.6.6 0 0 0 0 1.2V9.4Zm8 1.2a.6.6 0 1 0 0-1.2v1.2ZM10.6 6a.6.6 0 1 0-1.2 0h1.2Zm-1.2 8a.6.6 0 1 0 1.2 0H9.4ZM6 10.6h4V9.4H6v1.2Zm4 0h4V9.4h-4v1.2ZM9.4 6v4h1.2V6H9.4Zm0 4v4h1.2v-4H9.4Z"
    />
  </svg>
)
export default SvgComponent
