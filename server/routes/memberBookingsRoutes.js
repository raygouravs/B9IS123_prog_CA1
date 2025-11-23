const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/memberBookingsController');

// POST /api/bookings/create
router.post('/create', bookingsController.createBooking);

// GET /api/bookings/all
router.get('/all', bookingsController.getAllBookings);

// GET /api/bookings/view/:id
router.get('/view/:id', bookingsController.getBookingByID);


module.exports = router;
