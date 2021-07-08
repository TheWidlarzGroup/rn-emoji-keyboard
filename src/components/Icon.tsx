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

const color = (isActive: boolean) => (isActive ? '#005b96' : '#000');

export const Icon = ({
  iconName,
  isActive,
}: {
  iconName: string;
  isActive: boolean;
}) => {
  switch (iconName) {
    case 'Smile':
      return <Smile fill={color(isActive)} />;
    case 'Trees':
      return <Trees fill={color(isActive)} />;
    case 'Pizza':
      return <Pizza fill={color(isActive)} />;
    case 'Plane':
      return <Plane fill={color(isActive)} />;
    case 'Football':
      return <Football fill={color(isActive)} />;
    case 'Lightbulb':
      return <Lightbulb fill={color(isActive)} />;
    case 'Flag':
      return <Flag fill={color(isActive)} />;
    case 'Ban':
      return <Ban fill={color(isActive)} />;
    case 'Users':
      return <Users fill={color(isActive)} />;
    default:
      return null;
  }
};
