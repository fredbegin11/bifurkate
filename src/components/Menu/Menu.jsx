import _ from 'lodash';
import React, { useContext } from 'react';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import MenuContext from '../../contexts/MenuContext';
import { usePrevious } from '../../helpers/hooks';
import { useEffect } from 'react';
import Seasons from './Blocks/Seasons';
import ActivityTypes from './Blocks/ActivityTypes';
import MapOptions from './Blocks/MapOptions';
import NoActivities from './Blocks/NoActivities';
import Footer from './Blocks/Footer';
import { getAllActivityTypes } from '../../helpers/activityHelpers';

const Menu = ({ activities }) => {
  const { initializeMenu, toggleActivityTypeDisplay, isMenuOpen, setOption, options, toggleSeasonDisplay } = useContext(MenuContext);
  const userActivityTypes = getAllActivityTypes(activities);

  const prevActivityTypes = usePrevious(userActivityTypes);

  useEffect(() => {
    const userActivityLoaded = activities && userActivityTypes && prevActivityTypes;
    const userActivityTypesChanged = !_.isEqual(prevActivityTypes, userActivityTypes);

    if (userActivityLoaded && userActivityTypesChanged) {
      initializeMenu(activities, userActivityTypes);
    }
  }, [activities, userActivityTypes, prevActivityTypes, setOption, initializeMenu]);

  return (
    <SimpleBar forceVisible={true} autoHide={false} className={classNames('menu', isMenuOpen && '--open')}>
      <div className="menu__inner">
        <div>
          {_.isEmpty(userActivityTypes) && <NoActivities />}
          {!_.isEmpty(userActivityTypes) && (
            <>
              <MapOptions userActivityTypes={userActivityTypes} heatMapMode={options.heatMapMode} setOption={setOption} />
              <ActivityTypes userActivityTypes={userActivityTypes} activityTypeConfig={options.activityTypeConfig} toggleActivityTypeDisplay={toggleActivityTypeDisplay} />
              <Seasons seasonConfig={options.seasonConfig} toggleSeasonDisplay={toggleSeasonDisplay} />
            </>
          )}
        </div>

        <Footer />
      </div>
    </SimpleBar>
  );
};

export default Menu;
