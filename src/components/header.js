import './header.scss'

import { motion } from 'framer-motion'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const Header = ({ title, lead, titleImage }) => {
  return (
    <header>
      <BackgroundImage
        className="title-image"
        fluid={titleImage.childImageSharp.fluid}
      >
        <h1>{title}</h1>
        <motion.hr
          animate={{
            width: ['0em', '50em'],
            opacity: [0, 1],
          }}
          transition={{ duration: 1 }}
        />
        <p className="lead">{lead}</p>
        <div className="overlay"></div>
      </BackgroundImage>
    </header>
  )
}

export default Header
