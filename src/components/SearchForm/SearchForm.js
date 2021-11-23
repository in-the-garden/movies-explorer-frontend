import React, { useState } from 'react';

import './SearchForm.css';

function SearchForm(props) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [moviesRequest, setMoviesRequest] = useState('');

  function handleChangeMoviesRequest(evt) {
    setMoviesRequest(evt.target.value);
  }

  function handleMovieType() {
    setIsShortMovie(!isShortMovie);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onMoviesRequest({
      moviesRequest,
      isShortMovie
    });
  }

  return (
  <form className="search-form" onSubmit={handleSubmit}>
    <div className="search-form__container">
      <input
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        value={moviesRequest}
        onChange={handleChangeMoviesRequest}
        required
      />
      <button className="search-form__btn" type="submit"></button>
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