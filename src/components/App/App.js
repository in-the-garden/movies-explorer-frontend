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
  const [savedMovies, setSavedMovies] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [requestParameter, setRequestParameter] = useState('');
  const [requestError, setRequestError] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setLoggedIn(!loggedIn)
  }

  function handleMovieType() {
    setIsShortMovie(!isShortMovie);
  }

  function getRequestParameter(moviesRequest) {
    setRequestParameter(moviesRequest);

    if (moviesRequest === '') {
      setInputError(true);
      setMovies([]);
    } else {
      setInputError(false);
      setIsLoading(true);
      moviesApi.getBeatfilmMovies()
        .then((res) => {
          const filtredMovies = filterMovies(res, moviesRequest.toLowerCase());
          setRequestSuccess(true);
          setRequestError(false);

          if (isShortMovie) {
            const shortMovies = filterShortMovies(filtredMovies);
            setMovies(shortMovies);
            localStorage.setItem('gotMovies', JSON.stringify(shortMovies));
          } else {
            setMovies(filtredMovies);
            localStorage.setItem('gotMovies', JSON.stringify(filtredMovies));
          }
          setIsLoading(false);
        })
        .catch(err => {
          setRequestError(true);
          console.log('Ошибка', err)
        });
    }
  }

  // добавление фильма в сохраненные
  function handleMovieSave(movieCard) {
    if (!movieCard.isSaved) {
      mainApi.createMovie(movieCard)
        .then((movie) => {
          movie.isSaved = true;
          setSavedMovies([movie, ...savedMovies]);
        }).catch(err => console.log('Ошибка', err));
    }
  }

  // удаление фильма из числа сохраненных
  function handleMovieDelete(movieCard) {
    if (movieCard.isSaved) {
      mainApi.deleteMovie(movieCard._id)
        .then((movie) => {
          setSavedMovies(state => state.filter((c) => c._id !== movie._id));
        }).catch(err => console.log('Ошибка', err));
    }
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
    localStorage.removeItem('gotMovies');
    handleLogin();
    navigate('/sign-in');
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

    if (!token) {
      navigate('/signin')
    } else {
      setLoggedIn(true);

      Promise.all([mainApi.getUser(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);

          const myMovies = movies.filter(movie => movie.owner === user._id);
          const myMoviesSaved = myMovies.map(movie => {
            movie.isSaved = true;
            return movie;
          })
          setSavedMovies(myMoviesSaved);
        }).catch(err => console.log('Ошибка', err))
    }
  }, [loggedIn]);

  return (
    <div className="page">
      <Header location={location} onMenuPopup={handleMenuPopClick} loggedIn={loggedIn}/>
      <Menu location={location} state={isMenuPopupOpen} onClose={closePopup}/>
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn}/>} />
        <Route path="signup" element={<Register onSubmit={onRegister} loggedIn={loggedIn}/>} />
        <Route path="signin" element={<Login onSubmit={onLogin} loggedIn={loggedIn}/>} />
        <Route path="profile" element={<Profile onLogout={onLogout} isLoading={isLoading} currentUser={currentUser}
                                                onUpdate={handleUpdateUser}/>} />
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
            isLoading={isLoading}
            requestError={requestError}
            requestSuccess={requestSuccess}
            savedMovies={savedMovies}
          />}
        />
        <Route
          path="saved-movies"
          element={<SavedMovies
            loggedIn={loggedIn}
            onMovieType={handleMovieType}
            isShortMovie={isShortMovie}
            onMoviesRequest={getRequestParameter}
            requestParameter={requestParameter}
            onSave={handleMovieSave}
            onDelete={handleMovieDelete}
            savedMovies={savedMovies}
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer location={location} />
    </div>
  );
}

export default App;
