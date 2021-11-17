import React from 'react';

import EntryForm from '../EntryForm/EntryForm';

import './Register.css';

function Register() {
  return (
    <EntryForm
      isSignUp={true}
      title={'Добро пожаловать!'}
      buttonTitle={'Зарегистрироваться'}
      message={'Уже зарегистрированы?'}
      linkPath={"/signin"}
      linkText={'Войти'}
    >
    </EntryForm>
  )
};

export default Register;