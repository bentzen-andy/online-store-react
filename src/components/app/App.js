import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import Checkout from '../checkout/Checkout';
import css from './App.module.css';
import Registration from '../auth/Registration';
import useCredentials from '../../hooks/useCredentials';

const App = () => {
  const { loginState, email, checkCredentials } = useCredentials();

  useEffect(() => {
    checkCredentials();
  }, [checkCredentials]);

  return (
    <div className={css['app']}>
      <Header loginState={loginState} email={email} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/check-out" element={<Checkout />} />
        <Route
          path="/sign-up"
          element={<Registration registrationType="SIGN_UP" />}
        />
        <Route
          path="/log-in"
          element={<Registration registrationType="LOG_IN" />}
        />
        <Route
          path="/log-out"
          element={<Registration registrationType="LOG_OUT" />}
        />
      </Routes>
    </div>
  );
};

export default App;
