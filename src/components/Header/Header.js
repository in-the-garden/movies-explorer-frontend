import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ location }) {
  let headerClassname;

      switch (location) {
        case "/movies":
          headerClassname = "header header_movies";
          break;
        case "/saved-movies":
          headerClassname = "header header_movies";
          break;
        case "/profile":
          headerClassname = "header header_movies";
          break;
        case "/":
          headerClassname = "header";
          break;
        default:
          headerClassname = "header header_hidden";
  }

  return (
    <header className={headerClassname}>
      <div className={`header__container ${location === "/" && 'header__container_main'}`}>
        <Link to="/">
          <img className="header__logo" src={logo} alt="Логотип сайта"/>
        </Link>
        <Navigation location={location}/>
      </div>
    </header>
  );
}

export default Header;