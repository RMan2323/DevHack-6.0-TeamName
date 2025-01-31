const User = require('../models/userModel');

// Controller function to add a new user
exports.addUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).send('User added successfully');
    } catch (error) {
        res.status(500).send('Error adding user');
    }
};

// Controller function to get user details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('productsForSale').populate('productsBought');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error fetching user details');
    }
};
