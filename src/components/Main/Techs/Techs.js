import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="tech">
      <div className="tech__container">
        <div className="tech__header">Технологии</div>
        <h2 className="tech__title">7 технологий</h2>
        <p className="tech__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="tech__items">
          <li className="tech__item">HTML</li>
          <li className="tech__item">CSS</li>
          <li className="tech__item">JS</li>
          <li className="tech__item">React</li>
          <li className="tech__item">Git</li>
          <li className="tech__item">Express.js</li>
          <li className="tech__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;