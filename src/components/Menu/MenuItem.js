// src/components/Menu/MenuItem.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/components.css';
import defaultImage from '../../assets/images/food.gif';

const MenuItem = ({ item }) => {
  const { addItemToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const menuItem = {
      menuItemId: item.id,  // Ensuring the correct ID is passed
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: 1,  // Default quantity to 1 when adding to the cart
      restaurantId: item.restaurantId,  // Adding restaurantId for consistency
      imageUrl: item.imageUrl || defaultImage
    };

    addItemToCart(menuItem);  // Add the item to the cart
    navigate('/cart');    // Redirect to the cart page
  };

  return (
    <div className="menu-item">
      <img src={item.imageUrl || defaultImage} alt={item.name} />
      <div className="menu-item-details">
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p>${item.price}</p>
        <button onClick={handleAddToCart} className="btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
