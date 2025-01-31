import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockItems } from '../components/mockData'; // Import mock data
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product in the mock data
    const foundProduct = mockItems.find((item) => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <p className="price">Price: ${product.price}</p>
      <p className="location">Location: {product.location}</p>
      <p className="description">{product.description}</p>
      <button className="contact-seller">Contact Seller</button>
    </div>
  );
};

export default ProductDetails;