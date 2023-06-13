import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const user = JSON.parse(localStorage.getItem("user") || "{}");

const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/api/token/`,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return response;
};

const refreshToken = async () => {
  const response = await axios.post(`${API_URL}/api/token/refresh/`, {
    refresh: user.refresh,
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const signUp = async (
  name: string,
  email: string,
  password: string,
  re_password: string
) => {
  const response = await axios.post(`${API_URL}/api/users/`, {
    name: name,
    email: email,
    password: password,
    re_password: re_password,
  });
  return response;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const authService = { signUp, login, logout, refreshToken, getCurrentUser };

export default authService;
