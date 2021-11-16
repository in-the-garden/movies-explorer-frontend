import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import { useLocation, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";


function App() {
  const location = useLocation().pathname;
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

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

  return (
    <div className="page">
      <Header location={location} onMenuPopup={handleMenuPopClick} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Menu location={location} state={isMenuPopupOpen} onClose={closePopup}/>
      <Footer location={location} />
    </div>
  );
}

export default App;
