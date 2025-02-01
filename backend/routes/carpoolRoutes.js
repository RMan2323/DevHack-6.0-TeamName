const express = require('express');
const router = express.Router();
const carpoolTripController = require('../controllers/carpoolTripController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to register a new carpool trip (requires authentication)
router.post('/register', authMiddleware.authenticateUser, carpoolTripController.registerCarpoolTrip);

// Route to request to join a carpool trip (requires authentication)
router.post('/request', authMiddleware.authenticateUser, carpoolTripController.requestCarpoolTrip);

// Route to get all available carpool trips
router.get('/trips', carpoolTripController.getAllCarpoolTrips);

module.exports = router;
