import React from 'react';

import EntryForm from '../EntryForm/EntryForm';

import './Login.css';

function Login({ onSubmit }) {
  return (
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