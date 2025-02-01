const mongoose = require('mongoose');

const carpoolTripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: [true, 'Destination is required'],
        trim: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    seatsAvailable: {
        type: Number,
        min: [1, 'At least 1 seat required'],
        max: [6, 'Maximum 6 seats allowed']
    },
    meetingPoint: {
        type: String,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    pricePerSeat: {
        type: Number,
        min: [0, 'Price cannot be negative']
    },
    tripStatus: {
        type: String,
        enum: ['Upcoming', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CarpoolTrip', carpoolTripSchema);
