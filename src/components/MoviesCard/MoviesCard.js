import React, { useState } from 'react';
import { useLocation } from 'react-router';

import './MoviesCard.css';
import example from '../../images/mock-card-1.png';

function MoviesCard(props) {
  const [status, setStatus] = useState(false);
  const location = useLocation();

  return (
    <div className="card">
      <img className="card__image" src={example} alt={props.alt} />
      <div className="card__info">
        <h2 className="card__name">{props.name}</h2>
        <p className="card__time">{props.time}</p>
      </div>
      {location.pathname === "/movies" && (
        <button
          className={`card__btn ${status ? 'card__btn_is-saved' : 'card__btn_not-saved'}`}
          type="button"
          onClick={(evt) => evt.preventDefault()}>
          {!status ? 'Сохранить' : ''}
        </button>
      ) || location.pathname === "/saved-movies" && (
        <button
          className="card__btn card__btn_remove"
          type="button"
          onClick={(evt) => evt.preventDefault()}>
        </button>
      )}
    </div>
  )
};

export default MoviesCard;