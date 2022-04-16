import React from 'react';
import ProductLink from './ProductLink';
import css from './ProductLinks.module.css';

const ProductLinks = ({ category, products }) => {
  return (
    <div className={css['products']}>
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
