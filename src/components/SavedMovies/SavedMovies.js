import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";
import {Navigate} from "react-router";

function SavedMovies(props) {
  const { isShortMovie, isLoading, onSave, onDelete, onSearch, savedMovies, loggedIn } = props;

  const [searchText, setSearchText] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [noSavedMovies, setNoSavedMovies] = useState(false);

  function handleChangeMoviesRequest(evt) {
    setSearchText(evt.target.value);
  }

  function handleMovieType() {
    setIsShort(!isShort);
  }

  useEffect(() => {
    if (savedMovies.length !== 0) {
      setNoSavedMovies(false);
    } else {
      setNoSavedMovies(true);
    }
  }, [savedMovies])

  return (
    loggedIn ?
    <section className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm onMoviesRequest={onSearch} onMovieType={handleMovieType} onChange={handleChangeMoviesRequest}
                    movieType={isShortMovie} searchText={searchText} isShort={isShort}/>
        <div className="saved-movies__break"></div>
        { isLoading ? <Preloader /> :
          !noSavedMovies && savedMovies.length === 0 ? <p className="saved-movies__caption">Ничего не найдено</p> :
            <MoviesCardList movies={savedMovies} onSave={onSave} onDelete={onDelete}/> }
      </div>
    </section>
      : <Navigate to={'/'} />
  )
};

export default SavedMovies;
