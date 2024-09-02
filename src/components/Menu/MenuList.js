// src/components/Menu/MenuList.js

import React, { useState, useEffect } from 'react';
import restaurantService from '../../services/restaurantService';
import MenuItem from './MenuItem';
import '../../styles/components.css';

const MenuList = ({ restaurantId }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      if (!restaurantId) {
        console.error('Restaurant ID is undefined');
        setError('Restaurant ID is undefined');
        setLoading(false);
        return;
      }

      try {
        const data = await restaurantService.getMenu(restaurantId);

        if (data.code === 200 && Array.isArray(data.data)) {
          const filteredMenu = data.data.filter(item => item.restaurantId === restaurantId);
          setMenu(filteredMenu);
        } else {
          console.error('Expected an array but got:', data.data);
          setError('Menu data is not in the expected format');
          setMenu([]);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError(error.message || 'Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="menu-list">
      {menu.length > 0 ? (
        menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))
      ) : (
        <p>No menu items found for this restaurant.</p>
      )}
    </div>
  );
};

export default MenuList;
