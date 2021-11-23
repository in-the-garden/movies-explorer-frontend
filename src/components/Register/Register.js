import React from 'react';

import EntryForm from '../EntryForm/EntryForm';

import './Register.css';

function Register({ onSubmit }) {
  return (
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