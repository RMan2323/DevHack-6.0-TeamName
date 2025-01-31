const mongoose = require('mongoose');

// Define Item Schema
const itemSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Item title
    price: { type: Number, required: true }, // Item price
    description: { type: String, required: true }, // Item description
    category: { type: String, required: true }, // Item category (e.g., Stationary, Furniture, Clothing)
    images: { type: [String], required: true }, // Array of image URLs
    location: { type: String, required: true }, // Item location
    ownerUsername: { type: String, required: true }, // Username of the owner selling the item
    ownerPhone: { type: String, required: true }, // Phone number of the owner
    yearsUsed: { type: Number, required: true }, // Number of years the item has been used
    dateAdded: { type: Date, default: Date.now } // Date when the item was added
});

// Create Item Model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;