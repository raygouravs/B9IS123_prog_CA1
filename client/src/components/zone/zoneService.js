import api from "../../api/axios";

// CRUD API Calls for zones:

// 1. GET /api/zones/all
export const getAllZones = async () => {
  const res = await api.get("/zones/all");
  console.log(`Data = ${res.data}`);
  return res.data;
};







