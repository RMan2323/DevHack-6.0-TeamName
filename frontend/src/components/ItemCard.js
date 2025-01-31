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
      <div className="button-container">
        <Link to={`/product/${item._id}`} state={{ product: item }} className="details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;