import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <ul>
      <h2>
        <Link to={`/compare-creatures`}>Compare Creatures</Link>
      </h2>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.slug}`}>{document.node.title}</Link>
          </h2>

          {document.node.thumb && (
            <Img fixed={document.node.thumb.childImageSharp.fixed} />
          )}
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`
