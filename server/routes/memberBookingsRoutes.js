const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/memberBookingsController');

// POST /api/bookings/create
router.post('/create', bookingsController.createBooking);

// GET /api/bookings/all
router.get('/all', bookingsController.getAllBookings);

// GET /api/bookings/view/:id
router.get('/view/:id', bookingsController.getBookingByID);

// GET /api/bookings/getAllDeskBookingLogs
router.get('/getAllDeskBookingLogs', bookingsController.getAllDeskAvaiabilityLogs);

// PUT /api/bookings/update/:id
router.put('/update/:id', bookingsController.updateBooking);

// DELETE /api/bookings/delete/:id
router.delete('/delete/:id', bookingsController.deleteBooking);

// DELETE /api/bookings/deleteDeskLogs
router.delete('/deleteDeskLogs', bookingsController.deleteDeskAvailabilityLog);


module.exports = router;
