import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';

const SellPage = () => {
  const [item, setItem] = useState({
    name: '',
    price: 0,
    description: '',
    yearsUsed: 0,
    category: 'Other',
    condition: 'Used'
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add full backend URL and auth header
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth
        },
        body: JSON.stringify({
          ...item,
          // Remove ownerName (should come from auth)
          yearsUsed: Number(item.yearsUsed) // Ensure number type
        }),
      });
      
      const data = await response.json(); // Always parse JSON
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to list item');
      }
      
      alert('Item listed successfully!');
      navigate('/buy');
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Failed to list item. Check console for details.');
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