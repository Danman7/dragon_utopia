import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'
import { Parallax } from 'react-scroll-parallax'

const IndexPage = ({ data }) => {
  const { title, lead, content, titleImage } = data.strapiHome

  return (
    <Layout>
      <div className="title-wrapper">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">{title}</h1>
            <hr className="my-4" />
            <p className="lead">{lead}</p>
          </div>
        </div>
        <div className="overlay"></div>
        <div className="site-title-image">
          <Parallax y={[-40, 40]}>
            <Img fixed={titleImage.childImageSharp.fixed} />
          </Parallax>
        </div>
      </div>
      <div className="container home-content">
        <ReactMarkdown source={content} />
      </div>
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
          fixed(width: 1200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
