import './nav.scss'

import { motion, useCycle } from 'framer-motion'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'

const slashMotion = {
  rest: {
    display: 'none',
    y: 10,
    opacity: 0,
  },
  hover: {
    display: 'block',
    opacity: 1,
    y: 0,
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
            <AniLink
              cover
              bg="#e68a49"
              className="dropdown-item"
              to={`/${article.slug}`}
              key={article.id}
              activeClassName="active"
            >
              {article.title}
            </AniLink>
          ))}
        </motion.div>
      </motion.div>
    ))}

    <AniLink cover bg="#e68a49" className="lead" to="/compare-creatures">
      Compare Creatures
    </AniLink>
  </>
)

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
)

export const MenuToggle = () => (
  <svg width="23" height="23" viewBox="0 0 23 23">
    <Path
      variants={{
        closed: { d: 'M 2 2.5 L 20 2.5' },
        open: { d: 'M 3 16.5 L 17 2.5' },
      }}
    />
    <Path
      d="M 2 9.423 L 20 9.423"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
    />
    <Path
      variants={{
        closed: { d: 'M 2 16.346 L 20 16.346' },
        open: { d: 'M 3 2.5 L 17 16.346' },
      }}
    />
  </svg>
)

const Nav = ({ siteTitle, categories }) => {
  const [mobileNavIsOpen, toggleMobileNavIsOpen] = useCycle(false, true)
  const containerRef = useRef(null)

  return (
    <>
      <nav>
        <AniLink cover bg="#e68a49" to="/">
          <h4>
            <i className="game-icon game-icon-spiked-dragon-head"></i>
            {siteTitle}
          </h4>
        </AniLink>

        <div className="menu-links">
          <MenuLinks categories={categories} />
        </div>

        <motion.div
          initial={false}
          ref={containerRef}
          animate={mobileNavIsOpen ? 'open' : 'closed'}
          className="mobile-nav"
          role="menu"
          tabIndex={0}
          onClick={() => toggleMobileNavIsOpen(!mobileNavIsOpen)}
          onKeyDown={() => toggleMobileNavIsOpen(!mobileNavIsOpen)}
        >
          <MenuToggle isOpen={mobileNavIsOpen} />
        </motion.div>
      </nav>

      <motion.div
        animate={mobileNavIsOpen ? 'visible' : 'hidden'}
        variants={{
          hidden: { display: 'none', height: 0 },
          visible: { display: 'inherit', height: 'auto' },
        }}
        className="mobile-menu"
      >
        <MenuLinks categories={categories} isMobile />
      </motion.div>
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
