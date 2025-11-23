const express = require('express');
const router = express.Router();
const desksController = require('../controllers/desksController');

// POST /api/desks/create
router.post('/create', desksController.createDesk);

module.exports = router;
