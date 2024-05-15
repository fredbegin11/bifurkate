import axios from 'axios';

import { fetchAllResults } from '../helpers/fetchHelpers';

const baseUrl = 'https://www.strava.com/api/v3';

export default {
  getProfile: async () => {
    const { data } = await axios.get(`${baseUrl}/athlete`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return data;
  },
  getAllRoutes: athleteId => fetchAllResults(`${baseUrl}/athletes/${athleteId}/routes`),
  getAllActivities: () => fetchAllResults(`${baseUrl}/activities`),
};
