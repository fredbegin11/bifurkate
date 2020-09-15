import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { CirclePicker } from 'react-color';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import InputRange from 'react-input-range';
import classNames from 'classnames';
import Collapsable from '../Collapsable';

const MapOptions = ({ mapConfig, setMapOption }) => {
  const isImperial = mapConfig.unit === 'imperial';

  const handleHeatmapClick = () => {
    setMapOption({ heatMapMode: !mapConfig.heatMapMode });
    trackCustomEvent({ category: 'toggle-heatmap', action: 'Click', label: 'Toggle Heatmap' });
  };

  const handleToggleUnit = unit => {
    setMapOption({ unit });
    trackCustomEvent({ category: 'toggle-unit-system', action: 'Click', label: 'Toggle Unit System' });
  };

  const handleBikePathsClick = () => {
    setMapOption({ showBikePaths: !mapConfig.showBikePaths });
    trackCustomEvent({ category: 'toggle-bike-path', action: 'Click', label: 'Toggle Bike Paths' });
  };

  const handleColorClick = polylineColor => {
    setMapOption({ polylineColor });
    trackCustomEvent({ category: 'toggle-color', action: 'Click', label: 'Set Map Color' });
  };

  const handleWeightClick = polylineWeight => {
    setMapOption({ polylineWeight });
    trackCustomEvent({ category: 'toggle-weight', action: 'Click', label: 'Set Map Line Weight' });
  };

  return (
    <Collapsable label="Map Options" isInitiallyOpen>
      <span className="menu__item">
        <span className="custom-button menu__weight-picker">Units</span>
        <span className="custom-button --no-padding">
          <button type="button" onClick={() => handleToggleUnit('metric')} className={classNames('custom-button', !isImperial && '--selected')}>
            Metric
          </button>
          <button type="button" onClick={() => handleToggleUnit('imperial')} className={classNames('custom-button', isImperial && '--selected')}>
            Imperial
          </button>
        </span>
      </span>
      <button type="button" className="custom-button menu__item" onClick={handleHeatmapClick}>
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
          onChangeComplete={({ hex }) => handleColorClick(hex)}
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
            onChange={polylineWeight => handleWeightClick(polylineWeight)}
            formatLabel={() => ''}
          />
        </div>
      </div>
      <button type="button" className="custom-button menu__item" onClick={handleBikePathsClick}>
        Show Bike Paths {mapConfig.showBikePaths ? <FaCheck className="menu__status --active" /> : <FaTimes className="menu__status --inactive" />}
      </button>
      <button type="button" className="custom-button menu__item --small" onClick={() => setMapOption({ heatMapMode: false, polylineColor: 'red', polylineWeight: 2 })}>
        Reset to defaults
      </button>
    </Collapsable>
  );
};

export default MapOptions;
