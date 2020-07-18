import React from 'react';
import classNames from 'classnames';

const PropertyTabs = ({ properties, onClick, activeProperty }) => (
  <div>
    {properties.map(property => (
      <button className={classNames('button', activeProperty === property && '--active')} key={property} onClick={() => onClick(property)}>
        {property}
      </button>
    ))}
  </div>
);

export default PropertyTabs;
