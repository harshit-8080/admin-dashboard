import { Credentials } from "../types";
import { api } from "./client";

// Auth Service
export const login = (credential: Credentials) => {
  return api.post("/auth/login", credential);
};

export const self = () => {
  return api.get("/auth/whoAmI");
};

export const logout = () => {
  return api.get("/auth/logout");
};
