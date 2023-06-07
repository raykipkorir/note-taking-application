const API_URL = import.meta.env.VITE_API_URL;

const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/api/token/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

const createUser = () => {};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const authService = { createUser, login, logout, getCurrentUser };

export default authService;
