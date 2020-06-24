import React from 'react';
import './src/styles/index.scss';

import { AthleteProvider } from './src/contexts/AthleteContext';

export const wrapRootElement = ({ element }) => <AthleteProvider>{element}</AthleteProvider>;
