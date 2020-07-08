import React, { useState } from 'react';
import Collapsable from '../Collapsable';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const Dates = ({ config, setDateConfig }) => {
  return (
    <Collapsable label="Dates" isInitiallyOpen>
      <div style={{ padding: 10 }}>
        <DateRangePicker
          value={[config.startDate, config.endDate]}
          onChange={value =>
            setDateConfig({
              startDate: value ? value[0] : null,
              endDate: value ? value[1] : null,
            })
          }
        />
      </div>
    </Collapsable>
  );
};

export default Dates;
