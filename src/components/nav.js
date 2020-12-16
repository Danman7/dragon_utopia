import './nav.scss'

import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const slashMotion = {
  rest: {
    display: 'none',
    left: 20,
    opacity: 0,
  },
  hover: {
    display: 'block',
    opacity: 1,
    left: -10,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
}

const MenuLinks = ({ categories, isMobile }) => (
  <>
    {categories.map((category) => (
      <motion.div
        className="dropdown-toggle"
        key={category.id}
        initial={isMobile ? undefined : 'rest'}
        whileHover={isMobile ? undefined : 'hover'}
      >
        <div className="lead">{category.name}</div>

        <motion.div variants={slashMotion} className="dropdown-menu">
          {category.articles.sort().map((article) => (
            <Link
              className="dropdown-item"
              to={`/${article.slug}`}
              key={article.id}
              activeClassName="active"
            >
              {article.title}
            </Link>
          ))}
        </motion.div>
      </motion.div>
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
          <MenuLinks categories={categories} isMobile />
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
