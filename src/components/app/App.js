import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Products from '../products/Products';
import Cart from '../products/Cart';

import css from './App.module.css';
import Registration from '../auth/Registration';

const App = () => {
  // const [cartContents, setCartContents] = useState([])

  // const onAddToCart = (product) => {
  //   setCartContents(prevContents => {
  //     return
  //   });
  // }

  return (
    <div className={css['app']}>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
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
