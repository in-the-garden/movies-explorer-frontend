import React from 'react';
import {Navigate} from 'react-router';

import EntryForm from '../EntryForm/EntryForm';

import './Register.css';

function Register({ onSubmit, loggedIn }) {

  return (
    loggedIn ? <Navigate to={'/movies'} /> :
    <EntryForm
      isSignUp={true}
      title={'Добро пожаловать!'}
      buttonTitle={'Зарегистрироваться'}
      message={'Уже зарегистрированы?'}
      linkPath={"/signin"}
      linkText={'Войти'}
      onSubmit={onSubmit}
    >
    </EntryForm>
  )
};

export default Register;
