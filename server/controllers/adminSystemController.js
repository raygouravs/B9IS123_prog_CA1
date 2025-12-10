/*
    Controller functions for admin CRUD API endpoints.
*/
const adminSystemModel = require('../models/adminSystemModel');

module.exports = {
    systemResetCall(req, res) {
       try {
            const result = adminSystemModel.systemReset();
            res.json(result);
        } catch (error) {
            console.error("Error in system reset:", error);
            res.status(500).json({ error: 'Failed to release resources!' });
        }
    }
};