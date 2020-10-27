import '../sass/styles.scss'
import '../game-icons.css'

import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Nav from './nav'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allStrapiCategory(
        filter: { name: { in: ["Towns", "Heroes", "Guides", "Matchups"] } }
      ) {
        edges {
          node {
            id
            name
            articles {
              id
              slug
              title
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Nav
        siteTitle={data.site.siteMetadata.title}
        categories={data.allStrapiCategory.edges.map(item => item.node)}
      />
      <main>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
