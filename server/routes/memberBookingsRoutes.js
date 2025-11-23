const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/memberBookingsController');

// POST /api/bookings/create
router.post('/create', bookingsController.createBooking);


module.exports = router;
