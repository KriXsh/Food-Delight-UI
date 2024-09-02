// src/services/restaurantService.js

const API_URL = 'http://localhost:3000/api';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return user.token;
  } else {
    throw new Error('No token found');
  }
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Resource not found (404)');
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

const getAllRestaurants = async () => {
  const response = await fetch(`${API_URL}/restaurants`);
  return await handleResponse(response);
};

const getMenu = async (restaurantId) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/menu/${restaurantId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return await handleResponse(response);
};

const getFilteredRestaurants = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/restaurants?${queryParams}`);
  return await handleResponse(response);
};

const getRecommendations = async (profile) => {
  // Mocked recommendation logic based on profile
  const response = await fetch(`${API_URL}/restaurants`);
  return await handleResponse(response);
};

const restaurantService = {
  getAllRestaurants,
  getMenu,
  getFilteredRestaurants,
  getRecommendations,
};

export default restaurantService;
