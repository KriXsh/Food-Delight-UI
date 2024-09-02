// src/pages/Restaurant/RestaurantList.js

import React, { useState, useEffect } from 'react';
import restaurantService from '../../services/restaurantService';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';
import RestaurantFilter from '../../components/Restaurant/RestaurantFilter';
import '../../styles/components.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    cuisine: '',
    location: '',
    rating: '',
    priceRange: ''
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getFilteredRestaurants(filters);

        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          setRestaurants([]); // Ensure restaurants is always an array
          console.error('Data fetched is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
    };

    fetchRestaurants();
  }, [filters]);

  return (
    <div className="restaurant-list-page">
      <h2>Restaurants</h2>
      <RestaurantFilter filters={filters} setFilters={setFilters} />
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants found</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
