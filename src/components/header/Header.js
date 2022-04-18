import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import css from './Header.module.css';

const Header = ({ loginState, email, cart }) => {
  return (
    <header className={css['header']}>
      <ul>
        <li>
          <Link to="/">ATB Online Store</Link>
        </li>

        <li>
          <Link to="/seating">Seating</Link>
        </li>

        <li>
          <Link to="/tables-and-desks">Desks &amp; Tables</Link>
        </li>

        <li>
          <Link to="/lighting">Lighting</Link>
        </li>

        <li>
          <Link to="/accessories">Accessories</Link>
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

        {loginState === 'LOGGED_IN' && (
          <li>
            <Link to="/cart">Check Out</Link>
          </li>
        )}

        <li>
          <CartIcon loginState={loginState} email={email} cart={cart} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
