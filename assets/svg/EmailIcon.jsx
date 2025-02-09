import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4 7.237 6.2 4.65a3 3 0 0 0 3.6 0l6.2-4.65"
    />
    <rect width={18} height={14} x={3} y={5.237} stroke="#fff" strokeLinecap="round" strokeWidth={1.5} rx={2} />
  </svg>
)
export default SvgComponent
