const express = require('express');
const router = express.Router();
const adminSystemController = require('../controllers/adminSystemController');

// DELETE /api/adminsystem/delete
router.delete('/delete', adminSystemController.systemResetCall);

module.exports = router;