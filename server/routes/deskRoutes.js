const express = require('express');
const router = express.Router();
const desksController = require('../controllers/desksController');

// POST /api/desks/create
router.post('/create', desksController.createDesk);

// GET /api/desks/all
router.get('/all', desksController.getAllDesks);

module.exports = router;
