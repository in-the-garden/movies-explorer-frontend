import React from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

import cards from '../../assets/mock-cards.json';

function MoviesCardList({ cardVisibility }) {
  const location = useLocation().pathname;

  return (
    <section className="card-list">
      <div className="card-list__container">
        {cards.map(card => <MoviesCard key={card.id} card={card} />)}
      </div>
      <button
        className={`card-list__btn ${location === "/movies" ? '' : 'hidden'}`}
        type="button"
        onClick={(evt) => evt.preventDefault()}
      >
        Ещё
      </button>
    </section>
  )
};

export default MoviesCardList;
