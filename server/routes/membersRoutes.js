const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// POST /api/members/create
router.post('/create', membersController.createMember);


module.exports = router;
