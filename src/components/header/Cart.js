import React, { useEffect, useState } from 'react';
import css from './Cart.module.css';
import { getCookie } from '../../utils/cookieHandlers';

const Cart = ({ loginStatus }) => {
  const [user, setUser] = useState('Not logged in');

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    fetch('http://localhost:8080/login/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response');
        console.log(response);
        if (response.status === 'LOGGED_IN') setUser(response.email);
        else setUser('Not logged in');
      })
      .catch((err) => console.error(err));
  }, [loginStatus]);

  return <div className={css['cart']}>username: {user}</div>;
};

export default Cart;
