import React, { useEffect } from 'react';
import css from './App.module.css';

function App() {
  useEffect(() => {
    console.log('useEffect - http://localhost:8080/products');
    fetch('http://localhost:8080/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(
      'useEffect - https://atb-online-store-api.herokuapp.com/products'
    );
    fetch('https://atb-online-store-api.herokuapp.com/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return <div className={css['app']}>index</div>;
}

export default App;
