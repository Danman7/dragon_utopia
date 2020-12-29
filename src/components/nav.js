import './nav.scss'

import { motion, useCycle } from 'framer-motion'
import { Link } from 'gatsby'
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

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#fff"
    strokeLinecap="round"
    {...props}
  />
)

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 40px 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

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
        <Link to="/">
          <h4>
            <i className="game-icon game-icon-spiked-dragon-head"></i>
            {siteTitle}
          </h4>
        </Link>

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
