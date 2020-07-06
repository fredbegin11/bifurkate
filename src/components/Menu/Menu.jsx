import React, { useContext } from 'react';
import SimpleBar from 'simplebar-react';
import _ from 'lodash';
import classNames from 'classnames';

import ActivityTypes from './Blocks/ActivityTypes';
import Footer from './Blocks/Footer';
import MapOptions from './Blocks/MapOptions';
import MenuContext from '../../contexts/MenuContext';
import NoActivities from './Blocks/NoActivities';
import Seasons from './Blocks/Seasons';
import { getAllActivityTypes } from '../../helpers/activityHelpers';
import { useEffect } from 'react';
import { usePrevious } from '../../helpers/hooks';

const Menu = ({ activities }) => {
  const { initializeMenu, toggleActivityTypeDisplay, isMenuOpen, setOption, setMapOption, options, toggleSeasonDisplay } = useContext(MenuContext);
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
              <MapOptions userActivityTypes={userActivityTypes} mapConfig={options.mapConfig} setMapOption={setMapOption} />
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
