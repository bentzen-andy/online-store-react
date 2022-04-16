import { useState } from 'react';
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState({});

  const getProducts = () => {
    // fetch('http://localhost:8080/products', {
    fetch('https://atb-online-store-api.herokuapp.com/products', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  };

  const getProductCategories = () => {
    const categories = {};
    products.map((prod) => {
      if (!categories[`${prod.category}`]) {
        categories[`${prod.category}`] = [];
      }
      categories[`${prod.category}`].push(prod.slug);
      return null;
    });
    setProductCategories(categories);
    console.log('categories');
    console.log(categories);
  };

  return {
    products,
    productCategories,
    getProducts,
    getProductCategories,
  };
};

export default useProducts;
