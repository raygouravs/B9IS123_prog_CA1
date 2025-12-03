import api from "../../api/axios";

// API calls for Admin Reports Dashboard

// DELETE /api/adminsystem/delete
export const adminSystemReset = async () => {
  const res = await api.delete(`/adminsystem/delete`);
  return res.data;
};

// GET /api/dashboard/memberutilisation
export const getMemberUtilisation = async () => {
  const res = await api.get("/dashboard/memberutilisation");
  console.log(`Data = ${res.data}`);
  return res.data;
};

// GET /api/dashboard/deskutilisation/:date
export const getDeskUtilisation = async (date) => {
  const res = await api.get(`/dashboard/deskutilisation/${date}`);
  console.log(`Data = ${res.data}`);
  return res.data;
};