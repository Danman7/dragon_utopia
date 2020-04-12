/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import 'bootstrap/dist/css/bootstrap.css'

import './styles.scss'

import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Header from './header'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allStrapiCategory(
        filter: { name: { in: ["Towns", "Heroes", "Guides"] } }
      ) {
        edges {
          node {
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
      <Header
        siteTitle={data.site.siteMetadata.title}
        categories={data.allStrapiCategory.edges.map(item => item.node)}
      />
      <div className="container">
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
