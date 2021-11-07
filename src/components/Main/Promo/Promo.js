import React from 'react';
import logo from '../../../images/promo-logo.svg';
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <img className="promo__logo" src={logo} alt="Логотип"/>
        <button className="promo__btn" type="button" onclick={(evt) => evt.preventDefault()}>Узнать больше</button>
      </div>
    </section>
  );
}

export default Promo;