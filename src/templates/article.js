import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  console.log(data)

  const { title, sections, headerImage } = data.strapiArticle

  return (
    <Layout>
      <h1>{title}</h1>

      {headerImage && (
        <Img
          fluid={headerImage.childImageSharp.fluid}
          className="header-image"
        />
      )}

      {sections.map((section, i) => (
        <div className={section.className || ''} key={`section-${i}`}>
          <ReactMarkdown
            source={section.content}
            transformImageUri={uri => `${process.env.GATSBY_API_URL}${uri}`}
          />
        </div>
      ))}
    </Layout>
  )
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      slug
      headerImage {
        childImageSharp {
          fluid(maxWidth: 1140) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sections {
        className
        content
        id
      }
    }
  }
`
