// src/components/Cart/CartItem.js

import React from 'react';
import '../../styles/components.css';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>{item.quantity} x ${item.price}</p>
      </div>
      <button onClick={onRemove} className="btn-remove">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
