require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    title: `BIFURKATE`,
    description: `Bifurkate is a powerful and lightweight Strava powered app to visualize your cycling and running history. It displays all your activities on a map, offers a personal heat map and let you filter your activities. `,
    author: `@fredbegin11`,
    image: '/images/logo.png',
    siteUrl: process.env.GATSBY_CURRENT_DOMAIN || `https://www.bifurkate.com`,
    keywords: [
      'strava login',
      'strava heat map',
      'strava heatmap',
      'strava heatmaps',
      'strava activity viewer',
      'strava analysis',
      'strava mapper',
      'strava personal heatmap',
      'strava viewer',
      'activity viewer',
      'bike map',
      'cycling map',
      'run map',
    ],
  },
  plugins: [
    'gatsby-plugin-eslint',
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-force-trailing-slashes',
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ff4b00`,
        theme_color: `#ff4b00`,
        display: `minimal-ui`,
        icon: `src/images/branding/logo-square.png`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/activity/*`, `/segment/*`] },
    },
  ],
};

require('dotenv').config({
  path: `.env`,
});
