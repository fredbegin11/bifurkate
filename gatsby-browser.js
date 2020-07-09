import React from 'react';
import { minify } from 'aphrodite';
import './src/styles/index.scss';
import 'simplebar/dist/simplebar.css';
import 'react-input-range/lib/css/index.css';
import 'react-dates/initialize';

import { AthleteProvider } from './src/contexts/AthleteContext';
import { MenuProvider } from './src/contexts/MenuContext';

// Always keep the full style names
minify(false);

export const wrapRootElement = ({ element }) => (
  <MenuProvider>
    <AthleteProvider>{element}</AthleteProvider>
  </MenuProvider>
);
