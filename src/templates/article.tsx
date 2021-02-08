import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { Helmet } from 'react-helmet'
import ReactMarkdown from 'react-markdown'

import Header from '../components/header'
import Layout from '../components/layout'

interface Section {
  className: string
  content: string
}

interface ArticleProps {
  data: {
    strapiArticle: {
      title: string
      lead: string
      headerImage: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
      sections: Section[]
    }
  }
}

const ArticleTemplate = ({ data }: ArticleProps) => {
  const { title, sections, headerImage, lead } = data.strapiArticle

  return (
    <Layout>
      <Helmet>
        <title>The Dragon Utopia | {title}</title>
      </Helmet>

      <Header title={title} lead={lead} titleImage={headerImage} />

      <article>
        {sections.map((section) => (
          <ReactMarkdown
            className={section.className || ''}
            source={section.content}
            renderers={{
              image: ({ src, alt, title }) => {
                return (
                  <>
                    <a href={src}>
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        src={src}
                        alt={alt}
                      />
                    </a>
                    {title && <small className="description">{title}</small>}
                  </>
                )
              },
            }}
          />
        ))}
      </article>
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
