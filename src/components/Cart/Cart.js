// src/components/Cart/Cart.js

import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import  { jwtDecode } from 'jwt-decode';  // Correct import for jwtDecode

const Cart = () => {
  const { cartItems, totalPrice, removeItemFromCart, clearCart } = useContext(CartContext);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Fetch user from localStorage
    if (!user || !user.token) {
      alert('You need to log in to place an order');
      return;
    }

    const decodedToken = jwtDecode(user.token);
    const userId = decodedToken.id;

    const restaurantId = cartItems.length > 0 ? String(cartItems[0].restaurantId) : null;

    if (!restaurantId) {
      alert("No items in the cart to place an order.");
      return;
    }

    const items = cartItems.map(item => ({
      menuItemId: String(item.menuItemId),
      quantity: Number(item.quantity)
    }));

    const orderData = {
      userId: String(userId),
      restaurantId,
      items,
      deliveryAddress,
      paymentMethod
    };

    try {
      const response = await fetch('http://localhost:3000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Pass the user token here
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.code === 200) {
        setOrderPlaced(true);
        clearCart();
        alert('Order placed successfully!');
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.menuItemId}
              item={item}
              onRemove={() => removeItemFromCart(item.menuItemId)}
            />
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      {/* Delivery Address and Payment Method */}
      <div className="checkout-form">
        <div className="form-group">
          <label htmlFor="deliveryAddress">Delivery Address:</label>
          <input
            type="text"
            id="deliveryAddress"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter delivery address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
          </select>
        </div>
      </div>

      <button onClick={handlePlaceOrder} className="btn-primary">
        Place Order
      </button>

      {orderPlaced && (
        <div className="order-confirmation">
          <p>Thank you! Your order has been placed.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
