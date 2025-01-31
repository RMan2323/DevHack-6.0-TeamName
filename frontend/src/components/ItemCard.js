import "./ItemCard.css";
import React from 'react';
import { Link } from 'react-router-dom';
const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.images[0]} alt={item.title} />
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <p>{item.location}</p>
      <Link to={`/product/${item.id}`} className="details-button">
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;
