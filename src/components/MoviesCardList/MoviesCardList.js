import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList(props) {
  const { movies } = props
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
      { movies?.length > 0 &&
      <>
        <div className="card-list__container">
          {movies.map(movieCard => <MoviesCard key={location === "/movies" ? movieCard.id : movieCard.movieId}
                                               movieCard={movieCard} onSave={props.onSave}
                                               onDelete={props.onDelete}/>).slice(0, cardsLimit)}
        </div>
        {cardsLimit <= movies.length && (
          <button
            className={`card-list__btn ${location === "/movies" ? '' : 'hidden'}`}
            type="button"
            onClick={showMoreCards}
          >
            Ещё
          </button>
        )}
      </>
      }
    </section>
  )
};

export default MoviesCardList;
