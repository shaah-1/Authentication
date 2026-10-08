import axios from "axios";

const API_URL = "http://localhost:3000";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);

  return response.data;
};

export const loginUser = async (email) => {
  const response = await axios.get(
    `${API_URL}/users?email=${encodeURIComponent(email)}`
  );

  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);

  return response.data;
};

export const checkUsername = async (username) => {
  const response = await axios.get(
    `${API_URL}/users?username=${encodeURIComponent(username)}`
  );

  return response.data;
};