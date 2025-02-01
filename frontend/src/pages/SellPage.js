import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';
import axiosInstance from '../components/axiosInstance';

const SellPage = () => {
  const [item, setItem] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: [],
    location: '',
    ownerUsername: '',
    ownerPhone: '',
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
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to sell an item.');
            return;
        }
        const response = await axiosInstance.post('/api/items/sell', item, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
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
                <input type="text" name="title" value={item.title} onChange={handleChange} required />
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
                Category:
                <input type="text" name="category" value={item.category} onChange={handleChange} required />
            </label>
            <label>
                Image URLs (comma separated):
                <input type="text" name="images" value={item.images.join(',')} onChange={(e) => setItem({ ...item, images: e.target.value.split(',') })} required />
            </label>
            <label>
                Location:
                <input type="text" name="location" value={item.location} onChange={handleChange} required />
            </label>
            <label>
                Your Username:
                <input type="text" name="ownerUsername" value={item.ownerUsername} onChange={handleChange} required />
            </label>
            <label>
                Your Phone Number:
                <input type="text" name="ownerPhone" value={item.ownerPhone} onChange={handleChange} required />
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