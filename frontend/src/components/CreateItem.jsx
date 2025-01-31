import { useState } from "react";
import "./CreateItem.css";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "electronics",
    images: [],
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item Created:", formData);
    alert("Item created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="create-item-form">
      <input
        type="text"
        placeholder="Item Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <button type="submit">Post Item</button>
    </form>
  );
};

export default CreateItem;