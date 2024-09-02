// src/services/orderService.js

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
    if (response.status === 401) {
      throw new Error('Invalid token. Please log in again.');
    } else if (response.status === 404) {
      throw new Error('Resource not found (404)');
    }
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

const getUserOrders = async () => {
  const token = getToken();

  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return await handleResponse(response);
};

const getOrderStatus = async (orderId) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return await handleResponse(response);
};

const placeOrder = async (orderData) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/orders/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  return await handleResponse(response);
};

const orderService = {
  getUserOrders,
  getOrderStatus,
  placeOrder,
};

export default orderService;
