import './header.scss'

import { motion } from 'framer-motion'
import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const Header = ({ title, lead, titleImage, className = '' }) => {
  return (
    <header className={className}>
      <BackgroundImage
        className="title-image"
        fluid={titleImage.childImageSharp.fluid}
      >
        <motion.h1
          animate={{
            x: [200, 0],
            opacity: [0, 1],
          }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
        <motion.hr
          animate={{
            width: ['0em', '50em'],
            opacity: [0, 1],
          }}
          transition={{ duration: 1 }}
        />
        <motion.p
          className="lead"
          animate={{
            x: [-200, 0],
            opacity: [0, 1],
          }}
          transition={{ duration: 1 }}
        >
          {lead}
        </motion.p>
        <a href="#main-content">
          <motion.i
            initial={false}
            animate={{ y: [30, 40] }}
            transition={{ repeat: Infinity, duration: 1, repeatType: 'mirror' }}
            className="scroll-arrow game-icon game-icon-plain-arrow"
          ></motion.i>
        </a>
        <div className="overlay"></div>
      </BackgroundImage>
    </header>
  )
}

export default Header
