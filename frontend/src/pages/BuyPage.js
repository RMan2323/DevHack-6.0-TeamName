// pages/BuyPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axiosInstance';
import ItemList from '../components/ItemList';
import './BuyPage.css';

const BuyPage = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosInstance.get('/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    return (
        <div className="buy-page">
            <div className="buy-page-header">
                <h1>Marketplace</h1>
                <p>Explore and buy items from your fellow students.</p>
            </div>
            <div className="item-list-container">
                <ItemList items={items} />
            </div>
        </div>
    );
};

export default BuyPage;