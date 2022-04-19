import React from 'react';
import { centsToDollars } from '../../utils/money';
import css from './Product.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The Product component is a product detail page. It is intended to give the customer
 * in-depth details on the product and give them a chance to add the product to the cart.
 */

const Product = ({
  name,
  description,
  price,
  category,
  imageUrl,
  numberInStock,
  productID,
  onClickAddToCart,
}) => {
  const handleAddToCart = (event) => {
    event.preventDefault();
    const product = {
      name,
      description,
      price,
      category,
      imageUrl,
      numberInStock,
      productID,
    };

    onClickAddToCart(product);
  };

  return (
    <div className={css['product']}>
      <img className={css['product__img']} src={imageUrl} alt={name} />
      <div className={css['product__description']}>
        <div>{name}</div>
        <div>{description}</div>
        <div>{centsToDollars(price)}</div>
        <div>Product Type: {category}</div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
