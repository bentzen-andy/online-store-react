import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import Cart from '../cart/Cart';
import css from './App.module.css';
import Registration from '../auth/Registration';
import useCredentials from '../../hooks/useCredentials';
import useCart from '../../hooks/useCart';
import OrderConfirmation from '../cart/OrderConfirmation';

const App = () => {
  const { loginState, email, checkCredentials } = useCredentials();
  const { cart, addProductToCart, changeProductQuantity, emptyShoppingCart } =
    useCart();

  useEffect(() => {
    console.log('App is rendering');
    checkCredentials();
  }, [checkCredentials]);

  return (
    <div className={css['app']}>
      <Header loginState={loginState} email={email} cart={cart} />
      <Routes>
        <Route
          path="/"
          element={<Products onClickAddToCart={addProductToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartContents={cart}
              email={email}
              emptyShoppingCart={emptyShoppingCart}
              changeProductQuantity={changeProductQuantity}
            />
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
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
          element={
            <Registration
              registrationType="LOG_OUT"
              emptyShoppingCart={emptyShoppingCart}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
