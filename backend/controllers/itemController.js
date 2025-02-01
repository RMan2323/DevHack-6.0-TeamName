const Item = require('../models/itemModel');
const mongoose = require('mongoose');

// Controller function to sell an item
exports.sellItem = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const newItem = new Item({ name, price, description });
        await newItem.save();
        res.status(201).send('Item added successfully');
    } catch (error) {
        res.status(500).send('Error adding item');
    }
};

// Additional logic from sellItem.js
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        console.log('Fetched items from database:', items); // Debugging log
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error); // Debugging log
        res.status(500).send('Error fetching items');
    }
};

// Function to connect to the database
exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

// Connect to MongoDB
exports.connectDB();
