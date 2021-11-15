import React from 'react';

import './SearchForm.css';

function SearchForm() {
  return (
  <form className="search-form">
    <div className="search-form__container">
      <input className="search-form__input" placeholder="Фильм" />
      <button className="search-form__btn" type="submit" onClick={(evt) => evt.preventDefault()}></button>
    </div>
    <div className="search-form__filter-container">
      <div className="search-form__btns-filter">
        <button className="search-form__btn-filter" type="button" onClick={(evt) => evt.preventDefault()}></button>
        <button className="search-form__btn-filter visible" type="button" onClick={(evt) => evt.preventDefault()}></button>
      </div>
      Короткометражки
    </div>
  </form>
  )
};

export default SearchForm;