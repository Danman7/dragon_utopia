import './header.scss'

import React from 'react'

const Header = ({ title, lead, titleImage }) => {
  console.log(titleImage.childImageSharp.fluid.src)
  return (
    <header>
      <h1>{title}</h1>
      <p>{lead}</p>
      <div
        className="title-image"
        style={{
          background: `url(${titleImage.childImageSharp.fluid.src}) no-repeat center`
        }}
      ></div>
      <div className="overlay"></div>
    </header>
  )
}

export default Header
