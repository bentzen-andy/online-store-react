import React from 'react';
import useCredentials from '../../hooks/useCredentials';
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
  const { addToCart } = useCredentials();

  const handleAddToCart = (event) => {
    event.preventDefault();
    console.log('Product - handleAddToCart - productID');
    console.log(productID);
    console.log(typeof productID);
    // addToCart(productID);
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

  const centsToDollars = (num) => `$${(num / 100.0).toFixed(2)}`;

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
