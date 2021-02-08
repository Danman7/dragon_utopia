require('dotenv').config({
  path: `.env.development`,
})
module.exports = {
  siteMetadata: {
    title: 'The Dragon Utopia',
    description: 'A static react library of HoMM3 knowledge',
    author: 'Dan Atanasov',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://dragon-utopia-cms.herokuapp.com`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`article`, `category`],
        singleTypes: [`home`],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#e68a49',
        theme_color: '#e68a49',
        display: 'minimal-ui',
        icon: 'src/images/dragon-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
  ],
}
