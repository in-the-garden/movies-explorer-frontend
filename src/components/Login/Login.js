import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import EntryForm from '../EntryForm/EntryForm';

import './Login.css';

function Login({ onSubmit, loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [])

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