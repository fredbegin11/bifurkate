import axios from 'axios';

const baseUrl = 'https://www.strava.com/api/v3';

export default {
  getProfile: async () => {
    const result = await axios.get(`${baseUrl}/athlete`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      crossDomain: true,
    });

    return result.data;
  },
  getAllActivities: async () => {
    let data = [];
    let i = 1;

    while (true) {
      const result = await axios.get(`${baseUrl}/activities?per_page=200&page=${i}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        crossDomain: true,
      });

      data = [...data, ...result.data];
      i += 1;

      if (result.data.length === 0) {
        break;
      }
    }

    return data;
  },
};
