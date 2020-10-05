import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Parallax } from 'react-scroll-parallax'

import Layout from '../components/layout'

const IndexPage = ({ data }) => {
  const { title, lead, content, titleImage } = data.strapiHome

  return (
    <Layout>
      <header>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {titleImage && (
          <div className="title-image">
            <Parallax y={[-40, 40]}>
              <Img fluid={titleImage.childImageSharp.fluid} />
            </Parallax>
          </div>
        )}
        <div className="overlay"></div>
      </header>
      <main>
        <ReactMarkdown source={content} />
      </main>
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
