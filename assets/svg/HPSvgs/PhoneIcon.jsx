import * as React from 'react'
const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#fff"
      strokeWidth={1.5}
      d="M12.843 18.157c1.713.862 3.73 1.483 6.095 1.75.574.064 1.062-.396 1.062-.974v-2.152a1 1 0 0 0-.758-.97l-2.693-.674a1 1 0 0 0-.95.263l-2.756 2.757Zm0 0c-3.116-1.568-5.226-3.932-6.602-6.398m0 0c-1.31-2.35-1.955-4.792-2.166-6.728C4.013 4.469 4.469 4 5.034 4H7.18a1 1 0 0 1 .98.804l.735 3.671a1 1 0 0 1-.273.903l-2.38 2.38Z"
    />
  </svg>
)
export default SvgComponent
