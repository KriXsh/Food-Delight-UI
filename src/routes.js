import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/Home/LandingPage';
import RestaurantList from './pages/Restaurant/RestaurantList';
import RestaurantMenu from './pages/Restaurant/RestaurantMenu';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserProfile from './pages/Profile/UserProfile';
import EditProfile from './pages/Profile/EditProfile';
import OrderHistory from './pages/Orders/OrderHistory';
import OrderTracking from './pages/Orders/OrderTracking';
import Recommendations from './pages/Recommendations/Recommendations';
import Cart from './components/Cart/Cart'; // Import the Cart component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/restaurants" element={<RestaurantList />} />
      <Route path="/menu/:restaurantId" element={<RestaurantMenu />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/track/:orderId" element={<OrderTracking />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/cart" element={<Cart />} /> {/* Added Cart Route */}
    </Routes>
  );
};

export default AppRoutes;
