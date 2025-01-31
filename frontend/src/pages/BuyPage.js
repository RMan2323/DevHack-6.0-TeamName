import React from 'react';
import ItemList from '../components/ItemList';
import './BuyPage.css';

const BuyPage = () => {
  return (
    <div className="buy-page">
      <div className="buy-page-header">
        <h1>Marketplace</h1>
        <p>Explore and buy items from your fellow students.</p>
      </div>
      <div className="item-list-container">
        <ItemList />
      </div>
    </div>
  );
};

export default BuyPage;
