import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isMobile } from 'react-device-detect';

import Header from './Header/header';
import stravaAgents from '../agents/stravaAgents';
import AthleteContext from '../contexts/AthleteContext';

const Layout = ({ children, showMenu }) => {
  const { storeHydrated, athlete, setAthlete } = useContext(AthleteContext);
  const [expiresAtState, setExpiresAtState] = useState(typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null);

  useEffect(() => {
    if (isMobile && typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

      window.addEventListener('resize', () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      });
    }
  }, []);

  useEffect(() => {
    const expiresAt = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null;
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > expiresAt) {
      stravaAgents
        .refreshToken(refreshToken)
        .then(({ expires_at, refresh_token, access_token }) => {
          setExpiresAtState(expires_at);
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
    if (currentTime < expiresAtState && _.isEmpty(athlete) && storeHydrated) {
      stravaAgents.getProfile().then(athlete => setAthlete(athlete));
    }
  }, [athlete, expiresAtState, storeHydrated, setAthlete]);

  return (
    <>
      <Header profile={athlete} showMenu={showMenu} />

      <main className="layout">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
