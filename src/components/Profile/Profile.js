import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import useFormAndValidation from '../../utils/useFormAndValidation';

import './Profile.css';
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {Navigate} from "react-router";

function Profile({ isLoading, onUpdate, onLogout, loggedIn }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);
  const [buttonDisabled, setButtonDisabled] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(values);
    resetForm();
  };

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true)
    }
  }, [currentUser, resetForm, loggedIn])

  React.useEffect(() => {
    if ((values.name !== currentUser.name || values.email !== currentUser.email) && isValid) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [values.email, isValid, values.name, currentUser.email, currentUser.name])

  return (
    loggedIn ?
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
              value={values.email || ''}
              onChange={handleChange}
              pattern="([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+"
              required/>
            <span className="account__input-error">{errors.email}</span>
          </div>
          { isLoading && <Preloader/> }
          <button className="account__button account__button_white" type="submit"
                  disabled={!buttonDisabled && true}>Редактировать
          </button>
        </form>
        <Link to="/">
          <button className="account__button account__button_pink" type="buttom" onClick={onLogout}>Выйти из
            аккаунта
          </button>
        </Link>
      </div>
    </section>
      : <Navigate to={'/'} />
  )
};

export default Profile;
