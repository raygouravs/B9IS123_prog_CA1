const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// POST /api/members/create
router.post('/create', membersController.createMember);

// GET /api/members/all
router.get('/all', membersController.getAllMembers);

// GET /api/members/view/:id
router.get('/view/:id', membersController.getMemberByID);

module.exports = router;
