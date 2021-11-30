import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

function Movies(props) {
  const { onMoviesRequest, onMovieType, onSave, onDelete, isShortMovie, movies, inputError } = props;

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={onMoviesRequest} onMovieType={onMovieType} movieType={isShortMovie}/>
        <div className="movies__break"></div>
        <MoviesCardList movies={movies} onSave={onSave} onDelete={onDelete} inputError={inputError}/>
      </div>
    </section>
  )
};

export default Movies;