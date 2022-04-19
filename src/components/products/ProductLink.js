import React from 'react';
import { Link } from 'react-router-dom';
import css from './ProductLink.module.css';

/*
 * Andy Bentzen
 * 4/19/2022
 * The ProductLink component is intended to be rendered within a loop. The idea here is
 * that the App component will pull down a long list of products from the server and then
 * create a route for each one. In this way each product will get its own landing page
 * that the user can navigate to.
 */

const ProductLink = ({ name, slug, category, imageUrl }) => {
  return (
    <div className={css['product-link']}>
      <Link to={`/${category}/${slug}`}>
        <img className={css['product-link__img']} src={imageUrl} alt={name} />
        <div className={css['product-link__subtext']}>{name}</div>
      </Link>
    </div>
  );
};

export default ProductLink;
