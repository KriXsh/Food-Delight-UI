// src/pages/Recommendations/Recommendations.js

import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import restaurantService from '../../services/restaurantService';
import RestaurantCard from '../../components/Restaurant/RestaurantCard';

const Recommendations = () => {
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const profile = await profileService.getProfile();
        const data = await restaurantService.getRecommendations(profile);
        setRecommendedRestaurants(data);
      } catch (error) {
        console.error('Error fetching recommendations', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendations-page">
      <h2>Recommended for You</h2>
      <div className="restaurant-list">
        {recommendedRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
