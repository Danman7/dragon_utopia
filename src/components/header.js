import Img from 'gatsby-image'
import React from 'react'
import { Parallax } from 'react-scroll-parallax'

const Header = ({ title, lead, titleImage }) => {
  console.log(titleImage)
  return (
    <header>
      <h1>{title}</h1>
      <p>{lead}</p>
      <div className="title-image">
        <Parallax y={[-50, 50]}>
          <Img fluid={titleImage.childImageSharp.fluid} />
        </Parallax>
      </div>
      <div className="overlay"></div>
    </header>
  )
}

export default Header
