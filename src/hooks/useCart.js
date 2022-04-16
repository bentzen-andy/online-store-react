import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  const addProductToCart = (product) => {
    setCart((currCart) => {
      let cart = [...currCart];
      const index = cart.findIndex(
        (prod) => prod.productID === product.productID
      );
      // handel case where product is already in cart; just add to the quantity.
      if (index >= 0) {
        cart[index].quantity = cart[index].quantity + 1;
      }
      // handel case for when the product is not already in the cart.
      else {
        product.quantity = 1;
        cart.push(product);
      }

      return cart;
    });
  };

  const changeProductQuantity = (productID, quantityChange) => {
    console.log('App - changeProductQuantity');
    console.log(productID);
    console.log(quantityChange);
    setCart((contents) => {
      let cart = [...contents];

      const index = cart.findIndex((prod) => prod.productID === productID);
      if (index >= 0) {
        cart[index].quantity = cart[index].quantity + quantityChange;
      }
      if (cart[index].quantity < 1) {
        cart.splice(index, 1);
      }
      return cart;
    });
  };

  const emptyShoppingCart = () => setCart([]);

  return {
    cart,
    setCart,
    addProductToCart,
    changeProductQuantity,
    emptyShoppingCart,
  };
};

// export
export default useCart;
