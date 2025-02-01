import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import axiosInstance
import ItemCard from './ItemCard';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/api/items'); // Use axiosInstance
        console.log('Fetched items from backend:', response.data); // Debugging log
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;