import React from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import example1 from '../../images/mock-card-1.png';
import example2 from '../../images/mock-card-2.png';
import example3 from '../../images/mock-card-3.png';

function MoviesCardList() {
  return (
    <section className="card-list">
      <MoviesCard
        image={example1}
        name={'Баския: Взрыв реальности'}
        time={'1ч 17м'}
      />
      <MoviesCard
        image={example2}
        name={'Бег это свобода'}
        time={'1ч 17м'}
      />
      <MoviesCard
        image={example3}
        name={'Книготорговцы'}
        time={'1ч 17м'}
      />
    </section>
  )
};

export default MoviesCardList;