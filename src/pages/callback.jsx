import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

import Loader from '../components/Loader/Loader';
import backendAgents from '../agents/backendAgents';

const Callback = ({ location }) => {
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (!error) {
      backendAgents
        .authenticate(code)
        .then(data => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('expires_at', data.expires_at);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('access_token', data.access_token);
          }

          navigate('/app/');
        })
        .catch(() => {});
    } else if (typeof window !== 'undefined') {
      window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
    }
  }, []);

  return <Loader title="Hang on, we're redirecting you!" />;
};

export default Callback;
