import * as React from 'react'
import Svg, { FillProps, Path } from 'react-native-svg'

export default ({ fill }: FillProps) => (
  <Svg width="23" height="23" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
      fill={fill}
    />
  </Svg>
)
