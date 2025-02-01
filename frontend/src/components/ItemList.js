// components/ItemList.js
import React from 'react';
import ItemCard from './ItemCard';
import './ItemList.css';

const ItemList = ({ items, onBuyItem }) => {
    return (
        <div className="item-list">
            {items.map((item) => (
                <ItemCard key={item._id} item={item} onBuyItem={onBuyItem} />
            ))}
        </div>
    );
};

export default ItemList;