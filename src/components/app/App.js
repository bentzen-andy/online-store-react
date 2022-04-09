import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import { getCookie } from '../../utils/cookieHandlers';

// import Cart from '../header/Cart';

import css from './App.module.css';
import Registration from '../auth/Registration';

const App = () => {
  const [loginStatus, setLoginStatus] = useState('NOT_LOGGED_IN');
  getLoginStatus();

  const loginChangeHandler = (status) => {
    setLoginStatus(status);
  };

  async function getLoginStatus() {
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/login/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response');
        console.log(response);
        if (response.status === 'LOGGED_IN') setLoginStatus('LOGGED_IN');
        else setLoginStatus('NOT_LOGGED_IN');
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className={css['app']}>
      <Header loginStatus={loginStatus} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route
          path="/sign-up"
          element={
            <Registration
              registrationType="SIGN_UP"
              onLoginChange={loginChangeHandler}
            />
          }
        />
        <Route
          path="/log-in"
          element={
            <Registration
              registrationType="LOG_IN"
              onLoginChange={loginChangeHandler}
            />
          }
        />
        <Route
          path="/log-out"
          element={
            <Registration
              registrationType="LOG_OUT"
              onLoginChange={loginChangeHandler}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
