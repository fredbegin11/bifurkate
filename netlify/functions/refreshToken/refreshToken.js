export const handler = async (event) => {
  const { refresh_token: refreshToken } = JSON.parse(event.body);

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.VITE_STRAVA_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Strava rejected token refresh:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Failed to refresh Strava token' }),
      };
    }

    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.error('Failed to refresh Strava token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to refresh Strava token' }),
    };
  }
};
