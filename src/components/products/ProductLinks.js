import React from 'react';
import ProductLink from './ProductLink';
import css from './ProductLinks.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The ProductLinks component is intended to be rendered within a loop. The idea here is
 * that the App component will pull down a list of product categories from the server and then
 * create a route for each one. In this way each product category (Seating, Desks, etc.)
 * will get its own page to display a listing of products.
 */

const ProductLinks = ({ category, products }) => {
  return (
    <div className={css['product-links']}>
      {products.map((p) => (
        <ProductLink
          key={p._id}
          name={p.name}
          slug={p.slug}
          category={p.category}
          imageUrl={p.imageURL}
        />
      ))}
    </div>
  );
};

export default ProductLinks;
