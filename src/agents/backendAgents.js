import axios from 'axios';

export default {
  authenticate: async code => {
    const result = await axios.post(`${process.env.GATSBY_CURRENT_DOMAIN}/.netlify/functions/authenticate`, { code });

    return result.data;
  },
  refreshToken: async refreshToken => {
    const result = await axios.post(`${process.env.GATSBY_CURRENT_DOMAIN}/.netlify/functions/refreshtoken`, { refresh_token: refreshToken });

    return result.data;
  },
};
