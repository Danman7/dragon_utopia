const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPagesStatefully = ({ actions, graphql }) => {
  const { createPage } = actions

  const getDataFromStrapi = makeRequest(
    graphql,
    `
    {
      allStrapiArticle {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
    `
  ).then((result) => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: path.resolve(`src/templates/article.tsx`),
        context: {
          id: node.id,
        },
      })
    })

    createPage({
      path: `/compare-creatures`,
      component: path.resolve(`src/templates/compare-creatures.js`),
    })
  })

  // Query for articles nodes to use in creating pages.
  return getDataFromStrapi
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
