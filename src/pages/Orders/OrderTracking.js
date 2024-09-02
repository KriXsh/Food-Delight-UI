// src/pages/Orders/OrderTracking.js

import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';


const OrderTracking = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const data = await orderService.getOrderStatus(orderId);
        setOrderStatus(data.status);
      } catch (error) {
        console.error('Error fetching order status', error);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div className="order-tracking">
      <h2>Order Tracking</h2>
      <p>Order ID: {orderId}</p>
      <p>Status: {orderStatus}</p>
    </div>
  );
};

export default OrderTracking;
