module.exports = {
  siteMetadata: {
    title: 'Dragon Utopia',
    description: 'A static react library of HoMM3 knowledge',
    author: 'Dan Atanasov'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: 'https://dragon-utopia-cms.herokuapp.com',
        queryLimit: 1000,
        contentTypes: [`article`, `category`],
        singleTypes: [`compare-creatures`, `home`]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js'
      }
    }
  ]
}
