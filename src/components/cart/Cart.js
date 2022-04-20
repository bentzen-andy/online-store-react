import React, { useState } from 'react';
import CartProduct from './CartProduct';
import OrderForm from './OrderForm';
import { centsToDollars } from '../../utils/money';
import css from './Cart.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The Cart component serves two purposes:
 *    1. It displays the contents of the shopping cart and allows customers
 *       to edit the cart before placing an order.
 *    2. It displays and handles an order for that posts to the sever when
 *       the customer is all done.
 */

const Cart = ({
  cartContents,
  email,
  emptyShoppingCart,
  changeProductQuantity,
}) => {
  const [orderFromIsVisible, setOrderFromIsVisible] = useState(false);

  const showOrderForm = () => {
    setOrderFromIsVisible(true);
  };

  const totalCost = centsToDollars(
    cartContents.reduce((cost, prod) => cost + prod.quantity * prod.price, 0.0)
  );

  return (
    <div className={`${css['cart']} container`}>
      {cartContents.map((item) => (
        <CartProduct
          key={item.productID}
          imageUrl={item.imageUrl}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          productID={item.productID}
          changeProductQuantity={changeProductQuantity}
        />
      ))}
      <div className={css['cart__total']}>
        {cartContents.length === 0
          ? 'Shopping cart is empty.'
          : `Total: ${totalCost}`}
      </div>
      {cartContents.length > 0 && !orderFromIsVisible && (
        <div>
          <button className="btn" onClick={showOrderForm}>
            Create an Order
          </button>
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
