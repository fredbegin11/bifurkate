import axios from 'axios';

import _ from 'lodash';

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
    let firstIndex = 1;
    const nbOfPagesPerIteration = 10;
    const nbOfItemsPerPages = 200;

    const data = [];

    while (true) {
      const promises = _.times(nbOfPagesPerIteration).map(index =>
        axios.get(`${baseUrl}/activities?per_page=${nbOfItemsPerPages}&page=${firstIndex + index}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          crossDomain: true,
        }),
      );

      const results = await Promise.all(promises);
      const flattenedResults = results.reduce((allData, page) => [...allData, ...page.data], []);

      data.push(...flattenedResults);

      firstIndex += nbOfPagesPerIteration;

      if (flattenedResults.length < nbOfItemsPerPages * nbOfPagesPerIteration) break;
    }

    return data;
  },
};
