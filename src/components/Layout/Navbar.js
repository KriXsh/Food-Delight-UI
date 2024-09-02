// src/components/Layout/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import defaultImage from '../../assets/images/food.gif'; // Importing the image

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={defaultImage} alt="Food Delight Logo" className="navbar-logo" /> {/* Using the image */}
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
