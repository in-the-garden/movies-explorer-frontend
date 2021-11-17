import React from  'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies({ cardVisibility }) {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm />
        <div className="movies__break"></div>
        <MoviesCardList />
      </div>
    </section>
  )
};

export default Movies;