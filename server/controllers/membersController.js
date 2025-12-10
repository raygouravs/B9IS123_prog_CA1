/*
    Controller functions for member CRUD API endpoints.
*/

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

    updateMember(req, res) {
        try {
              const id = req.params.id;
              const { full_name, email, phone, company, membership_type, join_date, status } = req.body;
              if (!full_name && !email && !phone && !company && !membership_type && !join_date && !status) {
                return res.status(400).json({ error: 'At least one field is required to update!' });
              }
              const result = Members.updateMember(id, req.body);
              res.json(result);
        } catch (error) {
              console.log("Error updating member", error);
              res.status(500).json({ error: 'Failed to update member' });
        }
    },

    deleteMember(req, res) {
        try {
            const id = req.params.id;
            const result = Members.deleteMember(id);
            res.json(result);
        } catch (error) {
            console.log("Error deleting member", error);
            res.status(500).json({ error: 'Failed to delete member' });
        }
    },

    getMemberIDforLogin(req, res) {
      try {
        const email = req.params.email;
        const result = Members.getMemberIDforLogin(email);
        res.json(result);
      } catch (error) {
        console.log("Error fetching member by Email")
        res.status(500).json({ error: 'Failed to fetch member by Email' });
      }
    }

          
};
