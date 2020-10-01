import './header.scss'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, categories }) => (
  <nav>
    <div className="container">
      <Link className="brand" to="/">
        <i className="game-icon game-icon-spiked-dragon-head"></i>
        {siteTitle}
      </Link>

      {categories.map(category => (
        <div className="dropdown-toggle" key={category.id}>
          {category.name}
          <i className="game-icon game-icon-plain-arrow"></i>

          <div className="dropdown-menu">
            {category.articles.map(article => (
              <Link
                className="dropdown-item"
                to={`/${article.slug}`}
                key={article.id}
              >
                {article.title}
              </Link>
            ))}
          </div>
        </div>
      ))}

      <Link to="/compare-creatures">Compare Creatures</Link>
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
