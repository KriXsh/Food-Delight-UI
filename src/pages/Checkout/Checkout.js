// src/pages/Checkout/Checkout.js

import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';


const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckout = async () => {
    // Handle checkout process
    try {
      // API call to place order
      clearCart();
      // Show success message or redirect
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.menuItemId} className="order-item">
            <span>{item.name}</span>
            <span>{item.quantity} x ${item.price}</span>
          </div>
        ))}
        <div className="order-total">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
      </div>
      <div className="checkout-details">
        <h3>Delivery Details</h3>
        <input
          type="text"
          placeholder="Delivery Address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          required
        />
        <h3>Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash_on_delivery">Cash on Delivery</option>
        </select>
        <button onClick={handleCheckout} className="btn-primary">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
