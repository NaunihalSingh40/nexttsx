
  import * as React from 'react'
  const DeleteIcon = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#979797"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <path
      stroke="#979797"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15 9-6 6M15 15 9 9"
    />
  </svg>
  )
  export default DeleteIcon