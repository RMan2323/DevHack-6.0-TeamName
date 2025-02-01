const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    productsForSale: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    productsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    ownCarpoolTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarpoolTrip' }],
    requestedCarpoolTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CarpoolTrip' }],
    dateJoined: { type: Date, default: Date.now }
});

// Create User Model
module.exports = mongoose.model('User', userSchema);
