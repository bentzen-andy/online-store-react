import React from 'react';
import css from './Product.module.css';

const Product = ({
  name,
  description,
  price,
  category,
  imageUrl,
  numberInStock,
  sku,
}) => {
  const handleAddToCart = (event) => {
    event.preventDefault();

    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // fetch('http://localhost:8080/cart',
    fetch(
      'https://atb-online-store-api.herokuapp.com/cart',

      // {
      //   method: 'POST',
      //   headers: myHeaders,
      //   mode: 'cors',
      //   cache: 'default',
      //   body: JSON.stringify({ sku }),
      // }
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ sku }),
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className={css['product']}>
      <img className={css['product-img']} src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{category}</div>
      <div>{numberInStock}</div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
