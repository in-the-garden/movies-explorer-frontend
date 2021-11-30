import { useLocation, Route, Routes, useNavigate } from 'react-router';
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

function App() {
  const location = useLocation().pathname;
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [inputError, setInputError] = useState(false);

  function handleLogin() {
    setLoggedIn(!loggedIn)
  }

  function handleMovieType() {
    setIsShortMovie(!isShortMovie);
  }

  function getRequestParameter(moviesRequest) {
    if (moviesRequest === '') {
      setInputError(true);
      setMovies([]);
    } else {
      setInputError(false);
      moviesApi.getBeatfilmMovies()
        .then((res) => {
          const filtredMovies = filterMovies(res, moviesRequest.toLowerCase());

          if (isShortMovie) {
            const shortMovies = filterShortMovies(filtredMovies);
            setMovies(shortMovies);
            localStorage.setItem('movies', shortMovies);
          } else {
            setMovies(filtredMovies);
            localStorage.setItem('movies', filtredMovies);
          }
        })
        .catch(err => console.log('Ошибка', err));
    }
  }

  function handleMovieSave(movieCard) {
    mainApi.createMovie(movieCard);
  }

  function handleMovieDelete(movieCard) {
    mainApi.deleteMovie(movieCard._id);
  }

  // регистрация пользователя
  function onRegister(userInfo) {
    mainApi.register(userInfo).then((res) => {
      onLogin(userInfo)
    }).catch(err => console.log('Ошибка', err)
    )
  }

  // вход в учетную запись
  function onLogin(userInfo) {
    mainApi.login(userInfo).then((res) => {
      if (res.token) {
        handleLogin();
        navigate('/movies');
      } else {
        console.log('Error');
      }
    }).catch(err => console.log('Ошибка', err)
    )
  }

  // редактирование данных о пользователе
  function handleUpdateUser(userInfo) {
    mainApi.updateUserInfo(userInfo).then((res) => {
      setCurrentUser(res);
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
  }, [])

  // получение данных о пользователе и сохраненных фильмах
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin')
    } else {
      setLoggedIn(true);

      mainApi.getUser()
        .then((user) => {
          setCurrentUser(user);
        }).catch(err => console.log('Ошибка', err))
    }
  }, [loggedIn])

  return (
    <div className="page">
      <Header location={location} onMenuPopup={handleMenuPopClick} />
      <Menu location={location} state={isMenuPopupOpen} onClose={closePopup}/>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn}/>} />
        <Route path="signup" element={<Register onSubmit={onRegister} loggedIn={loggedIn}/>} />
        <Route path="signin" element={<Login onSubmit={onLogin} loggedIn={loggedIn}/>} />
        <Route path="profile" element={<Profile loggedIn={loggedIn} currentUser={currentUser} onUpdate={handleUpdateUser}/>} />
        <Route
          path="movies"
          element={<Movies
            loggedIn={loggedIn}
            onMovieType={handleMovieType}
            isShortMovie={isShortMovie}
            onMoviesRequest={getRequestParameter}
            onSave={handleMovieSave}
            onDelete={handleMovieDelete}
            inputError={inputError}
            movies={movies}
          />}
        />
        <Route
          path="saved-movies"
          element={<SavedMovies
            loggedIn={loggedIn}
            onMovieType={handleMovieType}
            isShortMovie={isShortMovie}
            onMoviesRequest={getRequestParameter}
            onSave={handleMovieSave}
            onDelete={handleMovieDelete}
            movies={movies}
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer location={location} />
    </div>
  );
}

export default App;
