import React from 'react';
import PropTypes from 'prop-types';

const Temp = ({ companies }) => (
  <article className="work--temp">
    <header>
      <h2>Work</h2>
    </header>
    <p className="work-intro">
      A new portfolio with personal and work projects not protected by DNA is
      coming soon. You can check the links in the
      <a href="#about">about</a>
      section. Here is a list of the major companies I worked for in the last
      years.
    </p>
    <div className="companies">
      {companies.map(company => (
        <a href={company.link} key={company.id}>
          <figure>
            <img src={company.img} alt={company.label} />
            {/* <figcaption>{company.label}</figcaption> */}
          </figure>
        </a>
      ))}
    </div>
  </article>
);

Temp.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.any).isRequired
};
export default Temp;