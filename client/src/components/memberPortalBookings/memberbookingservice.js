import api from "../../api/axios";

// API calls for Booking CRUD (Member Portal)

// GET /api/desks/getAvailableSeatsForDate/:date
export const getAvailableSeats = async (date) => {
  const res = await api.get(`/desks/getAvailableSeatsForDate/${date}`);
  console.log(`Seat Data = ${res.data}`);
  return res.data;
};

// POST /api/bookings/create
export const createBooking = async (bookingData) => {
  const res = await api.post("/bookings/create", bookingData);
  console.log("Create Booking Response =", res.data);
  return res.data;
};

