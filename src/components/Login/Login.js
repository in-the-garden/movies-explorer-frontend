import React from 'react';
import {Navigate} from 'react-router';

import EntryForm from '../EntryForm/EntryForm';

import './Login.css';

function Login({ onSubmit, loggedIn }) {

  return (
    loggedIn ? <Navigate to={'/movies'} /> :
    <EntryForm
      isSignUp={false}
      title={'Рады видеть!'}
      buttonTitle={'Войти'}
      message={'Ещё не зарегистрированы?'}
      linkPath={"/signup"}
      linkText={'Регистрация'}
      onSubmit={onSubmit}
    >
    </EntryForm>
  )
};

export default Login;
