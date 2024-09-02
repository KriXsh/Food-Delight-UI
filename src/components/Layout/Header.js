// src/components/Layout/Header.js

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Login from '../../pages/Auth/Login';
import '../../styles/components.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  return (
    <header>
      <div className="container flex">
        <h1>Food Delight</h1>
        <nav>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/restaurants">Restaurants</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/cart">Cart</Link> {/* Added Cart Link */}
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLoginOpen} className="btn-primary">Login</button>
              <Link to="/register" className="btn-secondary">Register</Link>
            </>
          )}
        </nav>
      </div>
      <Login isOpen={isLoginOpen} onClose={handleLoginClose} />
    </header>
  );
};

export default Header;
