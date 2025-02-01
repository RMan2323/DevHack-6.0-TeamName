const CarpoolTrip = require('../models/carpoolTripModel');
const User = require('../models/userModel');

// Controller function to register a new carpool trip
exports.registerCarpoolTrip = async (req, res) => {
    try {
        // Destructure request body
        const { 
            origin, 
            destination, 
            date, 
            seatsAvailable, 
            phoneNumber,
            routeStops,
            fare
        } = req.body;

        // Validate input
        if (!origin || !destination || !date || !seatsAvailable || !phoneNumber || !fare) {
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors: ['All fields are required'] 
            });
        }

        // Create new carpool trip
        const newTrip = new CarpoolTrip({
            origin,
            destination,
            date,
            seatsAvailable,
            phoneNumber,
            routeStops: routeStops || [],
            fare
        });

        // Save the trip
        await newTrip.save();

        // Respond with success
        res.status(201).json({
            message: 'Carpool trip registered successfully',
            trip: newTrip
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors 
            });
        }

        // Handle other errors
        console.error('Error registering carpool trip:', error);
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        });
    }
};

// Controller function to request to join a carpool trip
exports.requestCarpoolTrip = async (req, res) => {
    const { tripId, userId } = req.body;
    try {
        const trip = await CarpoolTrip.findById(tripId);
        if (trip.seatsAvailable > 0) {
            trip.passengers.push(userId);
            trip.seatsAvailable -= 1;
            await trip.save();

            // Update user's requestedCarpoolTrips
            await User.findByIdAndUpdate(userId, { $push: { requestedCarpoolTrips: tripId } });

            res.status(200).send('Successfully requested to join carpool trip');
        } else {
            res.status(400).send('No seats available');
        }
    } catch (error) {
        res.status(500).send('Error requesting carpool trip');
    }
};

// Controller function to get all available carpool trips
exports.getAllCarpoolTrips = async (req, res) => {
    try {
        const trips = await CarpoolTrip.find()
            .populate('driver', 'username email') // Populate driver details
            .populate('passengers', 'username email'); // Populate passenger details

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching carpool trips:', error);
        res.status(500).json({ 
            message: 'Error fetching carpool trips', 
            error: error.message 
        });
    }
};
