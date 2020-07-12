module.exports = {
  siteMetadata: {
    title: `BIFURKATE`,
    description: `A Strava powered ride visualizer with personal heatmap feature.`,
    author: `@fredbegin11`,
    image: '/images/logo.png',
    siteUrl: `https://www.bifurkate.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-171159310-1',
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
