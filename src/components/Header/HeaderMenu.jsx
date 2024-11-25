import React from 'react';
import HeaderProfileButton from './HeaderProfileButton';

const HeaderMenu = ({ profile }) => <div className="header__menu">{profile ? <HeaderProfileButton profile={profile} /> : <div className="header__image" />}</div>;

export default HeaderMenu;
