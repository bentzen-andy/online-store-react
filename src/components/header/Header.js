import React from 'react';
import { Link } from 'react-router-dom';

import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css['header']}>
      <ul>
        <li>
          <Link to="/">Store</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/log-in">Log In</Link>
        </li>
        <li>
          <Link to="/log-out">Log Out</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
