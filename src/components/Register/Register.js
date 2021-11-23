import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import EntryForm from '../EntryForm/EntryForm';

import './Register.css';

function Register({ onSubmit, loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [])

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