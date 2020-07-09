import React from 'react';
import './src/styles/index.scss';
import 'simplebar/dist/simplebar.css';
import 'react-input-range/lib/css/index.css';
import 'react-dates/initialize';

import { AthleteProvider } from './src/contexts/AthleteContext';
import { MenuProvider } from './src/contexts/MenuContext';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
// import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import DatesTheme from './src/themes/DatesTheme';

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme(DatesTheme);

export const wrapRootElement = ({ element }) => (
  <MenuProvider>
    <AthleteProvider>{element}</AthleteProvider>
  </MenuProvider>
);
