import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import css from './CartIcon.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The CartIcon component renders a little graphic with an incrementing number displaying
 * the quantity of products currently in the cart.
 *
 * This component also displays the users login status. Login status is pulled from the App
 * component which gets this info from the server.
 */

const CartIcon = ({ loginState, email, cart }) => {
  const userText =
    loginState === 'LOGGED_IN' ? `Logged in as: ${email}` : 'Not logged in';

  const getCartQuantity = () => {
    return cart.reduce((count, curr) => count + curr.quantity, 0);
  };

  return (
    <div className={css['cart-icon']}>
      <div className={css['cart-icon__text']}>{userText}</div>
      <Link to="/cart" className={css['cart-icon__icon']}>
        <FaShoppingCart />
        <div className={css['cart-icon__qty']}>({getCartQuantity()})</div>
      </Link>
    </div>
  );
};

export default CartIcon;
