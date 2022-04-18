import React from 'react';
import { Link } from 'react-router-dom';
import css from './ProductLink.module.css';

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
