import { useEffect, useState } from 'react';

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
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
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
    console.log('productCategories');
    console.log(productCategories);
  }, [products]);

  return {
    products,
    productCategories,
  };
};

export default useProducts;
