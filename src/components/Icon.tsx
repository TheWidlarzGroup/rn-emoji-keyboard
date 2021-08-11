import * as React from 'react'
import Flag from '../assets/Flag'
import Football from '../assets/Football'
import Lightbulb from '../assets/Lightbulb'
import Pizza from '../assets/Pizza'
import Plane from '../assets/Plane'
import Smile from '../assets/Smile'
import Trees from '../assets/Trees'
import Ban from '../assets/Ban'
import Users from '../assets/Users'
import Search from '../assets/Search'
import Close from '../assets/Close'
import Clock from '../assets/Clock'
import type { IconNames } from '../types'
import { exhaustiveTypeCheck } from '../utils'

export const Icon = ({
  iconName,
  isActive,
  normalColor,
  activeColor,
}: {
  iconName: IconNames | 'Close'
  isActive: boolean
  normalColor: string
  activeColor: string
}) => {
  const color = isActive ? activeColor : normalColor
  switch (iconName) {
    case 'Smile':
      return <Smile fill={color} />
    case 'Trees':
      return <Trees fill={color} />
    case 'Pizza':
      return <Pizza fill={color} />
    case 'Plane':
      return <Plane fill={color} />
    case 'Football':
      return <Football fill={color} />
    case 'Lightbulb':
      return <Lightbulb fill={color} />
    case 'Flag':
      return <Flag fill={color} />
    case 'Ban':
      return <Ban fill={color} />
    case 'Users':
      return <Users fill={color} />
    case 'Search':
      return <Search fill={color} />
    case 'Close':
      return <Close fill={color} />
    case 'Clock':
      return <Clock fill={color} />
    default:
      exhaustiveTypeCheck(iconName)
      return null
  }
}
