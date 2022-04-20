import { useEffect, useState } from 'react';

/*
 * Andy Bentzen
 * 4/19/2022
 * Hooks contain all of the complex business logic for the application. These hooks
 * expose state variable and functions that act on those variables (similar to OOP style).
 *
 * This hook gathers the products from the server and then collates the products into their
 * product categories. This makes it easier for the App component to map through the categories
 * and create the routes.
 */

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState({});

  useEffect(() => {
    // fetch('http://localhost:8080/products', {
    fetch('https://atb-online-store-api.herokuapp.com/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  useEffect(() => {
    const productCategories = {};
    products.map((prod) => {
      if (!productCategories[`${prod.category}`]) {
        productCategories[`${prod.category}`] = [];
      }
      productCategories[`${prod.category}`].push(prod.slug);
      return null;
    });
    setProductCategories(productCategories);
  }, [products]);

  return {
    products,
    productCategories,
  };
};

export default useProducts;
