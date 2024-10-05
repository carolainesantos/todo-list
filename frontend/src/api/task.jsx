import api from "./api";

export const getTasks = async () => {
  const response = await api.get("/api/v1/task");
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/api/v1/task/${id}`);
  return response.data;
};

export const createTask = async (text) => {
  const task = { description: text };
  const response = await api.post("/api/v1/task", task);
  return response.data;
};

export const updateTask = async (id, text) => {
  const task = { description: text };
  const response = await api.put(`/api/v1/task/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/api/v1/task/${id}`);
};
