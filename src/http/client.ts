import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true, // ^ For Cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
