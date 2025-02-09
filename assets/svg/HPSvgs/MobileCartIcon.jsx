import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={21} fill="none" {...props}>
    <path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M2.5 3.304h1.143c.79 0 1.472.555 1.632 1.329l1.95 9.425c.16.774.842 1.329 1.632 1.329h5.726"
    />
    <path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M5.688 6.637h10.708c.553 0 .953.53.801 1.062l-.845 2.958a2.5 2.5 0 0 1-2.404 1.813h-7.05"
    />
    <circle
      cx={13.751}
      cy={17.887}
      r={0.417}
      fill="#282828"
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
    />
    <circle
      cx={0.417}
      cy={0.417}
      r={0.417}
      fill="#282828"
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      transform="matrix(1 0 0 -1 8.334 18.304)"
    />
  </svg>
)
export default SvgComponent
