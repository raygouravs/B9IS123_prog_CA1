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
  }
};
