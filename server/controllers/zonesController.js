/*
    Controller functions for zone CRUD API endpoints.
*/

const Zones = require('../models/zonesModels');

module.exports = {
  createZones(req, res) {
    try {
      const zones = req.body.zones;
      const result = Zones.createZones(zones);
      res.json(result);
    } catch (error) {
      console.error("Error creating zones:", error);
      res.status(500).json({ error: 'Failed to create zones' });
    }
  },

  getZones(req, res) {
    try {
      const data = Zones.getAllZones();
      res.json(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
      res.status(500).json({ error: 'Failed to fetch zones' });
    }
  },

  updateZone(req, res) {
    try {
      const id = req.params.id;
      const { zone_name, floor, description } = req.body;
      if (!zone_name && !floor && !description) {
        return res.status(400).json({ error: 'At least one field is required to update!' });
      }
      const result = Zones.updateZone(id, req.body);
      res.json(result);
    } catch (error) {
      console.log("Error updating zone", error);
      res.status(500).json({ error: 'Failed to update zone' });
    }
  },

  deleteZone(req, res) {
    try {
      const id = req.params.id;
      const result = Zones.deleteZone(id);
      res.json(result);
    } catch (error) {
      console.log("Error deleting zone", error);
      res.status(500).json({ error: 'Failed to delete zone' });
    }
  }
};
