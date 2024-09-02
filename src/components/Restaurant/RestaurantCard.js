// src/components/Restaurant/RestaurantCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css';
import defaultImage from '../../assets/images/restrunent.gif'; // Fallback image path

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <img src={restaurant.imageUrl || defaultImage} alt={restaurant.name} />
      <div className="restaurant-card-details">
        <h4>{restaurant.name}</h4>
        <p>{restaurant.cuisine}</p>
        <p>Rating: {restaurant.rating}</p>
        <Link to={`/menu/${restaurant.id}`} className="btn-primary">
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
