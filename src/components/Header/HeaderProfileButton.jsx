import React from 'react';

const HeaderProfileButton = ({ profile }) => (
  <>
    <span className="header__name">
      {profile.firstname} {profile.lastname}
    </span>
    {profile.profile && <img src={profile.profile} className="header__image" alt="" />}
  </>
);

export default HeaderProfileButton;
