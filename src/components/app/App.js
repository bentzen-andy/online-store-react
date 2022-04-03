import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from '../products/Products';
import Cart from '../products/Cart';

import css from './App.module.css';

const App = () => {
  // const [cartContents, setCartContents] = useState([])

  // const onAddToCart = (product) => {
  //   setCartContents(prevContents => {
  //     return
  //   });
  // }

  return (
    <div className={css['app']}>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
