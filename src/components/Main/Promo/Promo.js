import React, {useEffect} from 'react';
import logo from '../../../images/promo-logo.svg';
import './Promo.css';

function Promo() {


  useEffect(() => {
    const btn = document.querySelector('.promo__btn');

    btn.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockID = btn.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    });
  }, [])

  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__logo" src={logo} alt="Логотип"/>
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__btn" href="#aboutProject">Узнать больше</a>
      </div>
    </section>
  );
}

export default Promo;