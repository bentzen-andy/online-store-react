import React from 'react';
import css from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <div className={css['page-not-found']}>
      Something went wrong... Page not found. :(
    </div>
  );
};

export default PageNotFound;
