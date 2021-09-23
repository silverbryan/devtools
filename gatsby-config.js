const config = require('./config/index');
const website = config.metatags;

module.exports = {
  siteMetadata: {
    title: website.title,
    titleTemplate: website.titleTemplate,
    description: website.description,
    siteUrl: website.siteUrl,
    image: website.image,
    owner: website.owner,
    twitterUsername: website.twitterUsername,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `categories`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        failOnError: true,
        defaultQuality: 70,
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
  ],
};
