/*
    Routes for zone CRUD API endpoints.
*/

const express = require('express');
const router = express.Router();
const zonesController = require('../controllers/zonesController');

// GET /api/zones/all
router.get('/all', zonesController.getZones);

module.exports = router;
