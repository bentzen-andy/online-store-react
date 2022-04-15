import React from 'react';

const CartProduct = ({ name, quantity, price }) => {
  const centsToDollars = (num) => `$${(num / 100.0).toFixed(2)}`;

  return (
    <div>
      Item: {name} --- Qty: {quantity} --- Price:{' '}
      {centsToDollars(price * quantity)}
      {/* {prodID} */}
    </div>
  );
};

export default CartProduct;
