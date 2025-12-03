import api from "../../api/axios";

// CRUD API Calls for members:

// 1. GET /api/members/all
export const getAllMembers = async () => {
  const res = await api.get("/members/all");
  console.log(`Data = ${res.data}`);
  return res.data;
};

// 2. GET /api/members/view/:id
export const getMemberById = async (member_id) => {
  const res = await api.get(`/members/view/${member_id}`);
  return res.data;
};

// 3. POST /api/members/create
export const createMember = async (memberData) => {
  const res = await api.post("/members/create", memberData);
  return res.data;
};

// 4. PUT /api/members/update/:id
export const updateMember = async (member_id, updatedFields) => {
  const res = await api.put(`/members/update/${member_id}`, updatedFields);
  return res.data;
};

// 5. DELETE /api/members/delete/:id
export const deleteMember = async (member_id) => {
  const res = await api.delete(`/members/delete/${member_id}`);
  return res.data;
};



