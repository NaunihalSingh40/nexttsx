import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <rect width={36} height={36} fill="#fff" fillOpacity={0.1} rx={8} />
    <rect width={35} height={35} x={0.5} y={0.5} stroke="#fff" strokeOpacity={0.2} rx={7.5} />
    <path
      fill="#fff"
      d="m21.817 18.736.48-3.133h-3.005v-2.032c0-.857.42-1.693 1.766-1.693h1.366V9.212S21.184 9 20 9c-2.476 0-4.093 1.5-4.093 4.216v2.387h-2.752v3.133h2.752v7.572h3.386v-7.572h2.525Z"
    />
  </svg>
)
export default SvgComponent
