import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';

import './MoviesCard.css';

function MoviesCard({ movieCard }) {
  const [status, setStatus] = useState(false);
  const location = useLocation();

  const hours = movieCard.duration && Math.floor(movieCard.duration / 60);
  const minutes = movieCard.duration && movieCard.duration - hours * 60;

  return (
    <a className="card" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
      <img className="card__image" src={`https://api.nomoreparties.co${movieCard.image.url}`} alt={movieCard.nameRU} />
      <div className="card__info">
        <h2 className="card__name">{movieCard.nameRU}</h2>
        <p className="card__time">{hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}</p>
      </div>
      {location.pathname === "/movies" && (
        <button
          className={`card__btn visible
            ${status ? 'card__btn_is-saved' : 'card__btn_not-saved'}`
          }
          type="button"
          onClick={(evt) => evt.preventDefault()}>
          {!status ? 'Сохранить' : ''}
        </button>
      ) || location.pathname === "/saved-movies" && (
        <button
          className="card__btn card__btn_remove visible"
          type="button"
          onClick={(evt) => evt.preventDefault()}>
        </button>
      )}
    </a>
  )
};

export default MoviesCard;