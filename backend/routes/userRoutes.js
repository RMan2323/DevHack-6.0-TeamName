const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client('914973085387-m4dv9f5nbqn3skeuukr3bqnh0g61034e.apps.googleusercontent.com'); // Replace with actual client ID

// Route to add a new user
router.post('/add', userController.addUser);

// Route to get user details
router.get('/:id', userController.getUserDetails);

router.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '914973085387-m4dv9f5nbqn3skeuukr3bqnh0g61034e.apps.googleusercontent.com', // Replace with actual client ID
        });
        const payload = ticket.getPayload();

        // Create JWT token
        const jwtToken = jwt.sign({
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
        }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ token: jwtToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
