import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Parallax } from 'react-scroll-parallax'

import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  console.log(data)

  const { title, sections, headerImage } = data.strapiArticle

  return (
    <Layout>
      {headerImage && (
        <Parallax className="header-image" y={[-20, 20]}>
          <Img fluid={headerImage.childImageSharp.fluid} />
        </Parallax>
      )}
      <div className="container">
        <h1>{title}</h1>

        {sections.map((section, i) => (
          <div className={section.className || ''} key={`section-${i}`}>
            <ReactMarkdown source={section.content} />
          </div>
        ))}
      </div>
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
