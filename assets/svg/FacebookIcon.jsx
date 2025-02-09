import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
    <rect width={36} height={36} fill="#fff" rx={8} />
    <path
      fill="#734D00"
      d="m21.816 18.736.48-3.133h-3.005v-2.032c0-.857.42-1.693 1.766-1.693h1.367V9.212S21.184 9 19.998 9c-2.475 0-4.093 1.5-4.093 4.216v2.387h-2.751v3.133h2.751v7.572h3.386v-7.572h2.525Z"
    />
  </svg>
)
export default SvgComponent
