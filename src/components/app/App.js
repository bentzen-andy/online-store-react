import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import Cart from '../cart/Cart';
import css from './App.module.css';
import Registration from '../auth/Registration';
import useCredentials from '../../hooks/useCredentials';

const App = () => {
  const {
    loginState,
    email,
    // shoppingCartQty,
    checkCredentials,
    // getShoppingCart,
  } = useCredentials();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    checkCredentials();
  }, [checkCredentials]);

  // useEffect(() => {
  //   getShoppingCart();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shoppingCartQty]);

  const handleAddToCartClick = (product) => {
    // setTimeout(() => getShoppingCart(), 500);
    setCart((currCart) => {
      let cart = [...currCart];
      const index = cart.findIndex(
        (prod) => prod.productID === product.productID
      );
      if (index >= 0) {
        console.log('index');
        console.log(index);
        console.log('cart[index]');
        console.log(cart[index]);
        cart[index].quantity = cart[index].quantity + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      console.log('cart');
      console.log(cart);

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
          element={<Registration registrationType="LOG_OUT" />}
        />
      </Routes>
    </div>
  );
};

export default App;
