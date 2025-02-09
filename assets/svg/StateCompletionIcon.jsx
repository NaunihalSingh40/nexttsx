import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#419E6A"
        fillRule="evenodd"
        d="M.002 12.481a12 12 0 1 1 24 0 12 12 0 0 1-24 0Zm11.315 5.136 6.909-8.636-1.248-.999-5.891 7.362-4.173-3.477-1.024 1.229 5.427 4.523v-.002Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .482h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
