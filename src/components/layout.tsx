import '../sass/styles.scss'

import { graphql, useStaticQuery } from 'gatsby'
import { ReactNode } from 'react'

import Footer from './footer'
import Nav from './nav'

const Layout = ({ children }: { children: ReactNode }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allStrapiCategory(
        filter: {
          name: { in: ["Towns", "Creatures", "Heroes", "Guides", "Matchups"] }
        }
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
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Nav
        siteTitle={data.site.siteMetadata.title}
        categories={data.allStrapiCategory.edges.map(
          (item: { node: {} }) => item.node
        )}
      />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
