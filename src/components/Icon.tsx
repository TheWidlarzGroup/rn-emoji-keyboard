import * as React from 'react'

import type { IconNames } from '../types'
import { exhaustiveTypeCheck } from '../utils/exhaustiveTypeCheck'
import PngIcon from '../assets/PngIcon'

export const Icon = ({
  iconName,
  isActive,
  normalColor,
  activeColor,
}: {
  iconName: IconNames | 'Close' | 'QuestionMark'
  isActive: boolean
  normalColor: string
  activeColor: string
}) => {
  const color = isActive ? activeColor : normalColor
  switch (iconName) {
    case 'Smile':
      return <PngIcon fill={color} source={require('../assets/smile.png')} />
    case 'Trees':
      return <PngIcon fill={color} source={require('../assets/trees.png')} />
    case 'Pizza':
      return <PngIcon fill={color} source={require('../assets/pizza.png')} />
    case 'Plane':
      return <PngIcon fill={color} source={require('../assets/plane.png')} />
    case 'Football':
      return <PngIcon fill={color} source={require('../assets/football.png')} />
    case 'Lightbulb':
      return <PngIcon fill={color} source={require('../assets/lightbulb.png')} />
    case 'Flag':
      return <PngIcon fill={color} source={require('../assets/flag.png')} />
    case 'Ban':
      return <PngIcon fill={color} source={require('../assets/ban.png')} />
    case 'Users':
      return <PngIcon fill={color} source={require('../assets/users.png')} />
    case 'Search':
      return <PngIcon fill={color} source={require('../assets/search.png')} />
    case 'Close':
      return <PngIcon fill={color} source={require('../assets/close.png')} />
    case 'Clock':
      return <PngIcon fill={color} source={require('../assets/clock.png')} />
    case 'QuestionMark':
      return <PngIcon fill={color} source={require('../assets/questionMark.png')} />
    default:
      exhaustiveTypeCheck(iconName)
      return null
  }
}
