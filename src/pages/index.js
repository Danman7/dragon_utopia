import Header from '../components/header'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const { title, lead, content, titleImage } = data.strapiHome

  return (
    <Layout>
      <Helmet>
        <title>The Dragon Utopia</title>
      </Helmet>
      <Header title={title} lead={lead} titleImage={titleImage} />
      <article>
        <ReactMarkdown
          source={content}
          renderers={{
            image: ({ src, alt, title }) => {
              return (
                <>
                  <a href={src}>
                    <img src={src} alt={alt} />
                  </a>
                  {title && <small>{title}</small>}
                </>
              )
            },
          }}
        />
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
