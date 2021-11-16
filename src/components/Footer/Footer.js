import React from 'react';

import './Footer.css';

function Footer({ location }) {
  let footerClassName;

  switch (location) {
    case "/":
      footerClassName = "footer";
      break;
    case "/movies":
      footerClassName = "footer";
      break;
    case "/saved-movies":
      footerClassName = "footer";
      break;
    default:
      footerClassName = "footer footer_hidden";
  }

  return (
    <section className={footerClassName}>
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__date">&copy; 2021</p>
        <div className="footer__items">
          <a className="footer__item">Яндекс.Практикум</a>
          <a className="footer__item">Github</a>
          <a className="footer__item">Facebook</a>
        </div>
      </div>
    </section>
  )
};

export default Footer;