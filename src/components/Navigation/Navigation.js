import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import profileLogo from '../../images/profile-logo.svg';

function Navigation({ location }) {
  console.log(location)
  return (
    <nav className="navigation">
      {location === "/" ?
        (
          <nav className="navigation__main">
            <Link to="/signup" className="navigation__link navigation__link_transparent">
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__link navigation__link_green">
              Войти
            </Link>
          </nav>
        ) : (
          <nav className="navigation__movies">
            <Link to="/movies" className="navigation__link navigation__link_transparent">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__link navigation__link_transparent">
              Сохранённые фильмы
            </Link>
            <Link to="/profile" className="navigation__link navigation__link_transparent">
              Аккаунт
              <img className="navigation__icon" src={profileLogo} alt="Иконка личного кабинета" />
            </Link>
          </nav>
        )
      }
    </nav>

  );
}

export default Navigation;