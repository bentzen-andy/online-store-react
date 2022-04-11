import React, { useEffect, useState, useCallback, useMemo } from 'react';
import useCookie from '../../hooks/useCookie';
import { Link } from 'react-router-dom';
import useCredentials from '../../hooks/useCredentials';
import css from './Cart.module.css';

const Cart = ({ loginState, email, cartClicks }) => {
  const { getCookie } = useCookie();
  // const [shoppingCart, setShoppingCart] = useState('');
  // const [memoizedShoppingCart, setMemoizedShoppingCart] = useState([]);
  const { shoppingCart, cartQuantity, getShoppingCart } = useCredentials();

  useEffect(() => {
    getShoppingCart();
  }, [cartClicks]);

  console.log('Cart - shoppingCart');
  console.log(shoppingCart);

  const userText =
    loginState === 'LOGGED_IN' ? `Logged in as: ${email}` : 'Not logged in';

  const cartQty = shoppingCart
    ? shoppingCart.reduce((prev, curr) => prev + curr.qty, 0)
    : 0;

  console.log('Cart - cartQty');
  console.log(cartQty);

  return (
    <div className={css['cart']}>
      {userText}
      {loginState === 'LOGGED_IN' && <Link to="/check-out">({cartQty})</Link>}
    </div>
  );
};

export default Cart;
