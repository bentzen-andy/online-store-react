import React, { useEffect } from 'react';
import CheckoutProduct from './CheckoutProduct';
import useCredentials from '../../hooks/useCredentials';

const Checkout = () => {
  const { shoppingCart, getShoppingCart } = useCredentials();

  useEffect(() => {
    getShoppingCart();
  }, [getShoppingCart]);

  console.log('Checkout - shoppingCart');
  console.log(shoppingCart);

  return (
    <div>
      {shoppingCart &&
        shoppingCart.map((item) => (
          <CheckoutProduct
            key={item.id}
            name={item.name}
            qty={item.qty}
            price={item.price}
          />
        ))}
    </div>
  );
};

export default Checkout;
