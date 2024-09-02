// src/pages/Restaurant/RestaurantMenu.js

import React from 'react';
import { useParams } from 'react-router-dom';
import MenuList from '../../components/Menu/MenuList';

const RestaurantMenu = () => {
  const { restaurantId } = useParams(); // Extract restaurantId from URL

  return (
    <div>
      <h2>Menu</h2>
      <MenuList restaurantId={Number(restaurantId)} /> {/* Pass restaurantId to MenuList */}
    </div>
  );
};

export default RestaurantMenu;
