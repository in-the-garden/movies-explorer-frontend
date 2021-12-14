import React from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/useFormAndValidation';

import './Profile.css';

function Profile({ loggedIn, currentUser, onUpdate, onLogout }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...values, email: currentUser.email });
    resetForm();
  };

  return (
    <section className="account">
      <div className="account__container">
        <form className="account__form" onSubmit={handleSubmit} noValidate>
          <h2 className="account__title">Привет, {currentUser.name}!</h2>
          <div className="account__input-area">
            <label className="account__label">Имя</label>
            <input
              className="account__input"
              name="name"
              type="text"
              placeholder={currentUser.name}
              value={values.name || ''}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required/>
            <span className="account__input-error">{errors.name}</span>
          </div>
          <div className="account__input-area">
            <label className="account__label">E-mail</label>
            <input
              className="account__input"
              name="email" type="email"
              placeholder={currentUser.email}
              value={values.email || ''}
              onChange={handleChange}
              disabled={true}
              required/>
            <span className="account__input-error">{errors.email}</span>
          </div>
          <button className="account__button account__button_white" type="submit" disabled={!isValid && true}>Редактировать</button>
        </form>
        <Link to="/">
          <button className="account__button account__button_pink" type="buttom" onClick={onLogout}>Выйти из аккаунта</button>
        </Link>
      </div>
    </section>
  )
};

export default Profile;
