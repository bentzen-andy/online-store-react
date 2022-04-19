import React from 'react';
import { centsToDollars } from '../../utils/money';

const CartProduct = ({
  name,
  quantity,
  price,
  productID,
  changeProductQuantity,
}) => {
  const handleQuantityChange = (event) => {
    const changeType = event.target.id;
    let quantityChange = 0;
    if (changeType === 'increment') quantityChange = 1;
    if (changeType === 'decrement') quantityChange = -1;
    if (changeType === 'remove') quantityChange = -quantity;

    changeProductQuantity(productID, quantityChange);
  };

  return (
    <div>
      Item: {name} --- Qty: {quantity} --- Price:{' '}
      {centsToDollars(price * quantity)}
      <button id="increment" onClick={handleQuantityChange}>
        ▲
      </button>
      <button id="decrement" onClick={handleQuantityChange}>
        ▼
      </button>
      <button id="remove" onClick={handleQuantityChange}>
        Remove Item
      </button>
    </div>
  );
};

export default CartProduct;
