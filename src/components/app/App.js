import React, { useEffect } from 'react';
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
import useProducts from '../../hooks/useProducts';
import Footer from '../footer/Footer';
import PageNotFound from '../page-not-found/PageNotFound';

const App = () => {
  const { loginState, email, checkCredentials } = useCredentials();
  const { products, productCategories } = useProducts();
  const { cart, addProductToCart, changeProductQuantity, emptyShoppingCart } =
    useCart();

  useEffect(() => {
    console.log('App is now rendering');
    checkCredentials();
  }, [checkCredentials]);

  return (
    <div className={css['app']}>
      <Header loginState={loginState} email={email} cart={cart} />
      <main>
        <Routes>
          <Route path="/" exact element={<Home />} />

          {/* ------------------------------------ */}
          {/* Routes for Product Category Pages    */}
          {/* ------------------------------------ */}
          {Object.entries(productCategories).map((entries) => {
            const category = entries[0];
            return (
              <Route
                key={category}
                path={`/${category}`}
                exact
                element={
                  <ProductLinks
                    key={category}
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
                  exact
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
          {loginState === 'NOT_LOGGED_IN' && (
            <Route
              path="/cart"
              exact
              element={<div>Please sign in to view your cart.</div>}
            />
          )}
          {loginState === 'LOGGED_IN' && (
            <Route
              path="/cart"
              exact
              element={
                <Cart
                  cartContents={cart}
                  email={email}
                  emptyShoppingCart={emptyShoppingCart}
                  changeProductQuantity={changeProductQuantity}
                />
              }
            />
          )}
          <Route
            path="/order-confirmation"
            exact
            element={<OrderConfirmation />}
          />

          {/* ------------------------------- */}
          {/* Routes for Registration         */}
          {/* ------------------------------- */}
          <Route
            path="/sign-up"
            exact
            element={<Registration registrationType="SIGN_UP" />}
          />
          <Route
            path="/log-in"
            exact
            element={<Registration registrationType="LOG_IN" />}
          />
          <Route
            path="/log-out"
            exact
            element={
              <Registration
                registrationType="LOG_OUT"
                emptyShoppingCart={emptyShoppingCart}
              />
            }
          />
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
