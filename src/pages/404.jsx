import React from 'react';

import { Link } from 'gatsby';
import bike from '../images/bike.jpeg';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <main className="layout --centered notfound">
    <SEO title="404: Not found" />
    <img alt="Bike background" src={bike} className="notfound__image" />
    <h1>Page not found</h1>
    <p>
      You just hit a route that doesn't exist... The sadness.{' '}
      <span aria-label="sadness emoji" role="img">
        😢
      </span>
    </p>
    <Link to="/">Back to safety</Link>
  </main>
);

export default NotFoundPage;
