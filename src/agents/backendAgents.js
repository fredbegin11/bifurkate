import axios from 'axios';

export default {
  authenticate: async code => {
    // Hack to bypass netlify's function in dev
    const isDev = process.env.NODE_ENV === 'development';
    const prodUrl = `${process.env.GATSBY_CURRENT_DOMAIN}/.netlify/functions/authenticate`;
    const devUrl = `https://www.strava.com/oauth/token?client_id=${process.env.GATSBY_CLIENT_ID}&client_secret=${process.env.GATSBY_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;

    const result = await axios.post(isDev ? devUrl : prodUrl, { code });

    return result.data;
  },
  refreshToken: async refreshToken => {
    const isDev = process.env.NODE_ENV === 'development';
    const prodUrl = `${process.env.GATSBY_CURRENT_DOMAIN}/.netlify/functions/refreshtoken`;
    const devUrl = `https://www.strava.com/oauth/token?client_id=${process.env.GATSBY_CLIENT_ID}&client_secret=${process.env.GATSBY_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`;

    const result = await axios.post(isDev ? devUrl : prodUrl, { refresh_token: refreshToken });

    return result.data;
  },
};
