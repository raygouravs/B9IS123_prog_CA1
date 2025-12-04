const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');

// POST /api/members/create
router.post('/create', membersController.createMember);

// GET /api/members/all
router.get('/all', membersController.getAllMembers);

// GET /api/members/view/:id
router.get('/view/:id', membersController.getMemberByID);

// GET /api/members/viewByEmail/:email
router.get('/viewByEmail/:email', membersController.getMemberIDforLogin);

// PUT /api/members/update/:id
router.put('/update/:id', membersController.updateMember);

// DELETE /api/members/delete/:id
router.delete('/delete/:id', membersController.deleteMember);

module.exports = router;
