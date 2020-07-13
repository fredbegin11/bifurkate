import axios from 'axios';

export default {
  authenticate: async code => {
    const result = await axios.post(`${process.env.GATSBY_BACKEND_API_URL}/authenticate`, { code }, { crossDomain: true });

    return result.data;
  },
  refreshToken: async refreshToken => {
    const result = await axios.post(`${process.env.GATSBY_BACKEND_API_URL}/refreshtoken`, { refresh_token: refreshToken }, { crossDomain: true });

    return result.data;
  },
};
