const Members = require('../models/membersModel');

module.exports = {
  createMember(req, res) {
    try {
      const member = req.body.member;
      const result = Members.createMember(member);
      res.json(result);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ error: 'Failed to create member!' });
    }
  }
};
