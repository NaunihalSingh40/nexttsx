import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} fill="none" {...props}>
    <rect width={44} height={44} fill="#F4F4F4" rx={22} />
    <rect width={43} height={43} x={0.5} y={0.5} stroke="#734D00" strokeOpacity={0.1} rx={21.5} />
    <path
      stroke="#1A1A1A"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.426 22.311 22 29.886l7.574-7.574a4.869 4.869 0 0 0-6.886-6.885l-.688.689-.689-.689a4.869 4.869 0 0 0-6.885 6.885Z"
    />
  </svg>
)
export default SvgComponent
