import React from 'react';

import './SearchForm.css';

function SearchForm() {
  return (
  <form className="search-form">
    <div className="search-form__container">
      <input className="search-form__input" placeholder="Фильм" />
      <button className="search-form__btn" type="submit"></button>
    </div>
    <div className="search-form__type">
      Короткометражки
    </div>
  </form>
  )
};

export default SearchForm;