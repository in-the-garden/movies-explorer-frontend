import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

function Movies(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesApi.getBeatfilmMovies()
      .then((res) => {
        const filtredMovies = filterMovies(res, props.requestParameter);

        if(props.isShortMovie) {
          const shortMovies = filterShortMovies(filtredMovies);
          setMovies(shortMovies);
        } else {
          setMovies(filtredMovies);
        }
      })
      .catch(err => console.log('Ошибка', err));
  },[props.requestParameter, props.isShortMovie]);

  console.log(movies)
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={props.onMoviesRequest} onMovieType={props.onMovieType} movieType={props.isShortMovie}/>
        <div className="movies__break"></div>
        <MoviesCardList movies={movies} onSave={props.onSave} onDelete={props.onDelete}/>
      </div>
    </section>
  )
};

export default Movies;