import * as React from 'react';
import Flag from '../assets/Flag';
import Football from '../assets/Football';
import Lightbulb from '../assets/Lightbulb';
import Pizza from '../assets/Pizza';
import Plane from '../assets/Plane';
import Smile from '../assets/Smile';
import Trees from '../assets/Trees';
import Ban from '../assets/Ban';
import Users from '../assets/Users';
import Search from '../assets/Search';

export const Icon = ({
  iconName,
  isActive,
  normalColor,
  activeColor,
}: {
  iconName: string;
  isActive: boolean;
  normalColor: string;
  activeColor: string;
}) => {
  const color = () => (isActive ? activeColor : normalColor);
  switch (iconName) {
    case 'Smile':
      return <Smile fill={color()} />;
    case 'Trees':
      return <Trees fill={color()} />;
    case 'Pizza':
      return <Pizza fill={color()} />;
    case 'Plane':
      return <Plane fill={color()} />;
    case 'Football':
      return <Football fill={color()} />;
    case 'Lightbulb':
      return <Lightbulb fill={color()} />;
    case 'Flag':
      return <Flag fill={color()} />;
    case 'Ban':
      return <Ban fill={color()} />;
    case 'Users':
      return <Users fill={color()} />;
    case 'Search':
      return <Search fill={color()} />;
    default:
      return null;
  }
};
