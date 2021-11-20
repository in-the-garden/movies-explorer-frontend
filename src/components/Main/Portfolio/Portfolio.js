import React from 'react';
import './Portfolio.css';
import arrow from '../../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <div className="portfolio__header">Портфолио</div>
        <div className="portfolio__links">
          <a className="portfolio__link" href="https://in-the-garden.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <div className="portfolio__project">
              Статичный сайт
            </div>
            <img className="portfolio__arrow" src={arrow} alt="Иконка для ссылки на проект"/>
          </a>
          <a className="portfolio__link" href="https://in-the-garden.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <div className="portfolio__project">
              Адаптивный сайт
            </div>
            <img className="portfolio__arrow" src={arrow} alt="Иконка для ссылки на проект"/>
          </a>
          <a className="portfolio__link" href="https://mesto.pupkova.nomoredomains.club/" target="_blank" rel="noreferrer">
            <div className="portfolio__project">
              Одностраничное приложение
            </div>
            <img className="portfolio__arrow" src={arrow} alt="Иконка для ссылки на проект"/>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;