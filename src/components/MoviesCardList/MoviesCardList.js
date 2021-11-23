import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useLocation } from 'react-router-dom';
import useWindowDimensions from '../useWindowDimensions';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ movies }) {
  const location = useLocation().pathname;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  let maxCardsCount;
  let increment;

  switch (true) {
    case screenWidth > 319 && screenWidth < 650:
      maxCardsCount = 5;
      increment = 2;
      break;
    case screenWidth > 589 && screenWidth < 1040:
      maxCardsCount = 8;
      increment = 2;
      break;
    case screenWidth > 1039:
      maxCardsCount = 12;
      increment = 3;
      break;
    default:
      maxCardsCount = 5;
  }

  const [cardsLimit, setCardsLimit] = useState(maxCardsCount);

  const showMoreCards = () => {
    setCardsLimit((prev) => prev + increment);
  };

  useEffect(() => {
    function onResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return (
    <section className="card-list">
      <div className="card-list__container">
        {movies.map(movieCard => <MoviesCard key={movieCard.id} movieCard={movieCard} />).slice(0, cardsLimit)}
      </div>
      <button
        className={`card-list__btn ${location === "/movies" ? '' : 'hidden'}`}
        type="button"
        onClick={showMoreCards}
      >
        Ещё
      </button>
    </section>
  )
};

export default MoviesCardList;
