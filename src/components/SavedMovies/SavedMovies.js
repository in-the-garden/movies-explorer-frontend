import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies() {
  return (
    <section className="saved-movies">
      <div className="saved-movies">
        <SearchForm />
        <div className="saved-movies__break"></div>
        <MoviesCardList />
      </div>
    </section>
  )
};

export default SavedMovies;