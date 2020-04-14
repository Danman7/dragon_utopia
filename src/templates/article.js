import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  const { title, thumb, content, mentions } = data.strapiArticle

  return (
    <Layout>
      <h1>{title}</h1>

      {mentions && <p className="fine">{mentions}</p>}
      {thumb && <Img fixed={thumb.childImageSharp.fixed} />}
      <ReactMarkdown
        source={content}
        transformImageUri={uri => `${process.env.GATSBY_API_URL}${uri}`}
      />
    </Layout>
  )
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      content
      mentions
    }
  }
`
