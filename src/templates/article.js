import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  console.log(data)

  const { title, sections } = data.strapiArticle

  return (
    <Layout>
      <h1>{title}</h1>

      {sections.map(section => (
        <div className={section.className || ''}>
          <ReactMarkdown
            source={section.content}
            transformImageUri={uri => `${process.env.GATSBY_API_URL}${uri}`}
          />
        </div>
      ))}

      {/* <ReactMarkdown
        source={content}
        transformImageUri={uri => `${process.env.GATSBY_API_URL}${uri}`}
      /> */}
    </Layout>
  )
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      slug
      sections {
        className
        content
        id
      }
    }
  }
`
