// src/components/Restaurant/RestaurantFilter.js

import React from 'react';
import '../../styles/components.css';

const RestaurantFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="restaurant-filter">
      <label>
        Cuisine:
        <input
          type="text"
          name="cuisine"
          value={filters.cuisine}
          onChange={handleChange}
          placeholder="e.g., Italian, Chinese"
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="e.g., New York, San Francisco"
        />
      </label>
      <label>
        Rating:
        <input
          type="number"
          name="rating"
          value={filters.rating}
          onChange={handleChange}
          placeholder="e.g., 4.5"
        />
      </label>
      <label>
        Price Range:
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
    </div>
  );
};

export default RestaurantFilter;
