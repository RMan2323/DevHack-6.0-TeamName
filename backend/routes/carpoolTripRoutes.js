const express = require('express');
const router = express.Router();
const carpoolTripController = require('../controllers/carpoolTripController');

// Route to register a new carpool trip
router.post('/register', carpoolTripController.registerCarpoolTrip);

// Route to request to join a carpool trip
router.post('/request', carpoolTripController.requestCarpoolTrip);

module.exports = router;
