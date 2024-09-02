// src/context/CartContext.js


import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => {
      const itemTotal = Number(item.price) * Number(item.quantity);
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.menuItemId === item.menuItemId);

    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.menuItemId === item.menuItemId
          ? { ...cartItem, quantity: cartItem.quantity + Number(item.quantity) }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: Number(item.quantity) || 1 }]);
    }
  };

  const removeItemFromCart = (menuItemId) => {
    const updatedCart = cartItems.filter(item => item.menuItemId !== menuItemId);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
