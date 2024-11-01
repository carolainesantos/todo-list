import api from "./api";

export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/user/${id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post("/api/v1/user", user);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/api/v1/user/${id}`);
};

export const loginUser = async (email, password) => {
  const body = { email, password };
  const response = await api.post("/api/v1/user/login", body, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const verifyMfa = async (email, password, code) => {
  const body = { email, password, code };
  const response = await api.post("/api/v1/user/verify", body);
  return response.data;
};
