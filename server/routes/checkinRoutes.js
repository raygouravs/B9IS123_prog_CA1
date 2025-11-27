const express = require('express');
const router = express.Router();
const checkinController = require('../controllers/checkinController');

// POST /api/checkins/create
router.post('/create', checkinController.createCheckin);

module.exports = router;