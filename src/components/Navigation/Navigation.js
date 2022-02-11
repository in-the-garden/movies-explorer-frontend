import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import profileLogo from '../../images/profile-logo.svg';
import useWindowDimensions from '../useWindowDimensions';

function Navigation({ location, onMenuPopup, loggedIn }) {
  const { width } = useWindowDimensions();

  return (
    <>
      {location === "/" && !loggedIn ?
        (
          <nav className="navigation__main-links">
            <Link to="/signup" className="navigation__main-link navigation__main-link_transparent">
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__main-link navigation__main-link_green">
              Войти
            </Link>
          </nav>
        ) : width > 768 ? (
          <nav className="navigation__movie">
            <div className="navigation__movie-links">
              <Link to="/movies" className={`navigation__movie-link ${location === "/movies" && 'navigation__movie-link_active'}`}>
                Фильмы
              </Link>
              <Link to="/saved-movies" className={`navigation__movie-link ${location === "/saved-movies" && 'navigation__movie-link_active'}`}>
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className="navigation__profile">
              Аккаунт
              <img className="navigation__icon" src={profileLogo} alt="Иконка личного кабинета" />
            </Link>
          </nav>
        ) : (
          <nav className="navigation__menu">
            <button
              className="navigation__btn"
              type="button"
              onClick={onMenuPopup}
            ></button>
          </nav>
        )
      }
    </>
  );
}

export default Navigation;
