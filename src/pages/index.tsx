import { motion, useAnimation } from 'framer-motion'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { ReactNode, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useInView } from 'react-intersection-observer'
import ReactMarkdown from 'react-markdown'

import Header from '../components/header'
import Layout from '../components/layout'

const fadeVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.9 },
}

const slideVariants = (direction?: string) => ({
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: direction ? 100 : -100 },
})

const Element = ({
  children,
  variants = fadeVariants,
}: {
  children: ReactNode
  variants?: { visible: any; hidden: any }
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={{
        duration: 2,
        type: 'spring',
      }}
    >
      {children}
    </motion.div>
  )
}

interface HomeProps {
  data: {
    strapiHome: {
      title: string
      lead: string
      titleImage: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
      content: string
    }
  }
}

const IndexPage = ({ data }: HomeProps) => {
  const { title, lead, content, titleImage } = data.strapiHome

  return (
    <Layout>
      <Helmet>
        <title>The Dragon Utopia</title>
      </Helmet>
      <Header
        title={title}
        lead={lead}
        titleImage={titleImage}
        className="full-size"
      />
      <article id="main-content">
        <ReactMarkdown
          source={content}
          renderers={{
            heading: ({
              level,
              children,
            }: {
              level: 1 | 2 | 3 | 4 | 5
              children: ReactNode
            }) => {
              const CustomTag = `h${level}` as keyof JSX.IntrinsicElements

              return (
                <Element variants={slideVariants()}>
                  <CustomTag>{children}</CustomTag>
                </Element>
              )
            },
            blockquote: ({ children }: { children: ReactNode }) => (
              <Element>
                <blockquote>{children}</blockquote>
              </Element>
            ),
            paragraph: ({ children }: { children: ReactNode }) => (
              <Element>
                <p>{children}</p>
              </Element>
            ),
            image: ({
              src,
              alt,
              title,
            }: {
              src: string
              alt: string
              title?: string
            }) => {
              return (
                <Element variants={slideVariants('right')}>
                  <a href={src}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      src={src}
                      alt={alt}
                    />
                  </a>
                  {title && <small className="description">{title}</small>}
                </Element>
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
