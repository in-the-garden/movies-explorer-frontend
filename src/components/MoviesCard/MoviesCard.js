import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';

import './MoviesCard.css';

function MoviesCard({ card }) {
  const [status, setStatus] = useState(false);
  const location = useLocation();

  return (
    <div className="card">
      <img className="card__image" src={card.image} alt={card.alt} />
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <p className="card__time">{card.time}</p>
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
    </div>
  )
};

export default MoviesCard;