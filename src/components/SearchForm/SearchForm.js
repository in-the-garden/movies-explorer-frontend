import React, { useState } from 'react';

import './SearchForm.css';

function SearchForm() {
  const [isShortMovie, setIsShortMovie] = useState(false);

  function handleMovieType() {
    setIsShortMovie(!isShortMovie);
  }

  return (
  <form className="search-form">
    <div className="search-form__container">
      <input className="search-form__input" placeholder="Фильм" required/>
      <button className="search-form__btn" type="submit" onClick={(evt) => evt.preventDefault()}></button>
    </div>
    <div className="search-form__filter-container">
      <div className="search-form__btns-filter">
        <button className={`search-form__btn-filter ${!isShortMovie && 'visible'}`} type="button" onClick={handleMovieType}></button>
        <button className={`search-form__btn-filter ${isShortMovie && 'visible'}`} type="button" onClick={handleMovieType}></button>
      </div>
      Короткометражки
    </div>
  </form>
  )
};

export default SearchForm;