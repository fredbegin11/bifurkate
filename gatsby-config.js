module.exports = {
  siteMetadata: {
    title: `BIFURKATE`,
    description: `Tired of riding in the same three old routes? Check your ride history and let it inspire you to try new routes!`,
    author: `@fredbegin11`,
    image: '/images/logo.png',
  },
  plugins: [
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
        icon: `src/images/bifurkate-logo.png`, // This path is relative to the root of the site.
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
