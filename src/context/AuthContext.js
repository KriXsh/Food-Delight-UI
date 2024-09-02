// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    navigate('/login'); // Redirect to login after logout
  }, [navigate]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('userToken');
    if (storedUser && token) {
      const tokenExpiry = JSON.parse(atob(token.split('.')[1])).exp * 1000;
      if (Date.now() < tokenExpiry) {
        setUser(storedUser);
      } else {
        alert('Session expired. Please log in again.');
        logout();
      }
    }
  }, [logout]);

  const login = async (email, password) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('userToken', loggedInUser.token); // Store the token separately
      navigate('/'); // Redirect to home after login
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
