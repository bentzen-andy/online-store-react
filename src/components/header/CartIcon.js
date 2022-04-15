import React from 'react';
import { Link } from 'react-router-dom';
import css from './CartIcon.module.css';

const CartIcon = ({ loginState, email, cart }) => {
  const userText =
    loginState === 'LOGGED_IN' ? `Logged in as: ${email}` : 'Not logged in';

  console.log('cart');
  console.log(cart);
  const getCartQuantity = () => {
    console.log('cart');
    console.log(cart);
    console.log('typeof cart');
    console.log(typeof cart);
    return cart.reduce((count, curr) => count + curr.quantity, 0);
  };

  return (
    <div className={css['cart-icon']}>
      {userText}
      {loginState === 'LOGGED_IN' && (
        <Link to="/cart">({getCartQuantity()})</Link>
      )}
    </div>
  );
};

export default CartIcon;
