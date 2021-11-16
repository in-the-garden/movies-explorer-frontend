import React from 'react';
import { Link } from "react-router-dom";

import './Menu.css';
import profileLogo from "../../images/profile-logo.svg";

function Menu({ location, state, onClose }) {
  return (
    <div className={`menu ${state ? 'visible' : ''}`}>
      <div className="menu__container">
        <div className="menu__links">
          <Link
            to="/"
            className={`menu__link ${location === "/" && 'menu__link_active'}`}
          >
            Главная
          </Link>
          <Link
            to="/movies"
            className={`menu__link ${location === "/movies" && 'menu__link_active'}`}
          >
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className={`menu__link ${location === "/saved-movies" && 'menu__link_active'}`}
          >
            Сохранённые фильмы
          </Link>
        </div>
        <Link to="/profile" className="menu__profile">
          Аккаунт
          <img className="menu__icon" src={profileLogo} alt="Иконка личного кабинета" />
        </Link>
        <button
          className="menu__btn-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
};

export default Menu;