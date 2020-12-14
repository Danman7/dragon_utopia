import './nav.scss'

import React, { useState } from 'react'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const MenuLinks = ({ categories }) => (
  <>
    {categories.map((category) => (
      <div className="dropdown-toggle" key={category.id}>
        <div className="lead">{category.name}</div>

        <div className="dropdown-menu">
          {category.articles.map((article) => (
            <Link
              className="dropdown-item"
              to={`/${article.slug}`}
              key={article.id}
              activeClassName="active"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    ))}

    <Link className="lead" to="/compare-creatures">
      Compare Creatures
    </Link>
  </>
)

const Nav = ({ siteTitle, categories }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)

  return (
    <>
      <nav>
        <Link to="/">
          <h4>
            <i className="game-icon game-icon-spiked-dragon-head"></i>
            {siteTitle}
          </h4>
        </Link>

        <div className="menu-links">
          <MenuLinks categories={categories} />
        </div>

        <i
          className="game-icon game-icon-hamburger-menu mobile-nav"
          role="menu"
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          onKeyDown={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          tabIndex={0}
        ></i>
      </nav>

      {mobileNavIsOpen && (
        <div className="mobile-menu">
          <MenuLinks categories={categories} />
        </div>
      )}
    </>
  )
}

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

export default Nav
