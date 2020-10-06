import { graphql } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import Header from '../components/header'
import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  const { title, sections, headerImage, lead } = data.strapiArticle

  return (
    <Layout>
      <Header title={title} lead={lead} titleImage={headerImage} />

      <main>
        {sections.map((section, i) => (
          <div className={section.className || ''} key={`section-${i}`}>
            <ReactMarkdown source={section.content} />
          </div>
        ))}
      </main>
    </Layout>
  )
}

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      slug
      lead
      headerImage {
        childImageSharp {
          fluid(maxWidth: 1920) {
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
