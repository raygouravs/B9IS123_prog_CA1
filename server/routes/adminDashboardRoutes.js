const express = require('express');
const router = express.Router();
const adminDashboardController = require('../controllers/adminDashboardController');

// GET /api/dashboard/deskutilisation/:date
router.get('/deskutilisation/:date', adminDashboardController.getDeskUtilisationByDate);

// GET /api/dashboard/memberutilisation
router.get('/memberutilisation', adminDashboardController.getMemberUtilisationData);

module.exports = router;
