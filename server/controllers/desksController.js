/*
    Controller functions for desk CRUD API endpoints.
*/

const Desks = require('../models/desksModel');

module.exports = {
  createDesk(req, res) {
    try {
      const desk = req.body.desk;
      const result = Desks.createDesk(desk);
      res.json(result);
    } catch (error) {
      console.error("Error creating desk:", error);
      res.status(500).json({ error: 'Failed to create desk!' });
    }
  },

  getAllDesks(req, res) {
    try{
        const result = Desks.getAllDesks();
        res.json(result);
    }catch(error){
      console.error("Error getting all desks:", error);
      res.status(500).json({ error: 'Failed to get all desks!' });
    }
  },

  getDeskByID(req, res) {
    try{
        const id = req.params.id;
        const result = Desks.getDeskByID(id);
        res.json(result);
    }catch(error){
      console.error("Error getting all desks:", error);
      res.status(500).json({ error: 'Failed to get all desks!' });
    }
  },

  updateDesk(req, res) {
      try {
        const id = req.params.id;
        const { desk_code, zone_id, features, status } = req.body;
        if (!desk_code && !zone_id && !features && !status) {
          return res.status(400).json({ error: 'At least one field is required to update!' });
        }
        const result = Desks.updateDesk(id, req.body);
        res.json(result);
      } catch (error) {
        console.log("Error updating desk", error);
        res.status(500).json({ error: 'Failed to update desk' });
      }
    },

    deleteDesk(req, res) {
      try {
        const id = req.params.id;
        const result = Desks.deleteDesk(id);
        res.json(result);
      } catch (error) {
        console.log("Error deleting desk", error);
        res.status(500).json({ error: 'Failed to delete desk' });
      }
    },

    getNextWeekFreeSlotsForDeskByID(req, res) {
      try {
        const id = req.params.id;
        const result = Desks.getNextWeekFreeSlotsForDeskByID(id);
        res.json(result);
      } catch(error) {
        console.log("Error fetching free slots", error);
        res.status(500).json({ error: 'Failed to fetch free slots' });
      }
    },

    getAvailableSeatsForDate(req, res) {
      try {
        const date_str = req.params.date;
        const result = Desks.getAvailableSeatsForDate(date_str);
        res.json(result);
      } catch(error) {
        console.log("Error fetching available desks", error);
        res.status(500).json({ error: 'Failed to fetch free desks!' });
      }
    }
};
