import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#686868"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.995 4.93c-1.5-1.748-4-2.218-5.879-.618-1.879 1.6-2.143 4.276-.668 6.169 1.227 1.573 4.94 4.892 6.156 5.966.136.12.204.18.284.204.069.02.145.02.214 0 .08-.024.147-.084.284-.204 1.216-1.074 4.929-4.393 6.156-5.966 1.475-1.893 1.243-4.585-.668-6.169-1.911-1.583-4.38-1.13-5.88.618Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
