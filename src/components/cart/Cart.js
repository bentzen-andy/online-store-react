import React, { useState } from 'react';
import CartProduct from './CartProduct';
import OrderForm from './OrderForm';
import { centsToDollars } from '../../utils/money';
import css from './Cart.module.css';

const Cart = ({
  cartContents,
  email,
  emptyShoppingCart,
  changeProductQuantity,
}) => {
  const [orderFromIsVisible, setOrderFromIsVisible] = useState(false);

  console.log('Cart - email');
  console.log(email);
  console.log('Cart - cartContents');
  console.log(cartContents);

  const showOrderForm = () => {
    setOrderFromIsVisible(true);
  };

  const totalCost = centsToDollars(
    cartContents.reduce((cost, prod) => cost + prod.quantity * prod.price, 0.0)
  );

  return (
    <div className={css['cart']}>
      {cartContents.map((item) => (
        <CartProduct
          key={item.productID}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          productID={item.productID}
          changeProductQuantity={changeProductQuantity}
        />
      ))}
      {cartContents.length === 0
        ? 'Shopping cart is empty.'
        : `Total: ${totalCost}`}
      {cartContents.length > 0 && !orderFromIsVisible && (
        <div>
          <button onClick={showOrderForm}>Create an Order</button>
        </div>
      )}
      {cartContents.length > 0 && orderFromIsVisible && (
        <OrderForm
          cartContents={cartContents}
          email={email}
          emptyShoppingCart={emptyShoppingCart}
        />
      )}
    </div>
  );
};

export default Cart;
