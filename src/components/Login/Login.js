import React from 'react';

import EntryForm from '../EntryForm/EntryForm';

import './Login.css';

function Login() {
  return (
    <EntryForm
      isSignUp={false}
      title={'Рады видеть!'}
      buttonTitle={'Войти'}
      message={'Ещё не зарегистрированы?'}
      linkPath={"/signup"}
      linkText={'Регистрация'}
    >
    </EntryForm>
  )
};

export default Login;