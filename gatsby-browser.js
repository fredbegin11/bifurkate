import React from 'react';
import './src/styles/index.scss';

import { AthleteProvider } from './src/contexts/AthleteContext';
import { MenuProvider } from './src/contexts/MenuContext';

export const wrapRootElement = ({ element }) => (
  <MenuProvider>
    <AthleteProvider>{element}</AthleteProvider>
  </MenuProvider>
);
