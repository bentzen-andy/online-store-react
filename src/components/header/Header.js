import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

import css from './Header.module.css';

const Header = ({ loginStatus }) => {
  return (
    <header className={css['header']}>
      <ul>
        <li>
          <Link to="/">Store</Link>
        </li>

        {loginStatus === 'NOT_LOGGED_IN' && (
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        )}

        {loginStatus === 'NOT_LOGGED_IN' && (
          <li>
            <Link to="/log-in">Log In</Link>
          </li>
        )}

        {loginStatus === 'LOGGED_IN' && (
          <li>
            <Link to="/log-out">Log Out</Link>
          </li>
        )}

        <li>
          <Cart loginStatus={loginStatus} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
