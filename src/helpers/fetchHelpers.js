import axios from 'axios';
import _ from 'lodash';

export const fetchAllResults = async url => {
  let firstIndex = 1;
  const nbOfPagesPerIteration = 4;
  const nbOfItemsPerPages = 200;

  const data = [];

  while (true) {
    const promises = _.times(nbOfPagesPerIteration).map(index =>
      axios.get(`${url}?per_page=${nbOfItemsPerPages}&page=${firstIndex + index}`, {
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
};
