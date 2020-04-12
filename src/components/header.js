import 'bootstrap/js/dist/dropdown'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, categories }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      {siteTitle}
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        {categories.map(category => (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {category.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {category.articles.map(article => (
                <Link className="dropdown-item" to={`/${article.slug}`}>
                  {article.title}
                </Link>
              ))}
            </div>
          </li>
        ))}

        <li className="nav-item">
          <Link className="nav-link" to="/compare-creatures">
            Compare Creatures
          </Link>
        </li>
      </ul>
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
