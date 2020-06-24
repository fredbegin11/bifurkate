import React from 'react';
import PropTypes from 'prop-types';

const HeaderProfileButton = ({ profile }) => (
  <>
    <span className="header__name">
      {profile.firstname} {profile.lastname}
    </span>
    <img src={profile.profile} className="header__image" />
  </>
);

HeaderProfileButton.propTypes = {
  profile: PropTypes.object,
};

export default HeaderProfileButton;
