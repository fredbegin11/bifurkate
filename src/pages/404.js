import React from 'react';

import bike from '../images/bike.jpeg';
import SEO from '../components/seo';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <main className="layout --centered notfound">
    <SEO title="404: Not found" />
    <img src={bike} className="notfound__image" />
    <h1>Page not found</h1>
    <p>You just hit a route that doesn't exist... The sadness. 😢</p>
    <Link to="/">Back to safety</Link>
  </main>
);

export default NotFoundPage;
