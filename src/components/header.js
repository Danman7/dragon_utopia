import './header.scss'

import BackgroundImage from 'gatsby-background-image'
import React from 'react'

const Header = ({ title, lead, titleImage }) => {
  console.log(titleImage.childImageSharp.fluid.src)
  return (
    <header>
      <BackgroundImage
        className="title-image"
        fluid={titleImage.childImageSharp.fluid}
      >
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="overlay"></div>
      </BackgroundImage>
    </header>
  )
}

export default Header
