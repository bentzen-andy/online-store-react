import React from 'react';

const CheckoutProduct = ({ name, qty, price }) => {
  const centsToDollars = (num) => `$${(num / 100.0).toFixed(2)}`;

  return (
    <div>
      Item: {name} --- Qty: {qty} --- Price: {centsToDollars(price * qty)}
    </div>
  );
};

export default CheckoutProduct;
