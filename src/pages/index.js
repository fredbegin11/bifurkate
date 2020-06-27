import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import anime from 'animejs/lib/anime.es.js';
import { Link } from 'gatsby';

import demo from '../images/demo.png';
import demo1 from '../images/demo1.png';
import featureIcon1 from '../images/feature-icon-01.svg';
import featureIcon2 from '../images/feature-icon-02.svg';
import featureIcon3 from '../images/feature-icon-03.svg';
import featureIcon4 from '../images/feature-icon-04.svg';
import featureIcon5 from '../images/feature-icon-05.svg';
import featureIcon6 from '../images/feature-icon-06.svg';

import SEO from '../components/seo';
import stravaButton from '../images/stravabutton.png';
import stravaPower from '../images/stravapower.png';

const IndexPage = () => {
  useEffect(() => {
    const doc = document.documentElement;
    doc.classList.remove('no-js');
    doc.classList.add('js');

    const sr = (window.sr = ScrollReveal());

    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'bottom',
      interval: 100,
    });

    doc.classList.add('anime-ready');
    /* global anime */
    anime
      .timeline({
        targets: '.hero-figure-box-05',
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: [0.05, 0.05],
        scaleY: [0, 1],
        perspective: '500px',
        delay: anime.random(0, 400),
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: 1,
      })
      .add({
        duration: 800,
        rotateY: '-15deg',
        rotateX: '8deg',
        rotateZ: '-1deg',
      });

    anime
      .timeline({
        targets: '.hero-figure-box-06, .hero-figure-box-07',
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: [0.05, 0.05],
        scaleY: [0, 1],
        perspective: '500px',
        delay: anime.random(0, 400),
      })
      .add({
        duration: 400,
        easing: 'easeInOutExpo',
        scaleX: 1,
      })
      .add({
        duration: 800,
        rotateZ: '20deg',
      });

    anime({
      targets: '.hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10',
      duration: anime.random(600, 800),
      delay: anime.random(600, 800),
      rotate: [
        anime.random(-360, 360),
        function(el) {
          return el.getAttribute('data-rotation');
        },
      ],
      scale: [0.7, 1],
      opacity: [0, 1],
      easing: 'easeInOutExpo',
    });
  }, []);

  return (
    <>
      <SEO title="Home" />
      <body className="is-boxed has-animations">
        <div className="body-wrap">
          <header className="site-header">
            <div className="container">
              <div className="site-header-inner">
                <div className="brand header-brand">
                  <h1 className="m-0">
                    <span className="landing__main-title">BIFURKATE</span>
                  </h1>
                </div>
              </div>
            </div>
          </header>

          <main>
            <section className="hero">
              <div className="container">
                <div className="hero-inner">
                  <div className="hero-copy">
                    <h1 className="hero-title mt-0">Plan your next route!</h1>
                    <p className="hero-paragraph">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
                    <div className="hero-cta">
                      <Link to="/app" className="landing__button">
                        <img alt="" className="landing__strava" src={stravaButton} />
                      </Link>
                    </div>
                  </div>
                  <div className="hero-figure anime-element">
                    <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                      <rect width="528" height="396" style={{ fill: 'transparent' }} />
                    </svg>
                    <div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
                    <div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
                    <div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
                    <div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
                    <div className="hero-figure-box hero-figure-box-05">
                      <img alt="" src={demo} className="landing__image" />
                    </div>
                    <div className="hero-figure-box hero-figure-box-06">
                      <img alt="" src={demo1} className="landing__image" />
                    </div>
                    <div className="hero-figure-box hero-figure-box-07"></div>
                    <div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
                    <div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
                    <div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="features section">
              <div className="container">
                <div className="features-inner section-inner has-bottom-divider">
                  <div className="features-wrap">
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon1} alt="Feature 01" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon2} alt="Feature 02" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon3} alt="Feature 03" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon4} alt="Feature 04" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon5} alt="Feature 05" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon6} alt="Feature 06" />
                        </div>
                        <h4 className="feature-title mt-24">Be Productive</h4>
                        <p className="text-sm mb-0">
                          Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. A arcu cursus vitae congue mauris. Nam at lectus urna duis convallis. Mauris rhoncus
                          aenean vel elit scelerisque mauris.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="site-footer">
            <div className="container">
              <div className="site-footer-inner">
                <div className="brand footer-brand">
                  <img alt="" className="landing__strava" src={stravaPower} />
                </div>

                <div className="footer-copyright">&copy; 2020 BIFURKATE, all rights reserved</div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </>
  );
};

export default IndexPage;
