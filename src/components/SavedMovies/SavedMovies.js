import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

function SavedMovies(props) {
  const { savedMovies, isShortMovie, requestParameter, onMoviesRequest, onMovieType, onSave, onDelete } = props;

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const filtredMovies = filterMovies(savedMovies, requestParameter.toLowerCase());

    if(isShortMovie) {
      const shortMovies = filterShortMovies(filtredMovies);
      setSearchResult(shortMovies);
    } else {
      setSearchResult(filtredMovies);
    }
  }, [requestParameter, isShortMovie, savedMovies])

  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm onMoviesRequest={onMoviesRequest} onMovieType={onMovieType} movieType={isShortMovie}/>
        <div className="saved-movies__break"></div>
        <MoviesCardList movies={searchResult} onSave={onSave} onDelete={onDelete}/>
      </div>
    </section>
  )
};

export default SavedMovies;
