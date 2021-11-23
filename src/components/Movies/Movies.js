import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';
import filterMovies from "../../utils/moviesFilter";

function Movies({ cardVisibility }) {
  const [requestParameters, setRequestParameters] = useState({moviesRequest: '', isShortMovie: ''});
  const [movies, setMovies] = useState([]);

  function getRequestParameters({ moviesRequest, isShortMovie }) {
    setRequestParameters({moviesRequest: moviesRequest.toLowerCase(), isShortMovie});
  }

  useEffect(() => {
    moviesApi.getBeatfilmMovies()
      .then((res) => {
        const filtredMovies = filterMovies(res, requestParameters.moviesRequest);

        setMovies(filtredMovies);
        console.log(filtredMovies);
      })
      .catch(err => console.log('Ошибка', err));
  },[requestParameters]);

  //useEffect(() => {
  //  setMovies([]);
  //  setRequestParameters({moviesRequest: '', isShortMovie: ''});
  //}, []);
//
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={getRequestParameters}/>
        <div className="movies__break"></div>
        <MoviesCardList movies={movies} />
      </div>
    </section>
  )
};

export default Movies;