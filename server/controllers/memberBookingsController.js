const Bookings = require('../models/memberBookingsModel');

module.exports = {
  createBooking(req, res) {
    try {
      const booking = req.body.booking;
      const result = Bookings.createBooking(booking);
      res.json(result);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: 'Failed to create booking!' });
    }
  },
  
  getAllBookings(req, res) {
    try {
      const result = Bookings.getAllBookings();
      res.json(result);
    } catch (error) {
      console.error("Error getting all bookings:", error);
      res.status(500).json({ error: 'Failed to get all bookings!' });
    }
  }
};
  
