import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const { onMoviesRequest, onMovieType, onSave, onDelete, isShortMovie,
    movies, inputError, requestError, requestSuccess } = props;

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm onMoviesRequest={onMoviesRequest} onMovieType={onMovieType} movieType={isShortMovie}/>
        <div className="movies__break"></div>
        { !requestError ? (
          movies.length > 0 ? (
            <MoviesCardList movies={movies} onSave={onSave} onDelete={onDelete}
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
