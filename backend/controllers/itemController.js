const Item = require('../models/itemModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Controller function to sell an item
exports.sellItem = async (req, res) => {
    const { title, price, description, category, images, location, ownerUsername, ownerPhone, yearsUsed, dateAdded } = req.body;
    try {
        const newItem = new Item({ title, price, description, category, images, location, ownerUsername, ownerPhone, yearsUsed, dateAdded });
        await newItem.save();

        // Find the user and update their productsForSale array
        await User.findByIdAndUpdate(req.user.id, {
            $push: { productsForSale: newItem._id }
        });

        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error: error.message });
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

// Controller function to get items specific to a user
exports.getUserItems = async (req, res) => {
    try {
        const userItems = await User.findById(req.user.id).populate('productsForSale');
        res.status(200).json(userItems.productsForSale);
    } catch (error) {
        console.error('Error fetching user items:', error);
        res.status(500).json({ message: 'Error fetching user items', error: error.message });
    }
};

// Controller function to mark an item as sold
exports.markItemAsSold = async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;

        // Remove the item from the user's productsForSale
        await User.findByIdAndUpdate(userId, {
            $pull: { productsForSale: itemId }
        });

        // Remove the item from the database
        await Item.findByIdAndDelete(itemId);

        res.status(200).json({ message: 'Item marked as sold and removed successfully.' });
    } catch (error) {
        console.error('Error marking item as sold:', error);
        res.status(500).json({ message: 'Error marking item as sold', error: error.message });
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
