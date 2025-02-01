const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Use env variable

// Google login route
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        // Find or create user
        let user = await User.findOne({ 
            $or: [
                { email: payload.email },
                { googleId: payload.sub }
            ]
        });

        if (!user) {
            user = new User({
                username: payload.name,
                email: payload.email,
                googleId: payload.sub
            });
            await user.save();
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            token: jwtToken, 
            user: {
                id: user._id,
                name: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ 
            error: 'Authentication failed',
            details: error.message 
        });
    }
});

module.exports = router;
