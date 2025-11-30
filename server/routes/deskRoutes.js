const express = require('express');
const router = express.Router();
const desksController = require('../controllers/desksController');

// POST /api/desks/create
router.post('/create', desksController.createDesk);

// GET /api/desks/all
router.get('/all', desksController.getAllDesks);

// GET /api/desks/view/:id
router.get('/view/:id', desksController.getDeskByID);

// GET /api/desks/getFreeSlotsNextWeek/:id
router.get('/getFreeSlotsNextWeek/:id', desksController.getNextWeekFreeSlotsForDeskByID);

// GET /api/desks/getAvailableSeatsForDate/:date
router.get('/getAvailableSeatsForDate/:date', desksController.getAvailableSeatsForDate);

// PUT /api/desks/update/:id
router.put('/update/:id', desksController.updateDesk);

// DELETE /api/desks/delete/:id
router.delete('/delete/:id', desksController.deleteDesk);

module.exports = router;
