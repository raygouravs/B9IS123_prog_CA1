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

// GET /api/bookings/all
export const getAllBookings = async () => {
  const res = await api.get("/bookings/all");
  console.log("Get Booking Response =", res.data);
  return res.data;
};

// GET /api/desks/getFreeSlotsNextWeek/:id
export const getFreeSlotsNextWeek = async (desk_id) => {
  const res = await api.get(`/desks/getFreeSlotsNextWeek/${desk_id}`);
  console.log("Get Free Slots Response =", res.data);
  return res.data;
};

// PUT /api/bookings/update/:id
export const updateBooking = async (booking_id, booking_data) => {
  const res = await api.put(`/bookings/update/${booking_id}`, booking_data);
  return res.data;
};

// DELETE /api/bookings/delete/:id
export const deleteBooking = async (booking_id) => {
  const res = await api.delete(`/bookings/delete/${booking_id}`);
  return res.data;
};


