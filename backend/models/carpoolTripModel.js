const mongoose = require('mongoose');

// Define CarpoolTrip Schema
const carpoolTripSchema = new mongoose.Schema({
    origin: { 
        type: String, 
        required: [true, 'Origin is required'],
        trim: true
    },
    destination: { 
        type: String, 
        required: [true, 'Destination is required'],
        trim: true
    },
    date: { 
        type: Date, 
        required: [true, 'Trip date is required']
    },
    seatsAvailable: { 
        type: Number, 
        required: [true, 'Number of seats is required'],
        min: [1, 'Seats must be at least 1'],
        max: [8, 'Maximum 8 seats allowed']
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[6-9]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid Indian mobile number!`
        }
    },
    routeStops: { 
        type: [String], 
        default: []
    },
    passengers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
    fare: {
        type: Number,
        required: [true, 'Fare is required'],
        min: [0, 'Fare cannot be negative']
    }
});

// Create CarpoolTrip Model
module.exports = mongoose.model('CarpoolTrip', carpoolTripSchema);
