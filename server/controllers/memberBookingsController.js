const Bookings = require('../models/memberBookingsModel');

module.exports = {
  createBooking(req, res) {
    try {
      const booking = req.body.booking;
      const result = Bookings.createBooking(booking);
      res.json(result);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ error: 'Failed to create booking!' });
    }
  },

  getAllBookings(req, res) {
    try {
      const result = Bookings.getAllBookings();
      res.json(result);
    } catch (error) {
      console.error("Error getting all bookings:", error);
      res.status(500).json({ error: 'Failed to get all bookings!' });
    }
  },

  getBookingByID(req, res) {
    try{
         const id = req.params.id;
         const result = Bookings.getBookingByID(id);
         res.json(result);
       }catch(error){
         console.error("Error getting booking by ID:", error);
         res.status(500).json({ error: 'Failed to get booking by ID!' });
       }
   },

   getAllDeskAvaiabilityLogs(req, res) {
      try{
          const result = Bookings.getAllDeskAvailabilityLogs();
          res.json(result);
      }catch(error){
          console.error("Error getting all desk booking logs:", error);
          res.status(500).json({ error: 'Failed to get all desk booking logs!' });
      }
   },

   deleteDeskAvailabilityLog(req, res) {
        try{
          const { desk_id , booking_date } = req.query;
          const result = Bookings.deleteDeskAvailabilityLog(desk_id,booking_date);
          res.json(result);
      }catch(error){
          console.error("Error getting all desk booking logs:", error);
          res.status(500).json({ error: 'Failed to get all desk booking logs!' });
      }
   },

   updateBooking(req, res) {
     try {
        const id = req.params.id;
        const { member_id, desk_id, duration_id, booking_date, start_time, end_time, status, created_at } = req.body;
    
        if (!member_id && !desk_id && !duration_id && !booking_date && !start_time && !end_time && !status && !created_at) {
            return res.status(400).json({ error: 'At least one field is required to update!' });
        }
        const result = Bookings.updateBooking(id, req.body);
        res.json(result);
      } catch (error) {
        console.log("Error updating booking", error);
        res.status(500).json({ error: 'Failed to update booking' });
      }
    },

    deleteBooking(req, res) {
      try {
        const id = req.params.id;
        const result = Bookings.deleteBooking(id);
        res.json(result);
      } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: 'Failed to delete booking!' });
      }
    }
};
  
