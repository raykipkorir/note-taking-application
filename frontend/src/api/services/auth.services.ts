import { axiosInstance, uninterceptedAxiosInstance } from "../axios";

const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/token/", {
    email: email,
    password: password,
  });
  return response;
};

const refreshToken = async (refresh: any) => {
  const response = await uninterceptedAxiosInstance.post("/token/refresh/", {
    refresh: refresh,
  });
  return response;
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

const signUp = async (
  name: string,
  email: string,
  password: string,
  re_password: string
) => {
  const response = await axiosInstance.post("/users/", {
    name: name,
    email: email,
    password: password,
    re_password: re_password,
  });
  return response;
};

// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("token") || "{}");
// };

const authService = { signUp, login, logout, refreshToken };

export default authService;
