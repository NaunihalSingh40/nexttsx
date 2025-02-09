import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={41} height={40} fill="none" {...props}>
    <rect width={40} height={40} x={0.376} fill="#E7EEF0" rx={8} />
    <path fill="#608C9B" d="M20.34 30a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h.07a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1h-.07Z" />
    <path fill="#608C9B" d="M10.376 19.965a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v.07a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1v-.07Z" />
  </svg>
)
export default SvgComponent
