import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from '../header/Header';
import Home from '../home/Home';
import Cart from '../cart/Cart';
import Registration from '../auth/Registration';
import OrderConfirmation from '../cart/OrderConfirmation';
import ProductLinks from '../products/ProductLinks';
import Product from '../products/Product';
import Footer from '../footer/Footer';
import PageNotFound from '../page-not-found/PageNotFound';

// Hooks
import useCredentials from '../../hooks/useCredentials';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';

// Styles
import css from './App.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The App component served two main functions:
 *   1. Managing state for essentially the entire application.
 *   2. Managing client-side routing, to conditionally render components based
 *      on the URL.
 * First products are pulled from the REST API server and displayed in the product
 * category pages.
 * Next, it creates a shopping cart state variable (along with setter functions) to
 * keep track of what the user puts in the shopping cart.
 * Next App uses a useEffect call which fires every time the App component renders.
 * This sends the "accessToken" to the server to verify whether the credentials are valid.
 * The business logic that handles everything just described in extracted out to the "/src/hooks"
 * directory.
 *
 */

const App = () => {
  // Use React state variable to track whether the user is logged in.
  const { loginState, email, checkCredentials } = useCredentials();

  // Pull all the store's products down from the server.
  const { products, productCategories } = useProducts();

  // Get a list of functions to handel the shopping cart as a React state variable
  const { cart, addProductToCart, changeProductQuantity, emptyShoppingCart } =
    useCart();

  // Check against the server if the user is currently logged in. Logged in users
  /// will have a unique JWT token as a value of their "accessToken" cookie.
  useEffect(() => {
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
              element={
                <div className={css['empty-cart']}>
                  Please sign in to view your cart.
                </div>
              }
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
