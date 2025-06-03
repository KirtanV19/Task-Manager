import axios from "axios";

const app = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

app.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default app;
