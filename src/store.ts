import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  updatedAt: Date;
  createdAt: Date;
}

interface AuthStateI {
  user: null | UserI;
  setUser: (user: UserI) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStateI>()(
  devtools((set) => ({
    user: null,
    setUser: (user: UserI) => set({ user: user }),
    logout: () => set({ user: null }),
  }))
);
