const mongoose = require('mongoose');

// Define CarpoolTrip Schema
const carpoolTripSchema = new mongoose.Schema({
    origin: String,
    destination: String,
    date: Date,
    seatsAvailable: Number,
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverPhoneNumber: String,
    routeStops: [String],
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdDate: { type: Date, default: Date.now }
});

// Create CarpoolTrip Model
module.exports = mongoose.model('CarpoolTrip', carpoolTripSchema);
