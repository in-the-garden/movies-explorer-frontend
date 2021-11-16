import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import cards from '../../assets/mock-cards.json';

function MoviesCardList({ cardVisibility }) {
  return (
    <section className="card-list">
      {cards.map(card => <MoviesCard key={card.id} card={card} />)}
    </section>
  )
};

export default MoviesCardList;