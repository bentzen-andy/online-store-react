import React, { useEffect } from 'react';
import CartProduct from './CartProduct';
import useCredentials from '../../hooks/useCredentials';

const Cart = ({ cartContents }) => {
  // const { shoppingCart, getShoppingCart } = useCredentials();

  // useEffect(() => {
  //   getShoppingCart();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  console.log('Cart - cartContents');
  console.log(cartContents);

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
