import api from "./api";

// Função para obter um único usuário
export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/user/${id}`);
  return response.data;
};

// Função para criar um novo usuário
export const createUser = async (user) => {
  console.log(user);
  const response = await api.post("/api/v1/user", user);
  return response.data;
};

// Função para atualizar um usuário
export const updateUser = async (id, user) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};

// Função para deletar um usuário
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
