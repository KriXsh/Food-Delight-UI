// src/pages/Home/LandingPage.js

import React, { useState, useEffect } from 'react';
import restaurantService from '../../services/restaurantService';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';
import '../../styles/components.css';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantService.getAllRestaurants();
        if (response && Array.isArray(response.data)) {
          setRestaurants(response.data); // Access the correct data field
        } else {
          console.error('Expected an array but got:', response);
          setRestaurants([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to load restaurants');
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div className="landing-page">
      <h2>Welcome to Food Delight</h2>
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants found</p> // Handle case where there are no restaurants
        )}
      </div>
    </div>
  );
};

export default LandingPage;
