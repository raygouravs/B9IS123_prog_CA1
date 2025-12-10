/*
    Controller functions for checkin CRUD API endpoints.
*/

const Checkins = require('../models/checkinModel');

module.exports = {
    createCheckin(req, res) {
        try {
            const checkin = req.body.checkin;
            const result = Checkins.createCheckin(checkin);
            res.json(result);
        } catch (error) {
            console.error("Error creating checkin:", error);
            res.status(500).json({ error: 'Failed to create checkin!' });
        }
    }
}