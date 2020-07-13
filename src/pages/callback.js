import PropTypes from 'prop-types';
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
        .then(({ expires_at, refresh_token, access_token }) => {
          typeof window !== 'undefined' && localStorage.setItem('expires_at', expires_at);
          typeof window !== 'undefined' && localStorage.setItem('refresh_token', refresh_token);
          typeof window !== 'undefined' && localStorage.setItem('access_token', access_token);

          navigate('/app/');
        })
        .catch(error => console.error('Error: ', error));
    } else if (typeof window !== 'undefined') {
      window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
    }
  }, []);

  return <Loader title="Hang on, we're redirecting you!" />;
};

Callback.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Callback;
