import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../home/Home';
import Header from '../header/Header';
import ProductLinks from '../products/ProductLinks';
import Cart from '../cart/Cart';
import css from './App.module.css';
import Registration from '../auth/Registration';
import useCredentials from '../../hooks/useCredentials';
import useCart from '../../hooks/useCart';
import OrderConfirmation from '../cart/OrderConfirmation';
import Product from '../products/Product';

const App = () => {
  const { loginState, email, checkCredentials } = useCredentials();
  const { cart, addProductToCart, changeProductQuantity, emptyShoppingCart } =
    useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch('http://localhost:8080/products', {
    fetch('https://atb-online-store-api.herokuapp.com/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  const productCategories = {};
  products.map((prod) => {
    if (!productCategories[`${prod.category}`]) {
      productCategories[`${prod.category}`] = [];
    }
    productCategories[`${prod.category}`].push(prod.slug);
    return null;
  });

  useEffect(() => {
    console.log('App is rendering');
    checkCredentials();
  }, [checkCredentials]);

  return (
    <div className={css['app']}>
      <Header loginState={loginState} email={email} cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ------------------------------------ */}
        {/* Routes for Product Category Pages    */}
        {/* ------------------------------------ */}
        {Object.entries(productCategories).map((entries) => {
          const category = entries[0];
          return (
            <Route
              path={`/${category}`}
              element={
                <ProductLinks
                  category={category}
                  products={products.filter(
                    (prod) => prod.category === category
                  )}
                />
              }
            />
          );
        })}

        {/* ------------------------------------ */}
        {/* Routes for Product Landing Pages     */}
        {/* ------------------------------------ */}
        {Object.entries(productCategories).map((entries) => {
          const category = entries[0];
          const productNames = entries[1];
          return productNames.map((productName) => {
            const p = products.find((prod) => prod.slug === productName);
            return (
              <Route
                path={`/${category}/${productName}`}
                element={
                  <Product
                    key={p._id}
                    name={p.name}
                    description={p.description}
                    price={p.price}
                    category={p.category}
                    imageUrl={p.imageURL}
                    numberInStock={p.numberInStock}
                    productID={p._id}
                    onClickAddToCart={addProductToCart}
                  />
                }
              />
            );
          });
        })}

        {/* ------------------------------- */}
        {/* Routes for Checkout Process     */}
        {/* ------------------------------- */}
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

        {/* ------------------------------- */}
        {/* Routes for Registration         */}
        {/* ------------------------------- */}
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
