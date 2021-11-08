import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import profileLogo from '../../images/profile-logo.svg';

function Navigation({ location }) {
  console.log(location)
  return (
    <>
      {location === "/" ?
        (
          <nav className="navigation__main-links">
            <Link to="/signup" className="navigation__main-link navigation__main-link_transparent">
              Регистрация
            </Link>
            <Link to="/signin" className="navigation__main-link navigation__main-link_green">
              Войти
            </Link>
          </nav>
        ) : (
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
        )
      }
    </>
  );
}

export default Navigation;