import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} fill="none" {...props}>
    <rect width={44} height={44} fill="#F4F4F4" rx={22} />
    <rect width={43} height={43} x={0.5} y={0.5} stroke="#734D00" strokeOpacity={0.1} rx={21.5} />
    <path
      fill="#1A1A1A"
      d="M29.97 31.03a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM26.75 20.5a6.25 6.25 0 0 1-6.25 6.25v1.5a7.75 7.75 0 0 0 7.75-7.75h-1.5Zm-6.25 6.25a6.25 6.25 0 0 1-6.25-6.25h-1.5a7.75 7.75 0 0 0 7.75 7.75v-1.5Zm-6.25-6.25a6.25 6.25 0 0 1 6.25-6.25v-1.5a7.75 7.75 0 0 0-7.75 7.75h1.5Zm6.25-6.25a6.25 6.25 0 0 1 6.25 6.25h1.5a7.75 7.75 0 0 0-7.75-7.75v1.5Zm4.47 11.78 5 5 1.06-1.06-5-5-1.06 1.06Z"
    />
  </svg>
)
export default SvgComponent
