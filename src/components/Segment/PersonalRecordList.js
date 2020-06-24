import React from 'react';
import PropTypes from 'prop-types';
import EffortCard from '../Effort/EffortCard';
import LoadingCard from '../Activity/LoadingCard';
import EmptyCard from '../Activity/EmptyCard';
import _ from 'lodash';
import GridFix from '../GridFix';

const PersonalRecordList = ({ title, subtitle, isLoading, efforts, noClick }) => (
  <>
    <section className="activity-list__header">
      <div className="activity-list__title">
        <span className="label__header">{title}</span>
        {subtitle && <span className="label__subheader">{subtitle}</span>}
      </div>
    </section>

    <section className="activity-list">
      {!isLoading && _.isEmpty(efforts) && <EmptyCard text="Nothing to show..." />}
      {!isLoading && (
        <>
          {efforts.map(effort => (
            <EffortCard noClick={noClick} key={`${effort.id}-${effort.segmentid}`} effort={effort} />
          ))}
          <GridFix />
        </>
      )}

      {isLoading && _.times(50, index => <LoadingCard key={index} />)}
    </section>
  </>
);

PersonalRecordList.propTypes = {
  efforts: PropTypes.array,
  activity: PropTypes.object,
  isLoading: PropTypes.bool,
  noClick: PropTypes.bool,
};

PersonalRecordList.defaultProps = {
  efforts: [],
  noClick: true,
};

export default PersonalRecordList;
