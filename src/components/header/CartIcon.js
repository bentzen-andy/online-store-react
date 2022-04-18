import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import css from './CartIcon.module.css';

const CartIcon = ({ loginState, email, cart }) => {
  const userText =
    loginState === 'LOGGED_IN' ? `Logged in as: ${email}` : 'Not logged in';

  const getCartQuantity = () => {
    return cart.reduce((count, curr) => count + curr.quantity, 0);
  };

  return (
    <div className={css['cart-icon']}>
      {userText}
      {loginState === 'LOGGED_IN' && (
        <Link to="/cart">
          <FaShoppingCart />({getCartQuantity()})
        </Link>
      )}
    </div>
  );
};

export default CartIcon;
