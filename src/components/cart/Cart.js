import React from 'react';
import CartProduct from './CartProduct';

const Cart = ({ cartContents }) => {
  return (
    <div>
      {cartContents.map((item) => (
        <CartProduct
          key={item.productID}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Cart;
