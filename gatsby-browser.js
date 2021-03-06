import React from 'react';
import './src/styles/index.scss';
import 'simplebar/dist/simplebar.css';
import 'react-input-range/lib/css/index.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { AthleteProvider } from './src/contexts/AthleteContext';
import { MenuProvider } from './src/contexts/MenuContext';
import { ActivityProvider } from './src/contexts/ActivityContext';

export const wrapRootElement = ({ element }) => (
  <MenuProvider>
    <ActivityProvider>
      <AthleteProvider>{element}</AthleteProvider>
    </ActivityProvider>
  </MenuProvider>
);
