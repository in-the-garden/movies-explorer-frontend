import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from "../../utils/MainApi";
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    mainApi.getMovies()
      .then((res) => {
        const filtredMovies = filterMovies(res, props.requestParameter.toLowerCase());

        if(props.isShortMovie) {
          const shortMovies = filterShortMovies(filtredMovies);
          setSavedMovies(shortMovies);
          localStorage.setItem('savedMovies', shortMovies);
        } else {
          setSavedMovies(filtredMovies);
          localStorage.setItem('savedMovies', filtredMovies);
        }
      })
    }, [props.requestParameter, props.isShortMovie, props.isSaved])

  return (
    <section className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm onMoviesRequest={props.onMoviesRequest} onMovieType={props.onMovieType} movieType={props.isShortMovie}/>
        <div className="saved-movies__break"></div>
        <MoviesCardList movies={savedMovies} onSave={props.onSave} onDelete={props.onDelete}/>
      </div>
    </section>
  )
};

export default SavedMovies;
