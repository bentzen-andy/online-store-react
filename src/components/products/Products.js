import React, { useState, useEffect } from 'react';
import Product from '../products/Product';
import css from './Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/products', {
      // fetch('https://atb-online-store-api.herokuapp.com/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={css['products']}>
      {products.map((p) => (
        <Product
          key={p._id}
          name={p.name}
          description={p.description}
          price={p.price}
          category={p.category}
          imageUrl={p.image_url}
          numberInStock={p.number_in_stock}
          id={p._id}
        />
      ))}
    </div>
  );
};

export default Products;
