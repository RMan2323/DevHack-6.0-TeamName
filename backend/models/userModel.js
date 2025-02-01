const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    productsForSale: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    carpoolTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarpoolTrip'
    }],
    joinedAt: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows null for non-Google users
      }
    
});

module.exports = mongoose.model('User', userSchema);
