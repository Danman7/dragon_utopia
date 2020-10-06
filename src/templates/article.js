import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Parallax } from 'react-scroll-parallax'

import Layout from '../components/layout'

const ArticleTemplate = ({ data }) => {
  const { title, sections, headerImage } = data.strapiArticle

  return (
    <Layout>
      <header>
        <h1>{title}</h1>
        {/* <p className="lead">{lead}</p> */}
        {headerImage && (
          <div className="title-image">
            <Parallax y={[-50, 50]}>
              <Img fluid={headerImage.childImageSharp.fluid} />
            </Parallax>
          </div>
        )}
        <div className="overlay"></div>
      </header>
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
