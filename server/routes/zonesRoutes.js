const express = require('express');
const router = express.Router();
const zonesController = require('../controllers/zonesController');

// POST /api/zones/create
router.post('/create', zonesController.createZones);

// GET /api/zones/all
router.get('/all', zonesController.getZones);

// PUT /api/zones/update/:id
router.put('/update/:id', zonesController.updateZone);

// DELETE /api/zones/delete/:id
router.delete('/delete/:id', zonesController.deleteZone);

module.exports = router;
