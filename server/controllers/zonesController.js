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
  }
};
