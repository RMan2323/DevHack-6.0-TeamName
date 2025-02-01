const CarpoolTrip = require('../models/carpoolTripModel');
const User = require('../models/userModel');

// Controller function to register a new carpool trip
exports.registerCarpoolTrip = async (req, res) => {
    const { origin, destination, date, seatsAvailable, driverId, driverPhoneNumber, routeStops } = req.body;
    try {
        const newTrip = new CarpoolTrip({ origin, destination, date, seatsAvailable, driver: driverId, driverPhoneNumber, routeStops });
        await newTrip.save();

        // Update user's ownCarpoolTrips
        await User.findByIdAndUpdate(driverId, { $push: { ownCarpoolTrips: newTrip._id } });

        res.status(201).send('Carpool trip registered successfully');
    } catch (error) {
        res.status(500).send('Error registering carpool trip');
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
