import React from 'react';
import { Link } from 'react-router-dom';
import css from './ProductLink.module.css';

const ProductLink = ({ name, slug, category, imageUrl }) => {
  return (
    <span className={css['product-link']}>
      <Link to={`/${category}/${slug}`}>
        <img className={css['product-link-img']} src={imageUrl} alt={name} />
        <div>{name}</div>
      </Link>
    </span>
  );
};

export default ProductLink;
