import React from 'react';

import './SearchForm.css';

function SearchForm( props ) {
  const { searchText, isShort, onChange } = props;

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onMoviesRequest(
      {
        searchText,
        isShort
      }
    );
  }

  return (
  <form className="search-form" onSubmit={handleSubmit} noValidate>
    <div className="search-form__container">
      <input
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        value={searchText}
        onChange={onChange}
        required
      />
      <button className="search-form__btn" type="submit"></button>
    </div>
    <div className="search-form__filter-container">
      <div className="search-form__btns-filter">
        <button className={`search-form__btn-filter ${!isShort && 'visible'}`} type="button" onClick={props.onMovieType}></button>
        <button className={`search-form__btn-filter ${isShort && 'visible'}`} type="button" onClick={props.onMovieType}></button>
      </div>
      Короткометражки
    </div>
  </form>
  )
};

export default SearchForm;
