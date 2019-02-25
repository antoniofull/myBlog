import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import scrollToElement from 'scroll-to-element';

import { ThemeProvider } from '../components/ThemeContext';

import IndexLayout from '../layouts/IndexLayout';
import Observable from '../components/Observable';
import HomePageTemplate from '../templates/HomePageTemplate';
import Footer from '../components/footer/Footer';

import '../styles/variables.css';
import '../styles/reset.css';
import '../styles/animations.css';
import '../styles/typography.css';
import '../styles/grid.css';
import '../styles/helpers.css';
import '../styles/global.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: (typeof window !== `undefined` && window.innerWidth) || 0,
      mailTooltip: false
    };

    // Observables Components
    this.onIntersection = this.onIntersection.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    // Calculate Viewport
    this.onResize = this.onResize.bind(this);

    // Navigation Actions
    this.renderEmailMenu = this.renderEmailMenu.bind(this);
    this.toggleMobileLinks = this.toggleMobileLinks.bind(this);
    this.closeEmailLink = this.closeEmailLink.bind(this);
    this.copyEmailToClipboard = this.copyEmailToClipboard.bind(this);
    this.setEmailLink = this.setEmailLink.bind(this);
    // Home Page background Theming
    this.setBackground = this.setBackground.bind(this);
  }

  componentDidMount() {
    this.resizeTimer;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.onResize, 0);
      });
    }
    this.setBackground();
    this.LazyLoadImages();

    const smoothscroll = require('smoothscroll-polyfill');
    // Smooth Scrolling polifyll for IOS and old browsers
    smoothscroll.polyfill();
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
    clearTimeout(this.resizeTimer);
  }

  setBackground(theme = 'primary-light') {
    this.setState({
      ...this.state,
      theme,
      showMobileLinks: theme !== 'white'
    });
  }

  toggleMobileLinks() {
    this.setState({
      ...this.state,
      showMobileLinks: !this.state.showMobileLinks
    });
  }

  onResize() {
    this.setState({
      ...this.state,
      viewport:
        typeof window != `undefined` ? window.innerWidth : this.state.viewport
    });
  }

  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const src = target.dataset.src;
        const theme = target.dataset.theme;
        const animation = target.dataset.animation;
        if (animation) {
          this.setAnimation(target);
        }
        if (theme) {
          this.setBackground(theme);
        }
        if (src) {
          this.loadImage(entry.target);
        }
      }
    });
  }

  setAnimation(e) {
    if (!e) {
      return;
    }
    e.src = e.dataset.src;
    e.classList.add('animated', e.dataset.animation);
  }

  loadImage(e) {
    if (!e) {
      return;
    }
    e.classList.add('animated', 'fadeIn');
    e.src = e.dataset.src;
  }

  LazyLoadImages() {
    const config = {
      rootMargin: '0px',
      threshold: 0.4
    };

    let imgObserver = new IntersectionObserver(this.onIntersection, config);
    const images = document.querySelectorAll('img');
    images.forEach(image => {
      imgObserver.observe(image);
    });
  }

  renderEmailMenu(e) {
    e.preventDefault();
    this.setState({
      mailMenu: !this.state.mailMenu,
      showMobileLinks: false
    });
  }

  copyEmailToClipboard() {
    const mail = 'hello@antoniofullone.com';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = mail;
    input.setAttribute('readonly', '');
    input.style.position = 'absolute';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) {
      this.setState({
        ...this.state,
        mailMessage: true,
        mailMenu: false
      });
    }
    window.setTimeout(() => {
      this.setState({
        ...this.state,
        mailMessage: false
      });
    }, 2500);
    document.body.removeChild(input);
  }

  closeEmailLink(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      mailMessage: false
    });
  }

  setEmailLink(e) {
    const mail = 'hello@antoniofullone.com';
    e.target.setAttribute('href', `mailto:${mail}`);
  }

  scrollToSection(e) {
    const target = e.target.getAttribute('href');
    const isLocalLink = target.startsWith('#');

    if (isLocalLink) {
      const elementToScroll = document.querySelector(target);
      e.preventDefault();
      // Get Header height + some space
      const height =
        target === '#home'
          ? 0
          : document.querySelector('.site-header').clientHeight + 15;
      scrollToElement(elementToScroll, {
        offset: height * -1,
        ease: 'inBack',
        duration: 600
      });
    }
  }

  render() {
    const value = {
      ...this.state,
      animateElement: this.onIntersection,
      scroll: this.scrollToSection,
      toggleMobileLinks: this.toggleMobileLinks,
      toggleEmailMenu: this.renderEmailMenu,
      copyEmailToClipboard: this.copyEmailToClipboard,
      setEmailLink: this.setEmailLink,
      closeEmailLink: this.closeEmailLink
    };
    return (
      <ThemeProvider value={value}>
        <IndexLayout>
          <HomePageTemplate />
          <StaticQuery
            query={graphql`
              query SiteTitleQuery {
                site {
                  siteMetadata {
                    title
                    description
                  }
                }
              }
            `}
            render={data => (
              <Helmet>
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                  integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                  crossorigin="anonymous"
                />
                <link
                  rel="stylesheet"
                  href="https://indestructibletype.com/fonts/Bodoni/Bodoni.css"
                  type="text/css"
                  charset="utf-8"
                />
                <title>{data.site.siteMetadata.title}</title>
                <meta
                  name="description"
                  content={data.site.siteMetadata.description}
                />
                <script src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CIntersectionObserver%2CIntersectionObserverEntry" />
              </Helmet>
            )}
          />

          <Observable
            element="footer"
            id="site-footer"
            data-theme="primary-light"
            config={{ threshold: 0.3 }}
            className="site-footer"
            callback={this.onIntersection}
          >
            <Footer />
          </Observable>
        </IndexLayout>
      </ThemeProvider>
    );
  }
}

export default Index;