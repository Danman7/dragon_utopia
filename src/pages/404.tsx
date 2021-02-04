import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const windmil = require('../images/windmill.gif')

const NotFoundPage = () => (
  <Layout>
    <div className="dummy-header">
      <br />
    </div>

    <article>
      <SEO title="404: Not found" />
      <img src={windmil} alt="Windmill" />
      <p className="lead">
        Milord, I am sorry, there is no gold currently available here. Please,
        try again with a different URL.
      </p>
      <p>
        Or try the <Link to="/">homepage</Link>.
      </p>
    </article>
  </Layout>
)

export default NotFoundPage
