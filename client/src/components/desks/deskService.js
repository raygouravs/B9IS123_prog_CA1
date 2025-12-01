import api from "./api";

// CRUD API Calls for desks:

// 1. GET /api/desks/all
export const getAllDesks = async () => {
  const res = await api.get("/desks/all");
  return res.data;
};

// 2. GET /api/desks/view/:id
export const getDeskById = async (desk_id) => {
  const res = await api.get(`/desks/view/${desk_id}`);
  return res.data;
};

// 3. POST /api/desks/create
export const createDesk = async (deskData) => {
  const res = await api.post("/desks/create", deskData);
  return res.data;
};

// 4. PUT /api/desks/update/:id
export const updateDesk = async (desk_id, updatedFields) => {
  const res = await api.put(`/desks/update/${desk_id}`, updatedFields);
  return res.data;
};

// 5. DELETE /api/desks/delete/:id
export const deleteDesk = async (desk_id) => {
  const res = await api.delete(`/desks/delete/${desk_id}`);
  return res.data;
};

// 6. GET /api/desks/getFreeSlotsNextWeek/:id
export const getFreeSlotsNextWeek = async (desk_id) => {
  const res = await api.get(`/desks/getFreeSlotsNextWeek/${desk_id}`);
  return res.data;
};

// 7. GET /api/desks/getAvailableSeatsForDate/:date
export const getAvailableSeatsForDate = async (date) => {
    // YYYY-MM-DD
  const res = await api.get(`/desks/getAvailableSeatsForDate/${date}`);
  return res.data;
};



