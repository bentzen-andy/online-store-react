import React from 'react';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css['footer']}>
      <ul>
        <li>footer_item1</li>
        <li>footer_item2</li>
        <li>footer_item3</li>
      </ul>
    </footer>
  );
};

export default Footer;
