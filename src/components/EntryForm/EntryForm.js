import React from 'react';
import { Link } from 'react-router-dom';

import './EntryForm.css';
import logo from '../../images/header-logo.svg';
import useFormAndValidation from '../../utils/useFormAndValidation';

function EntryForm({ title, isSignUp, buttonTitle, message, linkPath, linkText, onSubmit}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
    resetForm();
  }

  return (
    <section className="entry">
      <div className="entry__container">
        <form className="entry__form" onSubmit={handleSubmit} noValidate>
          <Link to="/" className="entry__logo">
            <img src={logo} alt="Логотип проекта" />
          </Link>
          <h2 className="entry__title">{title}</h2>
          {isSignUp && (
            <>
              <label className="entry__label">Имя</label>
              <input className="entry__input" name="name" type="text" value={values.name || ''} onChange={handleChange} minLength="2" maxLength="30" required/>
              <span className="entry__input-error">{errors.name}</span>
            </>
          )}
          <label className="entry__label">E-mail</label>
          <input className="entry__input" name="email" type="email" value={values.email || ''} onChange={handleChange}
                 pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+" required />
          <span className="entry__input-error">{errors.email}</span>
          <label className="entry__label">Пароль</label>
          <input className="entry__input" name="password" type="password" value={values.password || ''} onChange={handleChange} minLength="2" maxLength="30" required />
          <span className="entry__input-error">{errors.password}</span>
          <button className="entry__button" type="submit" disabled={!isValid && true}>{buttonTitle}</button>
        </form>
        <p className="entry__message">{message}
          <Link className="entry__link" to={linkPath} >{linkText}</Link>
        </p>
      </div>
    </section>
  )
};

export default EntryForm;
