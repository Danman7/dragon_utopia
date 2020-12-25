import { motion, useAnimation } from 'framer-motion'
import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'

import Header from '../components/header'
import Layout from '../components/layout'

const Section = ({ section }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      className={section.className || ''}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, y: 300 },
      }}
    >
      <ReactMarkdown
        source={section.content}
        renderers={{
          image: ({ src, alt, title }) => {
            return (
              <>
                <a href={src}>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
    </motion.div>
  )
}

const ArticleTemplate = ({ data }) => {
  const { title, sections, headerImage, lead } = data.strapiArticle

  return (
    <Layout>
      <Helmet>
        <title>The Dragon Utopia | {title}</title>
      </Helmet>

      <Header title={title} lead={lead} titleImage={headerImage} />

      <article>
        {sections.map((section, i) => (
          <Section section={section} key={`section-${i}`} />
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
