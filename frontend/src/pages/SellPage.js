import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellPage.css';
import axiosInstance from '../components/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    dateAdded: new Date().toISOString(),
  });

  const [userItems, setUserItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const token = localStorage.getItem('backendToken');
        if (!token) {
          alert('You must be logged in to view your items.');
          return;
        }
        console.log('Fetching user items with token:', token);
        const response = await axiosInstance.get('/api/items/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Fetched user items:', response.data);
        setUserItems(response.data);
      } catch (error) {
        console.error('Error fetching user items:', error);
      }
    };
    fetchUserItems();
  }, []);

  const handleItemSold = async (itemId) => {
    try {
      const token = localStorage.getItem('backendToken');
      if (!token) {
        alert('You must be logged in to mark an item as sold.');
        return;
      }
      console.log('Marking item as sold with ID:', itemId);
      await axiosInstance.delete(`/api/items/sell/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserItems(userItems.filter(item => item._id !== itemId));
      toast.success('Item marked as sold and removed successfully!');
    } catch (error) {
      console.error('Error marking item as sold:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate and convert data types
      const processedItem = {
        title: item.title.trim(),
        price: Number(item.price),
        description: item.description.trim(),
        category: item.category.trim(),
        images: item.images.filter(img => img.trim() !== ''),
        location: item.location.trim(),
        ownerUsername: item.ownerUsername.trim(),
        ownerPhone: item.ownerPhone.trim(),
        yearsUsed: Number(item.yearsUsed),
        dateAdded: new Date().toISOString()
      };

      // Detailed validation
      const validationErrors = [];
      if (!processedItem.title) validationErrors.push('Item Name');
      if (isNaN(processedItem.price) || processedItem.price <= 0) validationErrors.push('Price (must be a positive number)');
      if (!processedItem.description) validationErrors.push('Description');
      if (!processedItem.category) validationErrors.push('Category');
      if (processedItem.images.length === 0) validationErrors.push('Image URLs');
      if (!processedItem.location) validationErrors.push('Location');
      if (!processedItem.ownerUsername) validationErrors.push('Username');
      if (!processedItem.ownerPhone) validationErrors.push('Phone Number');
      if (isNaN(processedItem.yearsUsed) || processedItem.yearsUsed < 0) validationErrors.push('Years Used (must be a non-negative number)');

      if (validationErrors.length > 0) {
        alert(`Please correct the following fields:\n${validationErrors.join('\n')}`);
        return;
      }

      const backendToken = localStorage.getItem('backendToken');
      console.log('Backend Token:', backendToken);

      if (!backendToken) {
        alert('You must be logged in to sell an item.');
        return;
      }

      const response = await axiosInstance.post('/api/items/sell', processedItem, {
        headers: {
          Authorization: `Bearer ${backendToken}`,
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
      console.error('Full Error Details:', error);
      alert(`Error: ${error.response?.data?.message || error.message || 'Unknown error occurred'}`);
    }
  };

  return (
    <div className="sell-page">
      <ToastContainer />
      <h1>Sell an Item</h1>
      <div className="sell-container">
        <form onSubmit={handleSubmit} className="sell-form">
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
        <div className="my-items">
          <h2>My Items</h2>
          {userItems.length > 0 ? (
            <ul>
              {userItems.map(item => (
                <li key={item._id}>
                  <p>{item.title}</p>
                  <button onClick={() => handleItemSold(item._id)}>Item Sold</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not uploaded any items.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellPage;