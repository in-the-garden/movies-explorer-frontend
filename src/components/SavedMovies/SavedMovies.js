import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ cardVisibility }) {
  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm />
        <div className="saved-movies__break"></div>
        <MoviesCardList />
        <Preloader />
      </div>
    </section>
  )
};

export default SavedMovies;