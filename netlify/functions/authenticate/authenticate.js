const axios = require('axios');

const handler = async event => {
  const { code } = JSON.parse(event.body);

  const result = await axios.post(
    `https://www.strava.com/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
  );

  return { statusCode: 200, body: JSON.stringify(result.data) };
};

module.exports = { handler };
