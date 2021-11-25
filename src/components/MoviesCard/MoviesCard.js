import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';

import './MoviesCard.css';

function MoviesCard({ movieCard, onSave, onDelete}) {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation().pathname;

  const hours = movieCard.duration && Math.floor(movieCard.duration / 60);
  const minutes = movieCard.duration && movieCard.duration - hours * 60;


  function handleSaveClick(evt) {
    if (evt.target.classList.contains('card__btn_not-saved')) {
      setIsSaved(!isSaved);
      onSave(movieCard);
    }
  }

  function handleDeleteClick(evt) {
    if (evt.target.classList.contains('card__btn_remove')) {
      setIsSaved(!isSaved);
      onDelete(movieCard);
    }
  }

  return (
    <div className="card" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
      <img
        className="card__image"
        src={location === "/movies" ? `https://api.nomoreparties.co${movieCard.image.url}` : `${movieCard.image}`}
        alt={movieCard.nameRU} />
      <div className="card__info">
        <h2 className="card__name">{movieCard.nameRU}</h2>
        <p className="card__time">{hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}</p>
      </div>
      {location === "/movies" && (
        <button
          className={`card__btn visible
            ${isSaved ? 'card__btn_is-saved' : 'card__btn_not-saved'}`
          }
          type="button"
          onClick={handleSaveClick}>
          {!isSaved ? 'Сохранить' : ''}
        </button>
      ) || location === "/saved-movies" && (
        <button
          className="card__btn card__btn_remove visible"
          type="button"
          onClick={handleDeleteClick}>
        </button>
      )}
    </div>
  )
};

export default MoviesCard;