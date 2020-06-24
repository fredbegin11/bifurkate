import React from 'react';
import { Link } from 'gatsby';
import cycling from '../images/cycling.jpg';

import SEO from '../components/seo';
import Header from '../components/Header/header';
import stravaButton from '../images/stravabutton.png';
import stravaPower from '../images/stravapower.png';

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <Header />
    <section className="landing">
      <img alt="" src={cycling} className="landing__image" />
      <article className="landing__card">
        <span className="landing__title">BIFURKATE</span>
        <img alt="" className="landing__strava" src={stravaPower} />

        <hr className="landing__separator" />
        <p className="landing__description">
          A Strava powered journey viewer.
          <br />
          Go find new routes to explore!
        </p>
        <Link to="/app" className="landing__button">
          <img alt="" className="landing__strava" src={stravaButton} />
        </Link>
      </article>
    </section>
  </>
);

export default IndexPage;
