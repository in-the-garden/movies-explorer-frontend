import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";
import {Navigate} from "react-router";

function Movies(props) {
  const { onSave, onDelete, isShortMovie, savedMovies, loggedIn } = props;

  const [searchText, setSearchText] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  function handleChangeMoviesRequest(evt) {
    setSearchText(evt.target.value);
  }

  function handleMovieType() {
    setIsShort(!isShort);
  }

  // фильтрация фильмов, полученных с ресурса BeatFilm
  function getRequestParameter(moviesRequest) {
    const { searchText, isShort } = moviesRequest;
    if (searchText === '') {
      setInputError(true);
      setMovies([]);
      localStorage.setItem('requestParameters', JSON.stringify({
        searchText,
        isShort
      }));
    } else {
      setInputError(false);
      setIsLoading(true);

      const allMovies = JSON.parse(localStorage.getItem('allMovies'));

      const filtredMovies = filterMovies(allMovies, searchText.toLowerCase());
      setRequestSuccess(true);
      setRequestError(false);

      if (isShort) {
        const shortMovies = filterShortMovies(filtredMovies);
        setMovies(shortMovies);
        localStorage.setItem('moviesResult', JSON.stringify(shortMovies));
        localStorage.setItem('requestParameters', JSON.stringify({
          searchText,
          isShort
        }));
      } else {
        setMovies(filtredMovies);
        localStorage.setItem('moviesResult', JSON.stringify(filtredMovies));
        localStorage.setItem('requestParameters', JSON.stringify({
          searchText,
          isShort
        }));
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storageMovies = JSON.parse(localStorage.getItem('moviesResult'));
    if (storageMovies) {

      const finalMovies = storageMovies?.map((movie) => {
        if (savedMovies.find((item) => item.nameRU === movie.nameRU)) {
          movie.isSaved = true;
        } else {
          movie.isSaved = false;
        }

        return movie;
      });

      const requestParameters = JSON.parse(localStorage.getItem('requestParameters'));
      setSearchResult(finalMovies);
      setSearchText(requestParameters.searchText);
      setIsShort(requestParameters.isShort);
    }
  }, [movies, savedMovies])

  useEffect(() => {
    const requestParameters = JSON.parse(localStorage.getItem('requestParameters'));
    if(requestParameters) {
      getRequestParameter(requestParameters)
    }
  }, [])

  return (
    loggedIn ?
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={getRequestParameter} onMovieType={handleMovieType} onChange={handleChangeMoviesRequest}
                    movieType={isShortMovie} searchText={searchText} isShort={isShort}/>
        <div className="movies__break"></div>
        { isLoading ? <Preloader /> :
          !requestError ? (
          movies?.length > 0 ? (
            <MoviesCardList movies={searchResult} onSave={onSave} onDelete={onDelete}
                            inputError={inputError} requestError={requestError}
                            requestSuccess={requestSuccess}/>
          ) : inputError ? (
            <p className="movies__caption">Нужно ввести ключевое слово</p>
          ) : requestSuccess && searchResult.length === 0 && (
            <p className="movies__caption">Ничего не найдено</p>
          )) : (
          <p className="movies__caption">Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз</p>
        )}
      </div>
    </section>
      : <Navigate to={'/'} />
  )
};

export default Movies;
