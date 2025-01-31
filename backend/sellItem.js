const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/itemRoutes');

// Initialize Express app
const app = express();
app.use(express.json()); // For parsing application/json

// MongoDB Atlas connection string
const mongoURI = 'your_mongodb_atlas_connection_string_here';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define Item Schema
const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    dateAdded: { type: Date, default: Date.now }
});

// Create Item Model
const Item = mongoose.model('Item', itemSchema);

// Use Routes
app.use('/api/items', itemRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
