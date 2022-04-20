import React from 'react';
import { centsToDollars } from '../../utils/money';
import css from './CartProduct.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The CartProduct components is just an easy way to manage and display the line
 * items that exist in the cart.
 */

const CartProduct = ({
  imageUrl,
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
    <div className={css['cart-item']}>
      <div className={css['cart-product']}>
        <div className={css['cart-product__img-and-name']}>
          <span className={css['cart-product__img']}>
            <img src={imageUrl} alt={name}></img>
          </span>
          <span className={css['cart-product__item']}>{name}</span>
        </div>
        <div className={css['cart-product__details']}>
          <span className={css['cart-product__quantity']}>Qty: {quantity}</span>
          <span className={css['cart-product__price']}>
            {centsToDollars(price * quantity)}
          </span>
          <div className={css['cart-product__increment-decrement']}>
            <button
              className={`${css['cart-product__increment']} btn-sm`}
              id="increment"
              onClick={handleQuantityChange}
            >
              ▲
            </button>
            <button
              className={`${css['cart-product__decrement']} btn-sm`}
              id="decrement"
              onClick={handleQuantityChange}
            >
              ▼
            </button>
          </div>
          <button className="btn" id="remove" onClick={handleQuantityChange}>
            Remove Item
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartProduct;
