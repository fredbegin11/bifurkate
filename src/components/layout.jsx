import React, { useEffect, useContext, useState } from 'react';
import _ from 'lodash';
import { useIsMobile } from '../helpers/hooks';

import Header from './Header/header';
import stravaAgents from '../agents/stravaAgents';
import AthleteContext from '../contexts/AthleteContext';
import backendAgents from '../agents/backendAgents';

const Layout = ({ children, showMenu }) => {
  const { storeHydrated, athlete, setAthlete } = useContext(AthleteContext);
  const [expiresAtState, setExpiresAtState] = useState(typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null);
  const isMobile = useIsMobile();

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

    if (currentTime && currentTime > expiresAt) {
      backendAgents
        .refreshToken(refreshToken)
        .then(data => {
          setExpiresAtState(data.expires_at);
          if (typeof window !== 'undefined') {
            localStorage.setItem('expires_at', data.expires_at);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('access_token', data.access_token);
          }
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
      stravaAgents.getProfile().then(athleteProfile => setAthlete(athleteProfile));
    }
  }, [athlete, expiresAtState, storeHydrated, setAthlete]);

  return (
    <>
      <Header profile={athlete} showMenu={showMenu} />

      <main className="layout">{children}</main>
    </>
  );
};

export default Layout;
