const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();
const client = new OAuth2Client('914973085387-m4dv9f5nbqn3skeuukr3bqnh0g61034e.apps.googleusercontent.com');

// Google login route
router.post('/google-login', async (req, res) => {
    const { credential } = req.body; // Get the credential from the request body
    try {
        const ticket = await client.verifyIdToken({ idToken: credential, audience: '914973085387-m4dv9f5nbqn3skeuukr3bqnh0g61034e.apps.googleusercontent.com' });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user if not exists
            user = new User({ username: name, email, phoneNumber: '', productsForSale: [], productsBought: [], ownCarpoolTrips: [], requestedCarpoolTrips: [] });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'hello', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).send('Invalid token');
    }
});

module.exports = router;
