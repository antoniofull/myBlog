import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import classNames from 'classnames';

import { aboutText, socialData, files, websites } from '../../data';
import img from '../../images/me.png';
import Aside from './AsideContent';
import { ThemeConsumer } from '../ThemeContext';

const Article = styled.article``;

const About = () => (
  <ThemeConsumer>
    {({ visibleElement }) => (
      <section data-area="about" className="about-section" id="about">
        <Article
          element={visibleElement}
          className={classNames('about', 'container', 'has-gutter-outside', {
            animated: visibleElement === 'about'
          })}
        >
          <header className="js-animatable" data-animation="fadeInUp">
            <h1 className="freight-sans--bold">Ciao! Nice to meet you!</h1>
          </header>
          <figure data-animation="fadeIn" className="js-animatable">
            <img
              className="about__img"
              alt="Surfing in the Canary Islands"
              data-src={img}
            />
            <figcaption className="img-caption freight-sans--light">
              Surfing in the Canary Islands. Photo credits:
              <a href="https://surfingtherapy.es">Surfing Therapy</a>
              <div className="img-divider" />
            </figcaption>
          </figure>
          <div
            data-theme="white"
            data-animation="fadeIn"
            className="js-animatable about__content"
          >
            <ReactMarkdown source={aboutText} />
          </div>
          <aside className="about__links has-shadows">
            <Aside socialData={socialData} files={files} websites={websites} />
          </aside>
        </Article>
        <button type="button" className="btn btn--rounded btn--cta btn--about">
          <i className="fas fa-link" />
        </button>
      </section>
    )}
  </ThemeConsumer>
);

export default About;
