import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetails.css';

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState(null);

  const handleContactSeller = () => {
    if (product) {
      const info = `Contact ${product.ownerUsername} at ${product.ownerPhone}`;
      toast.info(info);
      setContactInfo(info);
    }
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Location: {product.location}</p>
      <img src={product.images[0]} alt={product.title} />
      <div className="button-container">
        <button id="contact-seller" onClick={handleContactSeller}>Contact Seller</button>
      </div>
      {contactInfo && <div className="contact-info">{contactInfo}</div>}
    </div>
  );
};

export default ProductDetails;