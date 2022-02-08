import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const { onMoviesRequest, onMovieType, onSave, onDelete, isShortMovie,
    movies, savedMovies, inputError, requestParameter, requestError, requestSuccess } = props;

  const [resultMovies, setResultMovies] = useState([]);

  useEffect(() => {
    const storageMovies = JSON.parse(localStorage.getItem('gotMovies'));

    if (storageMovies) {
      const finalMovies = movies.map((movie) => {
        if (savedMovies.find((item) => item.nameRU === movie.nameRU)) {
          movie.isSaved = true;
        } else {
          movie.isSaved = false;
        }

        return movie;
      });

      setResultMovies(finalMovies);
    }
  }, [movies, savedMovies])

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={onMoviesRequest} onMovieType={onMovieType} movieType={isShortMovie}/>
        <div className="movies__break"></div>
        { !requestError ? (
          movies.length > 0 ? (
            <MoviesCardList movies={resultMovies} onSave={onSave} onDelete={onDelete}
                            inputError={inputError} requestError={requestError}
                            requestSuccess={requestSuccess}/>
          ) : inputError ? (
            <p className="movies__caption">Нужно ввести ключевое слово</p>
          ) : requestSuccess && movies.length === 0 && (
            <p className="movies__caption">Ничего не найдено</p>
          )) : (
          <p className="movies__caption">Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз</p>
        )}
      </div>
    </section>
  )
};

export default Movies;
