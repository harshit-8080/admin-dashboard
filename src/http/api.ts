import { Credentials } from "../types";
import { api } from "./client";

// Auth Service
export const login = (credential: Credentials) => {
  return api.post("/auth/login", credential);
};
