import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';

const SellPage = () => {
  const [item, setItem] = useState({
    name: '',
    price: '',
    description: '',
    ownerName: '',
    yearsUsed: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        alert('Item listed successfully!');
        navigate('/buy');
      } else {
        alert('Failed to list item.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="sell-page">
      <h1>Sell an Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" name="name" value={item.name} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={item.price} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={item.description} onChange={handleChange} required />
        </label>
        <label>
          Your Name:
          <input type="text" name="ownerName" value={item.ownerName} onChange={handleChange} required />
        </label>
        <label>
          Years Used:
          <input type="number" name="yearsUsed" value={item.yearsUsed} onChange={handleChange} required />
        </label>
        <button type="submit">List Item</button>
      </form>
    </div>
  );
};

export default SellPage;