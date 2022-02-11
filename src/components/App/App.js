import {useLocation, Route, Routes, useNavigate} from 'react-router';
import { useEffect, useState } from "react";

import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';

import './App.css';
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import filterMovies from "../../utils/moviesFilter";
import filterShortMovies from "../../utils/shortMoviesFilter";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const location = useLocation().pathname;
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setLoggedIn(!loggedIn)
  }

  // регистрация пользователя
  function onRegister(userInfo) {
    mainApi.register(userInfo).then((res) => {
      onLogin(userInfo);
    }).catch(err => console.log('Ошибка', err)
    )
  }

  // вход в учетную запись
  function onLogin(userInfo) {
    mainApi.login(userInfo).then((res) => {
      if (res.token) {
        handleLogin();
        window.location.reload();
        navigate('/movies');
      } else {
        console.log('Error');
      }
    }).catch(err => console.log('Ошибка', err)
    )
  }

  // выход из учетной записи
  function onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('requestParameters');
    localStorage.removeItem('moviesResult');
    localStorage.removeItem('savedMovies');
    handleLogin();
    navigate('/sign-in');
  }

  // фильтрация сохранённых фильмов
  function getRequestParameter(moviesRequest) {
    const { searchText, isShort } = moviesRequest;
    const mySavedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    if (searchText === '') {
      setSavedMovies(mySavedMovies);
    } else {
      setIsLoading(true);

      const filtredSavedMovies = filterMovies(mySavedMovies, searchText.toLowerCase());

      if (isShort) {
        const shortSavedMovies = filterShortMovies(filtredSavedMovies);
        setSavedMovies(shortSavedMovies);
      } else {
        setSavedMovies(filtredSavedMovies);
      }
      setTimeout(() => {setIsLoading(false)}, 1000)
    }
  }

  // добавить/убрать фильм в сохраненные
  function handleMovieSave(movieCard) {
    if (!movieCard.isSaved) {
      mainApi.createMovie(movieCard)
        .then((movie) => {
          movie.isSaved = true;
          setSavedMovies([movie, ...savedMovies]);
          localStorage.setItem('savedMovies', JSON.stringify([movie, ...savedMovies]));
        }).catch(err => console.log('Ошибка', err));
    } else {
      const movie = savedMovies.find((movie) => movie.movieId === movieCard.id);
      handleMovieDelete(movie);
    }
  }

  // удаление фильма из числа сохраненных
  function handleMovieDelete(movieCard) {
    if (movieCard.isSaved) {
      mainApi.deleteMovie(movieCard._id)
        .then((movie) => {
          const movies = savedMovies.filter((sm) => sm._id !== movie._id)
          setSavedMovies(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        }).catch(err => console.log('Ошибка', err));
    }
  }

  // редактирование данных о пользователе
  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    mainApi.updateUserInfo(userInfo).then((res) => {
      setCurrentUser(res);
      setIsLoading(false);
      }).catch(err => console.log('Ошибка', err)
    )
  }

  function handleMenuPopClick() {
    setIsMenuPopupOpen(true);
  }

  function closePopup() {
    setIsMenuPopupOpen(false);
  }

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    };
  }

  const handleOverlayClose = (evt)  => {
    if (evt.target.classList.contains('menu')) {
      closePopup();
    };
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', handleOverlayClose);
    return() =>{
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    }
  }, []);

  // получение данных о пользователе и сохраненных фильмах
  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {

      setLoggedIn(true);
      Promise.all([mainApi.getUser(), mainApi.getMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user);

          const myMovies = savedMovies.filter(movie => movie.owner === user._id);
          const myMoviesSaved = myMovies.map(movie => {
            movie.isSaved = true;
            return movie;
          })

          setSavedMovies(myMoviesSaved);
          localStorage.setItem('savedMovies', JSON.stringify(myMoviesSaved));
        }).catch(err => console.log('Ошибка', err))
    }
  }, []);

  useEffect(() => {
    moviesApi.getBeatfilmMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          }).catch(err => console.log('Ошибка', err))
  }, [loggedIn]);

  return (
    <div className="page">
      <Header location={location} onMenuPopup={handleMenuPopClick} loggedIn={loggedIn}/>
      <Menu location={location} state={isMenuPopupOpen} onClose={closePopup}/>
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn}/>} />
        <Route path="signup" element={<Register onSubmit={onRegister} loggedIn={loggedIn}/>} />
        <Route path="signin" element={<Login onSubmit={onLogin} loggedIn={loggedIn}/>} />
        <Route path="profile" element={<Profile onLogout={onLogout} isLoading={isLoading} currentUser={currentUser}
                                                onUpdate={handleUpdateUser} loggedIn={loggedIn}/>} />
        <Route
          path="movies"
          element={<Movies
            loggedIn={loggedIn}
            onSave={handleMovieSave}
            onDelete={handleMovieDelete}
            isLoading={isLoading}
            savedMovies={savedMovies}
          />}
        />
        <Route
          path="saved-movies"
          element={<SavedMovies
            loggedIn={loggedIn}
            onSave={handleMovieSave}
            onDelete={handleMovieDelete}
            onSearch={getRequestParameter}
            isLoading={isLoading}
            savedMovies={savedMovies}
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </CurrentUserContext.Provider>
      <Footer location={location} />
    </div>
  );
}

export default App;
