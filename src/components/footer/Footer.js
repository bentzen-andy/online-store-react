import React from 'react';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css['footer']}>
      <ul className={css['footer__box1']}>
        <li>Created by Andy Bentzen</li>
        <li>4/19/2022</li>
        <li>
          Visit my GitHub here:{' '}
          <a href="https://github.com/bentzen-andy/online-store-react">
            https://github.com/bentzen-andy/online-store-react
          </a>{' '}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
