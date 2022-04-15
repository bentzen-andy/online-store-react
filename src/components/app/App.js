import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import Cart from '../cart/Cart';
import css from './App.module.css';
import Registration from '../auth/Registration';
import useCredentials from '../../hooks/useCredentials';

const App = () => {
  const { loginState, email, checkCredentials } = useCredentials();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('App is rendering');
    checkCredentials();
  }, [checkCredentials]);

  const clearShoppingCartOnLogOff = () => {
    setCart([]);
  };

  const handleAddToCartClick = (product) => {
    setCart((currCart) => {
      let cart = [...currCart];
      const index = cart.findIndex(
        (prod) => prod.productID === product.productID
      );
      // handel case where product is already in cart; just add to the quantity.
      if (index >= 0) {
        cart[index].quantity = cart[index].quantity + 1;
      }
      // handel case for when the product is not already in the cart.
      else {
        product.quantity = 1;
        cart.push(product);
      }

      return cart;
    });
  };

  return (
    <div className={css['app']}>
      <Header loginState={loginState} email={email} cart={cart} />
      <Routes>
        <Route
          path="/"
          element={<Products onClickAddToCart={handleAddToCartClick} />}
        />
        <Route path="/cart" element={<Cart cartContents={cart} />} />
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
              clearShoppingCartOnLogOff={clearShoppingCartOnLogOff}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
