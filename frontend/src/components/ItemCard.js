import "./ItemCard.css";
import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      // Change image access to match backend
      <img src={item.imageUrl} alt={item.name} />

      // Update text fields
      <h3>{item.name}</h3>
      <p>₹{item.price}</p> 
      <p>Used {item.yearsUsed} years</p>

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
