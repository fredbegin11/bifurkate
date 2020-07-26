import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { CirclePicker } from 'react-color';
import InputRange from 'react-input-range';
import Collapsable from '../Collapsable';

const MapOptions = ({ mapConfig, setMapOption }) => (
  <Collapsable label="Map Options" isInitiallyOpen>
    <button type="button" className="custom-button menu__item" onClick={() => setMapOption({ heatMapMode: !mapConfig.heatMapMode })}>
      Heatmap {mapConfig.heatMapMode ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
    </button>
    <div className="custom-button menu__item">
      <span className="menu__color-picker">Line Color</span>
      <CirclePicker
        circleSize={20}
        colors={['#FF0000', '#2196f3', '#ffeb3b']}
        width="100%"
        className="menu__color-picker --picker"
        color={mapConfig.polylineColor}
        onChangeComplete={({ hex }) => setMapOption({ polylineColor: hex })}
      />
    </div>
    <div className="custom-button menu__item">
      <span className="menu__weight-picker">Line Weight</span>
      <div className="menu__weight-picker --picker">
        <InputRange
          maxValue={5}
          minValue={1}
          color={mapConfig.polylineColor}
          value={mapConfig.polylineWeight}
          onChange={polylineWeight => setMapOption({ polylineWeight })}
          formatLabel={() => ''}
        />
      </div>
    </div>
    <button type="button" className="custom-button menu__item --small" onClick={() => setMapOption({ heatMapMode: false, polylineColor: 'red', polylineWeight: 2 })}>
      Reset to defaults
    </button>
  </Collapsable>
);

export default MapOptions;
