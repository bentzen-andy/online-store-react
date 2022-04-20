import React from 'react';
import { Link } from 'react-router-dom';
import css from './OrderConfirmation.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The OrderConfirmation is self-explanatory
 */

const OrderConfirmation = () => {
  return (
    <div className={css['order-confirmation']}>
      Thank you! Your order has been processed.
      <div>
        <Link to="/"> Return to the homepage</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
