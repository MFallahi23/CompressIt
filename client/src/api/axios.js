import axios from "axios";
const BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application.json" },
  withCredentials: true,
});

const apiGoogle = axios.create({
  baseURL: "http://localhost:3000/api/user/googleLogin",
  withCredentials: true,
});

export const googleAuth = (code) => apiGoogle.post(`?code=${code}`);
