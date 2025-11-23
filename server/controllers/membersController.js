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
  },

  getAllMembers(req, res) {
      try{
          const result = Members.getAllMembers();
          res.json(result);
      }catch(error){
        console.error("Error getting all members:", error);
        res.status(500).json({ error: 'Failed to get all members!' });
      }
    },

    getMemberByID(req, res) {
        try{
            const id = req.params.id;
            const result = Members.getMemberByID(id);
            res.json(result);
        }catch(error){
          console.error("Error getting member by ID:", error);
          res.status(500).json({ error: 'Failed to get member by ID!' });
        }
      },
};
