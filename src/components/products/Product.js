import React from 'react';
import { centsToDollars } from '../../utils/money';
import css from './Product.module.css';

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
      <img className={css['product-img']} src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{description}</div>
      <div>{centsToDollars(price)}</div>
      <div>{category}</div>
      <div>{numberInStock}</div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
