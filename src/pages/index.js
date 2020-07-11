import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Link } from 'gatsby';

import demo from '../images/demo.png';
import demo1 from '../images/demo1.png';
import featureIcon1 from '../images/feature-icon-01.svg';
import featureIcon2 from '../images/feature-icon-02.svg';
import featureIcon3 from '../images/feature-icon-03.svg';
import github from '../images/github.png';

import SEO from '../components/seo';
import stravaButton from '../images/stravabutton.png';
import stravaPower from '../images/stravapower.png';

const IndexPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ScrollReveal = require('scrollreveal');
      const doc = document.documentElement;
      doc.classList.remove('no-js');
      doc.classList.add('js');

      const sr = (window.sr = ScrollReveal.default());

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
    }
  }, []);

  return (
    <>
      <SEO title="Home" />
      <div className="is-boxed has-animations">
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
                    <h1 className="hero-title mt-0">Find some inspiration!</h1>
                    <p className="hero-paragraph">
                      Like the saying goes, you need to know where you've been to know where you're going. If you find yourself tired of riding the same old routes or running the
                      same old path, don't worry, you're not alone.
                      <br />
                      <br />
                      Login with the button right below to visualize where you tend to go and let it inspire you to go somewhere new!
                    </p>

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
                        <h4 className="feature-title mt-24">Find some inspiration</h4>
                        <p className="text-sm mb-0">Tired of riding in the same three old routes? Check your ride history and let it inspire you to try new routes!</p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon2} alt="Feature 02" />
                        </div>
                        <h4 className="feature-title mt-24">Visualize your activities</h4>
                        <p className="text-sm mb-0">A powerful visualization tool to analyze your past rides, runs, walks and hikes. Why? Because everyone loves data!</p>
                      </div>
                    </div>
                    <div className="feature text-center is-revealing">
                      <div className="feature-inner">
                        <div className="feature-icon">
                          <img src={featureIcon3} alt="Feature 03" />
                        </div>
                        <h4 className="feature-title mt-24">Compare your seasons</h4>
                        <p className="text-sm mb-0">Want to see if your riding habit has changed between years? You can filter your rides by seasons!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <section className="cta section">
            <div className="container">
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/8CcQjqgjwjM?vq=hd1080&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&color=white&disablekb=1"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="demo"
                ></iframe>
              </div>
              <div className="cta-inner section-inner">
                <h3 className="section-title mt-0">Still not convinced? Give it a try, it's free!</h3>
                <div className="cta-cta">
                  <a href="/app">
                    <img alt="" className="landing__strava" src={stravaButton} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <footer className="site-footer">
            <div className="container">
              <div className="site-footer-inner">
                <div className="footer-social-links">
                  <a href="https://github.com/fredbegin11/bifurkate" target="_blank" rel="noopener noreferrer">
                    <span className="screen-reader-text">Github</span>
                    <img src={github} alt="" width={30} height={30} />
                  </a>
                </div>

                <div className="brand footer-brand">
                  <img alt="" className="landing__strava" src={stravaPower} />
                </div>
                <Link className="landing__policy" to="/privacy">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
