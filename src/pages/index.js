import { graphql } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import Header from '../components/header'
import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const { title, lead, content, titleImage } = data.strapiHome

  return (
    <Layout>
      <Header title={title} lead={lead} titleImage={titleImage} />
      <article>
        <ReactMarkdown source={content} />
      </article>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    strapiHome {
      content
      title
      lead
      titleImage {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
