import { useState } from 'react';

/*
 * Andy Bentzen
 * 4/19/2022
 * Hooks contain all of the complex business logic for the application. These hooks
 * expose state variable and functions that act on those variables (similar to OOP style).
 *
 * This hook allows users to add/edit items in the shopping cart.
 */

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
