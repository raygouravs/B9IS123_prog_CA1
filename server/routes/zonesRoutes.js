const express = require('express');
const router = express.Router();
const zonesController = require('../controllers/zonesController');

// POST /api/zones/create
router.post('/create', zonesController.createZones);

// GET /api/zones/all
router.get('/all', zonesController.getZones);

module.exports = router;
