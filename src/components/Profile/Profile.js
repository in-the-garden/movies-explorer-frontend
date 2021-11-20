import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Profile.css';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className="account">
      <div className="account__container">
        <form className="account__form" noValidate>
          <h2 className="account__title">Привет, Виталий!</h2>
          <div className="account__input-area">
            <label className="account__label">Имя</label>
            <input className="account__input" name="name" type="text" minLength="2" maxLength="30" value="Виталий" required/>
            {isEdit && <span className="account__input-error">Ошибка</span>}
          </div>
          <div className="account__input-area">
            <label className="account__label">E-mail</label>
            <input className="account__input" name="email" type="email" value="pochta@yandex.ru" required/>
            {isEdit && <span className="account__input-error">Ошибка</span>}
          </div>
          <button className="account__button account__button_white" type="submit">Редактировать</button>
        </form>
        <Link to="/">
          <button className="account__button account__button_pink" type="submit">Выйти из аккаунта</button>
        </Link>
      </div>
    </section>
  )
};

export default Profile;