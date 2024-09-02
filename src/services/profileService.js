// src/services/profileService.js

const API_URL = 'http://localhost:3000/api';

const getToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    } catch (error) {
      console.error('Failed to parse user token from localStorage', error);
      return null;
    }
  }
  return null;
};

const getProfile = async () => {
  const token = getToken();

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/profile/myProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  const data = await response.json();
  return data;
};

const updateProfile = async (profileData) => {
  const token = getToken();

  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_URL}/profile/updateProfile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  const data = await response.json();
  return data;
};

const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
