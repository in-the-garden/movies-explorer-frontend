import React from 'react';
import { Link } from 'react-router-dom';

import './EntryForm.css';
import logo from '../../images/header-logo.svg';

function EntryForm({ title, isSignUp, buttonTitle, message, linkPath, linkText }) {
  return (
    <section class="entry">
      <div className="entry__container">
        <form className="entry__form" noValidate>
          <img className="entry__logo" src={logo} alt="Логотип проекта" />
          <h2 className="entry__title">{title}</h2>
          {isSignUp && (
            <>
              <label className="entry__label">Имя</label>
              <input className="entry__input" name="name" type="text" minLength="2" maxLength="30" required/>
              <span className="entry__input-error">Ошибка</span>
            </>
          )}
          <label className="entry__label">E-mail</label>
          <input className="entry__input" name="email" type="email" required />
          <span className="entry__input-error">Ошибка</span>
          <label className="entry__label">Пароль</label>
          <input className="entry__input" name="password" type="password" minLength="2" maxLength="30" required />
          <span className="entry__input-error">Ошибка</span>
          <button className="entry__button" type="submit">{buttonTitle}</button>
        </form>
        <p className="entry__message">{message}
          <Link className="entry__link" to={linkPath} >{linkText}</Link>
        </p>
      </div>
    </section>
  )
};

export default EntryForm;