import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import css from './Header.module.css';

const Header = ({ loginState, email, cartClicks }) => {
  return (
    <header className={css['header']}>
      <ul>
        <li>
          <Link to="/">Store</Link>
        </li>

        {loginState === 'NOT_LOGGED_IN' && (
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        )}

        {loginState === 'NOT_LOGGED_IN' && (
          <li>
            <Link to="/log-in">Log In</Link>
          </li>
        )}

        {loginState === 'LOGGED_IN' && (
          <li>
            <Link to="/log-out">Log Out</Link>
          </li>
        )}

        <li>
          <Cart loginState={loginState} email={email} cartClicks={cartClicks} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
