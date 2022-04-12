import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import useCredentials from '../../hooks/useCredentials';
import css from './Cart.module.css';

const Cart = ({ loginState, email, shoppingCartQty }) => {
  // const { shoppingCart, getShoppingCart } = useCredentials();

  // useEffect(() => {
  //   getShoppingCart();
  // }, [getShoppingCart]);

  // console.log('Cart - shoppingCart');
  // console.log(shoppingCart);

  const userText =
    loginState === 'LOGGED_IN' ? `Logged in as: ${email}` : 'Not logged in';

  // const cartQty = shoppingCart
  //   ? shoppingCart.reduce((prev, curr) => prev + curr.qty, 0)
  //   : 0;

  console.log('shoppingCartQty');
  console.log(shoppingCartQty);

  return (
    <div className={css['cart']}>
      {userText}
      {loginState === 'LOGGED_IN' && (
        <Link to="/check-out">({shoppingCartQty})</Link>
      )}
    </div>
  );
};

export default Cart;
