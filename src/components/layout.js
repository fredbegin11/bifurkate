import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Header from './Header/header';
import stravaAgents from '../agents/stravaAgents';
import AthleteContext from '../contexts/AthleteContext';

const Layout = ({ onMenuClick, children }) => {
  const { storeHydrated, athlete, setAthlete } = useContext(AthleteContext);

  const expiresAtLocal = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null;

  useEffect(() => {
    const expiresAt = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null;
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > expiresAt) {
      stravaAgents
        .refreshToken(refreshToken)
        .then(({ expires_at, refresh_token, access_token }) => {
          typeof window !== 'undefined' && localStorage.setItem('expires_at', expires_at);
          typeof window !== 'undefined' && localStorage.setItem('refresh_token', refresh_token);
          typeof window !== 'undefined' && localStorage.setItem('access_token', access_token);
        })
        .catch(() => {
          window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
        });
    } else if (!expiresAt) {
      window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
    }
  });

  useEffect(() => {
    const currentTime = new Date().getTime() / 1000;
    if (currentTime < expiresAtLocal && _.isEmpty(athlete) && storeHydrated) {
      stravaAgents.getProfile().then(athlete => setAthlete(athlete));
    }
  }, [athlete, expiresAtLocal, storeHydrated, setAthlete]);

  return (
    <>
      <Header profile={athlete} onMenuClick={onMenuClick} />

      <main className="layout">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
