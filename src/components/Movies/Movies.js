import React from  'react';
import SearchForm from '../SearchFrom/SearchForm';

import './Movies.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function Movies() {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm />
        <MoviesCard
          name={'Баския: Взрыв реальности'}
          time={'1ч 17м'}
        />
      </div>
    </section>
  )
};

export default Movies;