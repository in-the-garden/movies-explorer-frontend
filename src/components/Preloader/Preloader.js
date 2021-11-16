import React from 'react';

import './Preloader.css'
import {useLocation} from 'react-router';

function Preloader() {
  const location = useLocation();

  return (
    <div className={`preloader ${location.pathname === "/movies" ? '' : 'hidden'}`}>
      <button
        className="preloader__btn"
        type="button"
        onClick={(evt) => evt.preventDefault()}
      >
        Ещё
      </button>
    </div>
  )
};

export default Preloader;