import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import Collapsable from '../Collapsable';
import { useIsMobile } from '../../../helpers/hooks';

const Dates = ({ config, setDateConfig, clearConfig }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const isMobile = useIsMobile();

  return (
    <Collapsable label="Custom Dates" isInitiallyOpen>
      <DateRangePicker
        startDate={config.startDate}
        startDateId="start"
        endDate={config.endDate}
        endDateId="end"
        onDatesChange={setDateConfig}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={() => false}
        openDirection="up"
        block
        numberOfMonths={isMobile ? 1 : 2}
        withPortal
        hideKeyboardShortcutsPanel
        readOnly
        noBorder
        displayFormat="YYYY-MM-DD"
      />
      <div className="menu__item --no-margin">
        <button type="button" className="custom-button --small" onClick={clearConfig}>
          Clear Dates
        </button>
      </div>
    </Collapsable>
  );
};

export default Dates;
