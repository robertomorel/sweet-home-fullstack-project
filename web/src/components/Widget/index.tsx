import React from 'react';

import { WidgetsProps } from '../../types';

import { PropertyBox } from './styles';

export const Widget: React.FC<WidgetsProps> = ({propId, imageStr, price, views}) => {
  return (
    <PropertyBox>
      <img src={require(`../../assets/${imageStr}`)} alt="Profile" />
      <span>{price}</span>
      <p>Total View(s): {views}</p>
    </PropertyBox>
  );
}
