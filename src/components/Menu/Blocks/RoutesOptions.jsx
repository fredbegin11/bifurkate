import React from 'react';
import InputRange from 'react-input-range';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { CirclePicker } from 'react-color';

import Collapsable from '../Collapsable';

const RoutesOptions = ({ mapConfig, setMapOption }) => {
  const handleRoutesClick = () => setMapOption({ showRoutes: !mapConfig.showRoutes });

  const handleColorClick = routesLineColor => setMapOption({ routesLineColor });

  const handleWeightClick = routesLineWeight => setMapOption({ routesLineWeight });

  return (
    <Collapsable label="Routes Options" isInitiallyOpen>
      <button type="button" className="custom-button menu__item" onClick={handleRoutesClick}>
        Show Athlete Routes {mapConfig.showRoutes ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
      <div className="custom-button menu__item">
        <span className="menu__color-picker">Routes Line Color</span>
        <CirclePicker
          circleSize={20}
          colors={['#E6E6E9', '#9999A1', '#66666E']}
          width="100%"
          className="menu__color-picker --picker"
          color={mapConfig.routesLineColor}
          onChangeComplete={({ hex }) => handleColorClick(hex)}
        />
      </div>
      <div className="custom-button menu__item">
        <span className="menu__weight-picker">Line Weight</span>
        <div className="menu__weight-picker --picker">
          <InputRange maxValue={5} minValue={1} value={mapConfig.routesLineWeight} onChange={routesLineWeight => handleWeightClick(routesLineWeight)} formatLabel={() => ''} />
        </div>
      </div>
      <button type="button" className="custom-button menu__item --small" onClick={() => setMapOption({ showRoutes: false, routesLineColor: '#E6E6E9', routesLineWeight: 2 })}>
        Reset to defaults
      </button>
    </Collapsable>
  );
};

export default RoutesOptions;
