import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";

function Movies({ cardVisibility }) {
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [requestParameter, setRequestParameter] = useState('');
  const [movies, setMovies] = useState([]);

  function handleMovieType() {
    setIsShortMovie(!isShortMovie);
  }

  function getRequestParameter(moviesRequest) {
    setRequestParameter(moviesRequest.toLowerCase());
  }

  useEffect(() => {
    moviesApi.getBeatfilmMovies()
      .then((res) => {
        const filtredMovies = filterMovies(res, requestParameter);

        if(isShortMovie) {
          const shortMovies = filterShortMovies(filtredMovies);
          setMovies(shortMovies);
        } else {
          setMovies(filtredMovies);
        }
      })
      .catch(err => console.log('Ошибка', err));
  },[requestParameter, isShortMovie]);

  console.log(movies)
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={getRequestParameter} onMovieType={handleMovieType} movieType={isShortMovie}/>
        <div className="movies__break"></div>
        <MoviesCardList movies={movies} />
      </div>
    </section>
  )
};

export default Movies;