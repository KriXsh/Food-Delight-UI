// src/pages/Orders/OrderHistory.js

import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <span>{order.date}</span>
            <span>{order.totalAmount}</span>
            <span>{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
