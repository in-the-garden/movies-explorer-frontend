import React from  'react';
import SearchForm from '../SearchFrom/SearchForm';

import './Movies.css';

function Movies() {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm />
      </div>
    </section>
  )
};

export default Movies;