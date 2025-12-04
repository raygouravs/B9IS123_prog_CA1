import api from "../../api/axios";

// API for member_id for login

// 1. GET /api/members/viewByEmail/:email
export const getMemberByEmail = async (email) => {
  const res = await api.get(`/members/viewByEmail/${email}`);
  //console.log(`Login Member Data = ${res.data}`);
  console.log("Login Member Data =", JSON.stringify(res.data, null, 2));
  return res.data;
};



